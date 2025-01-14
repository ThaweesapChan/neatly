import supabase from "@/utils/supabaseClient";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const hotelId = '3170d8e3-7cab-4468-8df6-16b836306752'; // id ที่ต้องการค้นหา

      // Query ข้อมูลจากตารางที่มี id ตรงกับค่าที่กำหนด
      const { data, error } = await supabase
        .from('hotel_information')
        .select('*')
        .eq('id', hotelId); // ค้นหาข้อมูลที่มี id ตรงกับ hotelId
  
      if (error) {
        return res.status(400).json({ error: error.message });
      }

      // ส่งข้อมูลกลับไปยัง client
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' }); // รองรับเฉพาะ GET
  }
}
