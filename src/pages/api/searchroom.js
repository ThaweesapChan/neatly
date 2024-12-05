import supabase from "@/utils/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    // ตรวจสอบ Method ของ Request
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { check_in, check_out } = req.query;

  console.log(check_in, check_out, "check date");
  if (!check_in || !check_out) {
    // ตรวจสอบว่ามี check_in และ check_out หรือไม่
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    // Query bookings เพื่อหาห้องที่ถูกจองในช่วงวันที่ที่ระบุ
    const { data: bookedRooms, error: bookingsError } = await supabase
      .from("bookings")
      .select("room_id")
      .lte("check_in_date", check_out) // ค้นหาการจองที่ check_in_date <= check_out
      .gte("check_out_date", check_in); // ค้นหาการจองที่ check_out_date >= check_in

    console.log("check 1", bookedRooms);

    if (bookingsError) {
      // เพิ่มคอมเมนต์: ตรวจสอบ Error จากการ Query bookings
      console.error("Error querying bookings:", bookingsError);
      return res.status(500).json({ error: bookingsError.message });
    }

    const bookedRoomIds = bookedRooms?.map((booking) => booking.room_id) || [];
    console.log(bookedRoomIds, "check room ");

    // Query rooms เพื่อหาห้องที่ยังว่างอยู่
    let { data: availableRooms, error: roomsError } = await supabase
      .from("rooms")
      .select("room_id, room_number, room_type, bed_type, price")
      .eq("status", "available"); // ค้นหาห้องที่ status เป็น available

    if (roomsError) {
      // เพิ่มคอมเมนต์: ตรวจสอบ Error จากการ Query rooms
      console.error("Error querying rooms:", roomsError);
      return res.status(500).json({ error: roomsError.message });
    }

    // หากมีห้องที่ถูกจองใน bookedRoomIds ให้นำห้องเหล่านั้นออก
    if (bookedRoomIds.length > 0) {
      availableRooms = availableRooms.filter(
        (room) => !bookedRoomIds.includes(room.room_id),
      );
    }

    console.log("check 2", availableRooms);

    return res.status(200).json({ data: availableRooms });
  } catch (error) {
    console.error("Unexpected error:", error); // เพิ่มคอมเมนต์: Log Error ที่ไม่คาดคิด
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
