import supabase from "@/utils/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { booking_id, status, cancellation_date } = req.body;

  try {
    const updatedData = { status };

    // ถ้าการจองถูกยกเลิก ให้เพิ่มวันที่ปัจจุบันใน `cancellation_date`
    if (status === "cancelled") {
      updatedData.cancellation_date = cancellation_date;
    }

    const { error } = await supabase
      .from("bookings")
      .update(updatedData)
      .eq("booking_id", booking_id);

    if (error) throw error;

    res.status(200).json({ message: "Booking status updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
