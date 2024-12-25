import supabase from "@/utils/supabaseClient";

export default async function getBookingById(req, res) {
  const { uuid } = req.query;
  try {
    const response = await supabase
      .from("bookings")
      .select(
        `
        booking_id,
        user:users ( first_name, last_name ),
        room:rooms ( room_type, bed_type, price ),
        guests,
        amount,
        check_in_date,
        check_out_date,
        booking_date,
        payment:payments ( payment_method )
      `,
      )
      .eq("booking_id", uuid);
      console.log(response);

    if (response.error) throw response.error;

    if (response.data.length > 0) {
      const booking = response.data[0];
      const checkInDate = new Date(booking.check_in_date);
      const checkOutDate = new Date(booking.check_out_date);
      const stay = Math.ceil(
        (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24),
      );
      booking.stay = stay;
    }

    res.status(200).json(response.data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
