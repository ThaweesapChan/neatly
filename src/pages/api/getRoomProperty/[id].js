// File: pages/api/getRoomProperty/[id].js
import supabase from "@/utils/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;

  try {
    const { data, error } = await supabase
      .from("rooms")
      .select(
        `
        *,
        amenities:room_amenities(
          amenity:amenities(
            amenity_name
          )
        )
      `,
      )
      .eq("room_id", id)
      .single();

    if (error) {
      console.error("Error fetching room:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (!data) {
      return res.status(404).json({ error: "Room not found" });
    }

    // Format amenities data
    const formattedData = {
      ...data,
      amenities:
        data?.amenities?.map((item) => item.amenity.amenity_name) || [],
    };

    return res.status(200).json({ data: formattedData });
  } catch (error) {
    console.error("Error fetching room:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
