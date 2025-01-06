import supabase from "@/utils/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { hotel_name, hotel_description, hotel_logo_url } = req.body;

  // ตรวจสอบว่า body ที่ถูกส่งมามีค่าครบหรือไม่
  if (!hotel_name || !hotel_description || !hotel_logo_url) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // ดึงข้อมูลแถวแรกจากตาราง hotel_information
    const { data: hotelData, error: fetchError } = await supabase
      .from("hotel_information")
      .select("id")
      .order("id", { ascending: true })
      .limit(1)
      .single();

    if (fetchError) {
      console.error("Supabase error fetching hotel information:", fetchError);
      throw fetchError;
    }

    const hotelId = hotelData.id;

    // อัปเดตข้อมูลของโรงแรมในฐานข้อมูล
    const { data, error } = await supabase
      .from("hotel_information")
      .update({ hotel_name, hotel_description, hotel_logo_url })
      .eq("id", hotelId)
      .single();

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    res
      .status(200)
      .json({ message: "Hotel information updated successfully", hotel: data });
  } catch (error) {
    console.error("Error updating hotel information:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}
