import supabase from "@/utils/supabaseClient";

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

  // TODO: check for images updates, upload if necessary

  const data = {
    room_number: roomNumber,
    room_type: roomType,
    room_size: roomSize,
    bed_type: bedType || null,
    guests: guests || null,
    price: pricePerNight,
    promotion_price: promotionPrice || null,
    room_description: roomDescription || null,
    //room_image_url: mainImageURL || null,
    //image_gallery: imageGalleryURLs || [],
    amenities: amenities || [], //JSON.stringify(sanitizedAmenities),
  };

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
