import supabase from "@/utils/supabaseClient";

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Room ID is required" });
  }

  try {
    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .eq("room_id", id)
      .single();

    if (error) {
      throw error;
    }

    res.status(200).json({ data });
  } catch (error) {
    console.error("Error fetching room data:", error);
    res.status(500).json({ error: "Failed to fetch room data" });
  }
}
