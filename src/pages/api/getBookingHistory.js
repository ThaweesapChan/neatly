import supabase from "@/utils/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // รับ token จาก request headers
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // ตรวจสอบ user จาก token (สมมติว่า decode token ได้ user_id)
    const { data: userData, error: userError } =
      await supabase.auth.getUser(token);

    if (userError || !userData?.user) {
      // console.error("Token validation failed:", userError?.message);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    const userId = userData.user.id; // ดึง user_id จาก token

    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 5;
    const offset = (page - 1) * limit;

    // Query ข้อมูลจาก bookings table
    const {
      data: bookings,
      error,
      count,
    } = await supabase
      .from("bookings")
      .select(
        `
        booking_id,
        check_in_date,
        check_out_date,
        guests,
        total_price,
        special_requests,
        standard_requests,
        additional_request,
        promotion_code,
        booking_date,
        cancellation_date,
        status,
        rooms:room_id (
          room_type,
          room_image_url,
          price
        ),
        payment:payments ( payment_method )
      `,

        { count: "exact" }, // Supabase will return the total count
      )
      .eq("user_id", userId) // Filter เฉพาะ user นี้
      .order("booking_date", { ascending: false }) // เรียงตาม booking_date ใหม่ -> เก่า
      .range(offset, offset + limit - 1); // Fetch only rows within the range

    if (error) {
      // console.error("Supabase Error:", error.message);
      return res
        .status(500)
        .json({ message: "Database query error", error: error.message });
    }

    if (!bookings || bookings.length === 0) {
      return res
        .status(200)
        .json({ message: "No bookings found", bookings: [] });
    }

    const updatedBookings = bookings.map((booking) => {
      const checkInDate = new Date(booking.check_in_date);
      const checkOutDate = new Date(booking.check_out_date);
      const bookingTime = new Date(booking.booking_date);
      const now = new Date();

      // คำนวณจำนวนวันที่พัก
      const stay = Math.ceil(
        (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24),
      );

      // คำนวณ canCancelBooking , canChangeDate และ canRefund
      const canCancelBooking = now < checkInDate; // ปุ่ม cancel ได้เฉพาะก่อนวัน check-in
      const canChangeDate = (now - bookingTime) / 3600000 < 24; // ไม่เกิน 24 ชั่วโมง
      const canRefund = canChangeDate;

      return {
        ...booking,
        stay,
        canCancelBooking,
        canChangeDate,
        canRefund,
      };
    });

    // ส่งข้อมูลกลับไปให้ frontend
    res.status(200).json({ bookings: updatedBookings, total: count });
  } catch (err) {
    console.error("API Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
