/* import supabase from "@/utils/supabaseClient";

export default async function postBookingDetail(req, res) {
  try {
    const { check_in_date, check_out_date, room_id } = req.body;

    if (!check_in_date || !check_out_date || !room_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          check_in_date,
          check_out_date,
          room_id,
          status: "pending",
          booking_date: new Date().toISOString(),
        },
      ])
      .select("booking_id");

    if (error) {
      console.error("Error inserting booking:", error.message);
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }

    return res.status(200).json(data[0]["booking_id"]);
  } catch (error) {
    console.error("Unexpected error:", error.message);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}
 */