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
  const { id } = req.query;
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
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
  let mainImageURL = null;
  let imageGalleryURLs = [];

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

  let data = {
    room_number: roomNumber,
    room_type: roomType,
    room_size: roomSize,
    bed_type: bedType || null,
    guests: guests || null,
    price: pricePerNight,
    promotion_price: promotionPrice || null,
    room_description: roomDescription || null,
    amenities: amenities || [], //JSON.stringify(sanitizedAmenities),
  };

  // check for images updates, upload if necessary
  if (mainImage) {
    // Save images to supabase storage and get URL to save in DB
    // mainImage
    const mainImageFile = fromBase64(mainImage, "main-image");
    const mainImagePath = `${roomNumber}/${mainImageFile.name}`;
    const { mainImageRespone, mainImageError } = await supabase.storage
      .from("room_images")
      .upload(mainImagePath, mainImageFile);

    mainImageURL = await supabase.storage // Get public URL
      .from("room_images")
      .getPublicUrl(mainImagePath).data.publicUrl;

    data = { ...data, room_image_url: mainImageURL || null };
  }

  if (imageGallery.length > 0) {
    // imageGallery save to supabase storage and get URL to save in DB
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
    data = { ...data, image_gallery: imageGalleryURLs || [] };
  }

  if (!id || !data) {
    return res
      .status(400)
      .json({ error: "Missing required parameters or data" });
  }

  try {
    const { error } = await supabase
      .from("rooms")
      .update(data)
      .eq("room_id", id);

    if (error) {
      throw error;
    }

    return res.status(200).json({ message: "Room updated successfully" });
  } catch (error) {
    console.error("Error updating room:", error.message);
    return res.status(500).json({ error: "Failed to update room property" });
  }
}
