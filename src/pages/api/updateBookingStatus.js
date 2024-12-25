import supabase from "@/utils/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { booking_id, status } = req.body;

  try {
    // อัปเดตสถานะในฐานข้อมูล
    const { error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("booking_id", booking_id);

    if (error) throw error;

    res.status(200).json({ message: "Booking status updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
