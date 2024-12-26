import supabase from "@/utils/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { check_in, check_out, guest } = req.query;

  console.log(check_in, check_out, guest, "check date");

  if (!check_in || !check_out) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  if (new Date(check_out) <= new Date(check_in)) {
    return res
      .status(400)
      .json({ error: "Check-out date must be after check-in date" });
  }

  const parsedGuest = parseInt(guest, 10);
  if (isNaN(parsedGuest) || parsedGuest <= 0) {
    return res
      .status(400)
      .json({ error: "Invalid or missing 'guest' parameter" });
  }

  try {
    const { data: bookedRooms, error: bookingsError } = await supabase
      .from("bookings")
      .select("room_id")
      .lte("check_in_date", check_out)
      .gte("check_out_date", check_in);

    if (bookingsError) {
      console.error("Error querying bookings:", bookingsError);
      return res.status(500).json({ error: bookingsError.message });
    }

    const bookedRoomIds = bookedRooms?.map((booking) => booking.room_id) || [];
    console.log("Booked Room IDs:", bookedRoomIds);

    let { data: availableRooms, error: roomsError } = await supabase
      .from("rooms")
      .select("*")
      .eq("status", "available")
      .gte("guests", parsedGuest);

    if (roomsError) {
      console.error("Error querying rooms:", roomsError);
      return res.status(500).json({ error: roomsError.message });
    }

    if (bookedRoomIds.length > 0) {
      const bookedRoomIdsSet = new Set(bookedRoomIds.map(String));
      availableRooms = availableRooms.filter(
        (room) => !bookedRoomIdsSet.has(String(room.room_id)),
      );
    }

    console.log("Available Rooms:", availableRooms);

    return res.status(200).json({ data: availableRooms });
  } catch (error) {
    console.error("Unexpected error:", error.message, error.stack);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}
