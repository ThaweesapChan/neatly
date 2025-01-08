/* import supabase from "@/utils/supabaseClient";
export default async function getBookingDetail(req, res) {
  const { booking_id } = req.query;
  console.log("booking_id from getBookingDetail จากapi", booking_id);
  if (!booking_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const { data, error } = await supabase
      .from("bookings")
      .select(
        `
        *,
        rooms (*)
      `,
      )
      .eq("booking_id", booking_id)
      .single();

    if (error) {
      console.error("Error fetching booking detail:", error);
      return res.status(500).json({ error: error.message });
    }

    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json({ error: "Booking not found" });
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
 */