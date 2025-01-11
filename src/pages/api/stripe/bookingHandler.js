import { v4 as uuidv4 } from "uuid";
import Stripe from "stripe";
import supabase from "@/utils/supabaseClient";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function bookingHandler(req, res) {
  // Logic สำหรับจัดการคำขอแบบ POST ดึงข้อมูลที่ส่งมาจาก Front-End ผ่าน req.body
  if (req.method === "POST") {
    /* console.log("Request received:", req.body); */
    const {
      user_id,
      roominfo, // ข้อมูลห้องพัก
      check_in_date, // วันที่เช็คอิน
      check_out_date, // วันที่เช็คเอาท์
      userinfo, // ข้อมูลผู้ใช้
      additionalInfo, // ข้อมูลคำขอเพิ่มเติม
      totalprice, // ราคารวม
      amount, // จำนวนเงิน
    } = req.body;

    try {
      // Validate request body to ensure required fields are provided
      if (
        !user_id ||
        !userinfo?.firstName ||
        !userinfo?.lastName ||
        !userinfo?.email ||
        !userinfo?.phoneNumber ||
        !userinfo?.dateOfBirth ||
        !userinfo?.country ||
        !roominfo?.room_id ||
        !check_in_date ||
        !check_out_date ||
        !totalprice ||
        !amount
      ) {
        console.error("Missing required fields"); // Log fields missing
        return res.status(400).json({ message: "Missing required fields" });
      }

      // สร้าง booking_id
      const bookingId = uuidv4();
      /* console.log("Generated bookingId:", bookingId); // ตรวจสอบการสร้าง bookingId */

      // บันทึกข้อมูลการจองใน Database
      // Prepare booking data
      const bookingData = {
        booking_id: bookingId,
        user_id,
        first_name: userinfo.firstName,
        last_name: userinfo.lastName,
        email: userinfo.email,
        phone_number: userinfo.phoneNumber,
        date_of_birth: userinfo.dateOfBirth,
        country: userinfo.country,
        check_in_date,
        check_out_date,
        special_requests: additionalInfo?.specialRequests || null,
        standard_requests: additionalInfo?.standardRequests || null,
        additional_request: additionalInfo?.additionalRequest || null,
        room_id: roominfo.room_id,
        original_price: roominfo?.original_price || null,
        promotion_code: roominfo?.promotion_code || null,
        status: "pending",
        total_price: totalprice,
        booking_date: new Date().toISOString(),
      };

      // Insert booking to database
      const { error: insertError } = await supabase
        .from("bookings")
        .insert(bookingData);

      if (insertError) {
        console.error("Error inserting booking to database:", insertError);
        return res.status(500).json({
          message: "Failed to save booking",
          error: insertError,
        });
      }

      /* console.log("Booking saved successfully in database"); // ตรวจสอบว่า INSERT สำเร็จ */

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // คูณ 100 และปัดเป็นจำนวนเต็ม
        currency: "thb",
        metadata: { booking_id: bookingId },
      });
      /* console.log("PaymentIntent created:", paymentIntent); // ตรวจสอบ PaymentIntent */

      // อัปเดต payment_intent_id ใน Database
      await supabase
        .from("bookings")
        .update({ payment_intent_id: paymentIntent.id })
        .eq("booking_id", bookingId);

      /* console.log("PaymentIntent ID updated in database"); // ตรวจสอบว่าข้อมูลอัปเดตสำเร็จ */

      return res
        .status(200)
        .json({ client_secret: paymentIntent.client_secret });
    } catch (error) {
      console.error("Error in bookingHandler:", error); // Log error ทั้งหมดที่เกิดใน try
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  } else {
    /* console.log("Invalid request method:", req.method); // Log method อื่นที่ไม่ใช่ POST */
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
