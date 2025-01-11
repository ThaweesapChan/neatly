/* import supabase from "@/utils/supabaseClient";

export default async function updateBookingDetail(req, res) {
  try {
    const {
      booking_id,
      first_name,
      last_name,
      phone_number,
      email,
      date_of_birth,
      country,
    } = req.body;

    if (
      !booking_id ||
      !first_name ||
      !last_name ||
      !phone_number ||
      !email ||
      !date_of_birth ||
      !country
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { data, error } = await supabase
      .from("bookings")
      .update({
        first_name,
        last_name,
        phone_number,
        email,
        date_of_birth,
        country,
      })
      .match({ booking_id });

    if (error) {
      console.error("Error updating booking:", error.message);
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Unexpected error:", error.message);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}
 */