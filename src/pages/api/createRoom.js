import supabase from "@/utils/supabaseClient";
import fromBase64 from "@/utils/from-base-64";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

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

    // Save images to supabase storage and get URL to save in DB
    // mainImage
    const mainImageFile = fromBase64(mainImage, "main-image");
    const mainImagePath = `${roomNumber}/${mainImageFile.name}`;
    const { mainImageRespone, mainImageError } = await supabase.storage
      .from("room_images")
      .upload(mainImagePath, mainImageFile);

    const mainImageURL = await supabase.storage // Get public URL
      .from("room_images")
      .getPublicUrl(mainImagePath).data.publicUrl;

    // TODO: const imageGalleryURLs = await Promise.all(); (data arrive in imageGallery var)
    const imageGalleryURLs = [];
    for (let i = 0; i < imageGallery.length; i++) {
      const imageFile = fromBase64(imageGallery[i], `image-${i}`);
      const imagePath = `${roomNumber}/${imageFile.name}`;
      const { response, error } = await supabase.storage
        .from("room_images")
        .upload(imagePath, imageFile);

      const imageURL = await supabase.storage // Get public URL
        .from("room_images")
        .getPublicUrl(imagePath).data.publicUrl;
      imageGalleryURLs.push(imageURL);
    }

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
        room_image_url: mainImageURL || null,
        image_gallery: imageGalleryURLs || [],
        amenities: amenities || [], //JSON.stringify(sanitizedAmenities),
      })
      .select(); // Return inserted data

    if (error) {
      console.error("Insertion error:", error);
      return res.status(500).json({
        error: "Failed to create room",
        details: error.message,
      });
    }
    console.log(data);

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
