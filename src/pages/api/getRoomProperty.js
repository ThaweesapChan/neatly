import supabase from "@/utils/supabaseClient";

export default async function getRoomProperty(req, res) {
  try {
    // ดึงข้อมูลห้องพักจากฐานข้อมูล
    const { data, error } = await supabase
      .from("rooms")
      .select(
        `
      *
      `,
      )
      .order("room_id", { ascending: true });

    // ตรวจสอบข้อผิดพลาด
    if (error) {
      console.error("Error fetching room properties:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // ส่งข้อมูลห้องพักกลับไป
    return res.status(200).json({ data });
  } catch (error) {
    console.error("Error fetching room properties:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
