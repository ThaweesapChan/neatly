import supabase from "@/utils/supabaseClient";

export default async function getRoomDetail(req, res) {
  try {
    const { data, error } = await supabase
      .from("rooms")
      .select("room_id, room_type, room_image_url")
      .order("room_id");

    if (error) {
      throw new Error(`Database query failed: ${error.message}`);
    }

    // Filter unique room types
    const uniqueRooms = data.reduce((unique, room) => {
      // ถ้ายังไม่มี room_type นี้ใน array ให้เพิ่มเข้าไป
      if (!unique.some((item) => item.room_type === room.room_type)) {
        unique.push(room);
      }
      return unique;
    }, []);

    if (!uniqueRooms || uniqueRooms.length === 0) {
      return res.status(404).json({ message: "No rooms found" });
    }

    return res.status(200).json(uniqueRooms);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error" });
  }
}
