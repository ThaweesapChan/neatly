import supabase from "@/utils/supabaseClient";

export default async function changeBookingDate(req, res) {
  if (req.method === "PUT") {
    const { booking_id, check_in_date, check_out_date } = req.body;
    try {
      const response = await supabase
        .from("bookings")
        .update({ check_in_date, check_out_date })
        .eq("booking_id", booking_id)
        .select();

      if (response.error) throw response.error;

      res.status(200).json(response.data[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
