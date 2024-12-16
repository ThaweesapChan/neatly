import { createClient } from "@supabase/supabase-js";

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const {
    roomNumber,
    roomType,
    roomSize,
    bedType,
    guests,
    pricePerNight,
    promotionPrice,
    roomDescription,
    mainImage,
    imageGallery,
    amenities,
  } = req.body;

  // Enhanced Validation
  const validationErrors = [];
  if (!roomNumber) validationErrors.push("Room number is required");
  if (!roomType) validationErrors.push("Room type is required");
  if (!roomSize) validationErrors.push("Room size is required");
  if (pricePerNight <= 0) validationErrors.push("Price must be positive");

  if (validationErrors.length > 0) {
    return res.status(400).json({
      error: "Validation Failed",
      details: validationErrors,
    });
  }

  try {
    // Check for existing room number
    const { data: existingRoom, error: fetchError } = await supabase
      .from("rooms")
      .select("room_number")
      .eq("room_number", roomNumber)
      .limit(1);

    if (fetchError) {
      console.error("Room lookup error:", fetchError);
      return res.status(500).json({
        error: "Database lookup failed",
        details: fetchError.message,
      });
    }

    if (existingRoom && existingRoom.length > 0) {
      return res.status(400).json({
        error: "Room number already exists",
      });
    }

    // Sanitize input arrays
    const sanitizedImageGallery = Array.isArray(imageGallery)
      ? imageGallery.filter((img) => img && typeof img === "string")
      : [];

    const sanitizedAmenities = Array.isArray(amenities)
      ? amenities.filter((amenity) => amenity && typeof amenity === "string")
      : [];

    // Insert room data
    const { data, error } = await supabase
      .from("rooms")
      .insert({
        room_number: roomNumber,
        room_type: roomType,
        room_size: roomSize,
        bed_type: bedType || null,
        guests: guests || null,
        price: pricePerNight,
        promotion_price: promotionPrice || null,
        room_description: roomDescription || null,
        room_image_url: mainImage || null,
        image_gallery: sanitizedImageGallery,
        amenities: sanitizedAmenities,
      })
      .select(); // Return inserted data

    if (error) {
      console.error("Insertion error:", error);
      return res.status(500).json({
        error: "Failed to create room",
        details: error.message,
      });
    }

    // Successful insertion
    res.status(201).json({
      message: "Room created successfully",
      room: data[0],
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({
      error: "Unexpected server error",
      details: error.message || "Unknown error",
    });
  }
}
