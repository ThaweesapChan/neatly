import { v4 as uuidv4 } from "uuid";
import Stripe from "stripe";
import supabase from "@/utils/supabaseClient";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function bookingHandler(req, res) {
  // Logic สำหรับจัดการคำขอแบบ POST ดึงข้อมูลที่ส่งมาจาก Front-End ผ่าน req.body
  if (req.method === "POST") {
    console.log("Request received:", req.body);
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      bookingDate,
      checkInDate,
      checkOutDate,
      specialRequests,
      amount,
      guests,
      totalPrice,
      country,
      promotionCode,
      originalPrice,
      dateOfBirth,
    } = req.body;

    try {
      // สร้าง booking_id
      const bookingId = uuidv4();
      console.log("Generated bookingId:", bookingId); // ตรวจสอบการสร้าง bookingId

      // Validate request body to ensure required fields are provided
      if (
        !firstName ||
        !lastName ||
        !email ||
        !phoneNumber ||
        !bookingDate ||
        !checkInDate ||
        !checkOutDate ||
        !totalPrice
      ) {
        console.error("Missing required fields"); // Log fields missing
        return res.status(400).json({ message: "Missing required fields" });
      }

      // บันทึกข้อมูลการจองใน Database
      const { error } = await supabase.from("bookings").insert({
        booking_id: bookingId,
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: phoneNumber,
        booking_date: bookingDate,
        check_in_date: checkInDate,
        check_out_date: checkOutDate,
        special_requests: specialRequests,
        amount: amount,
        country: country,
        date_of_birth: dateOfBirth,
        original_price: originalPrice,
        promotion_code: promotionCode,

        guests,
        status: "pending", // เริ่มต้นเป็น pending
        total_price: totalPrice, // ระบุ total_price
      });

      if (error) {
        console.error("Error inserting booking to database:", error); // Log error ที่เกิดจาก Supabase
        return res
          .status(500)
          .json({ message: "Failed to save booking", error });
      }

      console.log("Booking saved successfully in database"); // ตรวจสอบว่า INSERT สำเร็จ

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: "thb",
        metadata: { booking_id: bookingId },
      });
      console.log("PaymentIntent created:", paymentIntent); // ตรวจสอบ PaymentIntent

      // อัปเดต payment_intent_id ใน Database
      await supabase
        .from("bookings")
        .update({ payment_intent_id: paymentIntent.id })
        .eq("booking_id", bookingId);

      console.log("PaymentIntent ID updated in database"); // ตรวจสอบว่าข้อมูลอัปเดตสำเร็จ

      return res
        .status(200)
        .json({ client_secret: paymentIntent.client_secret });
    } catch (error) {
      console.error("Error in bookingHandler:", error); // Log error ทั้งหมดที่เกิดใน try
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  } else {
    console.log("Invalid request method:", req.method); // Log method อื่นที่ไม่ใช่ POST
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
