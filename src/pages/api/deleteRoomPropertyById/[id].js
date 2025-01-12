import supabase from "@/utils/supabaseClient";

export default async function handler(req, res) {
  const { id } = req.query;

  /*   console.log("Received delete request for room ID:", id); */

  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!id) {
    return res.status(400).json({ error: "Room ID is required" });
  }

  try {
    // 1. First fetch the room to get image URLs
    const { data: roomData, error: fetchError } = await supabase
      .from("rooms")
      .select("room_image_url, image_gallery")
      .eq("room_id", id)
      .single();

    /*     console.log("Fetched room data:", roomData); */

    if (fetchError) {
      return res.status(500).json({
        error: "Failed to fetch room data",
        details: fetchError.message,
      });
    }

    if (!roomData) {
      return res.status(404).json({ error: "Room not found" });
    }

    // 2. Prepare image paths for deletion
    const imagePaths = [];

    // Handle main room image
    if (roomData.room_image_url) {
      const mainImagePath = roomData.room_image_url.split("room_images/")[1];
      if (mainImagePath) {
        imagePaths.push(mainImagePath);
      }
    }

    // Handle gallery images
    if (roomData.image_gallery && Array.isArray(roomData.image_gallery)) {
      roomData.image_gallery.forEach((url) => {
        if (url) {
          const galleryPath = url.split("room_images/")[1];
          if (galleryPath) {
            imagePaths.push(galleryPath);
          }
        }
      });
    }

    /* console.log("Images to delete:", imagePaths); */

    // 3. Delete images from storage
    if (imagePaths.length > 0) {
      const { error: storageError } = await supabase.storage
        .from("room_images")
        .remove(imagePaths);

      if (storageError) {
        console.error("Storage deletion error:", storageError);
        // Continue with database deletion even if storage deletion fails
      } else {
        /* console.log("Successfully deleted images from storage"); */
      }
    }

    const roomId = id;

    // 4. Delete the room from database
    const { data: deleteData, error: deleteError } = await supabase
      .from("rooms")
      .delete()
      .eq("room_id", roomId);

    /* console.log("Database deletion result:", deleteData); */

    if (deleteError) {
      return res.status(500).json({
        error: "Failed to delete room from database",
        details: deleteError.message,
      });
    }

    // 5. Return success response
    return res.status(200).json({
      message: "Room and associated images deleted successfully",
      data: deleteData,
    });
  } catch (error) {
    console.error("Unexpected error in delete handler:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
}
