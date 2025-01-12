import supabase from "@/utils/supabaseClient";
import { useRouter } from "next/router";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { check_in, check_out, guest } = req.query;

  // ถ้าผู้ใช้ไม่ได้กรอกข้อมูล check_in, check_out, หรือ guest
  if (!check_in && !check_out && !guest) {
    try {
      // ดึงข้อมูลทั้งหมดจากตาราง "rooms"
      const { data: availableRooms, error: roomsError } = await supabase
        .from("rooms")
        .select("*");

      if (roomsError) {
        console.error("Error querying rooms:", roomsError);
        return res.status(500).json({ error: roomsError.message });
      }

      // ส่งข้อมูลห้องทั้งหมด
      return res.status(200).json({ data: availableRooms });
    } catch (err) {
      console.error("Unexpected error:", err.message, err.stack);
      return res.status(500).json({
        error: "Internal Server Error",
        details: err.message,
      });
    }
  }

  // ถ้ามีการกรอกข้อมูล check_in, check_out, และ guest
  if (check_in && check_out && guest) {
    if (!check_in || !check_out) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    // ตรวจสอบวันที่ check_in และ check_out
    const checkInDate = new Date(check_in);
    const checkOutDate = new Date(check_out);

    if (checkOutDate <= checkInDate) {
      return res.status(400).json({
        error: "Check-out date must be after check-in date",
      });
    }

    const parsedGuest = parseInt(guest, 10);
    if (isNaN(parsedGuest) || parsedGuest <= 0) {
      return res
        .status(400)
        .json({ error: "Invalid or missing 'guest' parameter" });
    }

    try {
      // Query for rooms that are already booked during the specified check-in and check-out dates
      const { data: bookedRooms, error: bookingsError } = await supabase
        .from("bookings")
        .select("room_id")
        .or(`check_in_date.lte.${check_out},check_out_date.gte.${check_in}`);

      if (bookingsError) {
        console.error("Error querying bookings:", bookingsError);
        return res.status(500).json({ error: bookingsError.message });
      }

      const bookedRoomIds =
        bookedRooms?.map((booking) => booking.room_id) || []; // ดึง room_id ทั้งหมด

      // ใช้ Set เพื่อกรองห้องที่ซ้ำกัน
      const uniqueBookedRoomIds = [...new Set(bookedRoomIds)];

      // Query for available rooms that can accommodate the number of guests
      let { data: availableRooms, error: roomsError } = await supabase
        .from("rooms")
        .select("*");
      if (roomsError) {
        console.error("Error querying rooms:", roomsError);
        return res.status(500).json({ error: roomsError.message });
      }

      // If there are booked rooms, filter them out from the available rooms
      if (uniqueBookedRoomIds.length > 0) {
        availableRooms = availableRooms.filter(
          (room) =>
            !bookedRoomIds.includes(room.id) && room.guests === parsedGuest,
        );
      }

      // เรียงลำดับห้องตามราคาจากน้อยไปมาก
      availableRooms = availableRooms
        .filter((room) => room.price != null) // กรองห้องที่ไม่มีราคา
        .sort((a, b) => a.price - b.price); // เรียงลำดับห้องตามราคา

      return res.status(200).json({ data: availableRooms });
    } catch (error) {
      console.error("Unexpected error:", error.message, error.stack);
      return res.status(500).json({
        error: "Internal Server Error",
        details: error.message,
      });
    }
  }

  return res.status(400).json({ error: "Missing required parameters" });
}
