/* import supabase from "@/utils/supabaseClient";

export default async function updateRequestToBookings(req, res) {
  const { booking_id, ...updateFields } = req.body;

  if (!booking_id) {
    return res.status(400).json({ error: "Missing booking_id" });
  }

  // กรองฟิลด์ที่ไม่ใช่ null หรือ undefined
  const filteredFields = Object.fromEntries(
    Object.entries(updateFields).filter(
      ([_, value]) => value !== undefined && value !== null,
    ),
  );

  if (Object.keys(filteredFields).length === 0) {
    return res.status(400).json({ error: "No valid fields to update" });
  }

  try {
    const { data, error } = await supabase
      .from("bookings")
      .update(filteredFields)
      .match({ booking_id });

    if (error) {
      console.error("Error updating booking:", error.message);
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Unexpected error:", error.message);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}
 */