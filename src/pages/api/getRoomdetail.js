import supabase from "@/utils/supabaseClient";

// Get Data From Database
export default async function getRoomdetail(_req, res) {
  try {
    // ดึงข้อมูลจากตาราง "rooms"
    const { data, error } = await supabase.from("rooms").select(
      `
        room_id,
        room_type,
        price,
        room_image_url,
        bed_type,
        guests
        `,
    );
     //console.log("backend fetched data:", data); 
     
    // ตรวจสอบว่ามีข้อผิดพลาดจากการดึงข้อมูลหรือไม่
    if (error) {
      throw new Error(`Database query failed: ${error.message}`);
    }

    // ตรวจสอบว่ามีข้อมูลหรือไม่
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No rooms found" });
    }

    // ส่งข้อมูลกลับในรูปแบบ JSON
    return res.status(200).json(data);
  } catch (error) {
    // จัดการข้อผิดพลาดและส่งข้อความข้อผิดพลาดกลับ
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error" });
  }
}
