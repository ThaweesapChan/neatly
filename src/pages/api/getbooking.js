import supabase from "@/utils/supabaseClient";

// Get Data From Database
export default async function getBooking(req, res) {
  try {
    const response = await supabase
      .from("bookings")
      .select(
        `
      booking_id,
      user:users ( first_name, last_name ),
      room:rooms ( room_type, bed_type ),
      guests,
      amount,
      check_in_date,
      check_out_date
    `,
      )
      .eq("user.role", "customer");

    if (response.error) throw response.error;
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
