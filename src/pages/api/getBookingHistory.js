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
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    const userId = userData.user.id; // ดึง user_id จาก token

    // Query ข้อมูลจาก bookings table
    const { data: bookings, error } = await supabase
      .from("bookings")
      .select(
        `
        booking_id,
        check_in_date,
        check_out_date,
        total_price,
        special_requests,
        standard_requests,
        promotion_code,
        booking_date,
        rooms:room_id (
          room_type,
          room_image_url,
          price
        )
        payment:payments ( payment_method )
      `,
      )
      .eq("user_id", userId) // Filter เฉพาะ user นี้
      .order("booking_date", { ascending: false }); // เรียงตาม booking_date ใหม่ -> เก่า

    if (response.error) throw response.error;

    if (!bookings || bookings.length === 0) {
      return res
        .status(200)
        .json({ message: "No bookings found", bookings: [] });
    }

    const enrichedBookings = bookings.map((booking) => {
      const checkInDate = new Date(booking.check_in_date);
      const checkOutDate = new Date(booking.check_out_date);
      const stay = Math.ceil(
        (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24),
      );
      return { ...booking, stay };
    });

    // ส่งข้อมูลกลับไปให้ frontend
    res.status(200).json({ bookings: enrichedBookings });
  } catch (err) {
    console.error("API Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
