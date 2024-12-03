import supabase from "@/utils/supabaseClient";

//Get search from dt

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // รับ query parameters จาก URL
  const { check_in, check_out, room_type } = req.query;

  // ตรวจสอบว่า parameter ครบหรือไม่
  if (!check_in || !check_out || !room_type) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    // ค้นหาข้อมูลห้องใน Supabase
    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .filter("room_type", "eq", room_type) // ค้นหาตามประเภทห้อง
      .filter("check_in_date", "<=", check_in) // ห้องที่พร้อมก่อนหรือในวันที่ check_in
      .filter("check_out_date", ">=", check_out); // ห้องที่ว่างหลังหรือในวันที่ check_out

    console.log(data);

    if (error) {
      throw error;
    }

    // ส่งผลลัพธ์กลับ
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
