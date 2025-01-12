import { v4 as uuidv4 } from "uuid";
import supabase from "@/utils/supabaseClient";

export default async function cashBookingHandler(req, res) {
  // ตรวจสอบว่า request เป็น POST
  if (req.method === "POST") {
    const {
      user_id,
      roominfo, // ข้อมูลห้องพัก
      check_in_date, // วันที่เช็คอิน
      check_out_date, // วันที่เช็คเอาท์
      userinfo, // ข้อมูลผู้ใช้
      additionalInfo, // ข้อมูลคำขอเพิ่มเติม
      totalprice, // ราคารวม
      amount, // จำนวนห้องที่จอง
    } = req.body;

    try {
      // ตรวจสอบว่ามีฟิลด์สำคัญครบถ้วน
      if (
        !user_id ||
        !userinfo?.firstName ||
        !userinfo?.lastName ||
        !userinfo?.email ||
        !userinfo?.phoneNumber ||
        !userinfo?.dateOfBirth ||
        !userinfo?.country ||
        !roominfo?.room_id ||
        !roominfo?.price ||
        !check_in_date ||
        !check_out_date ||
        !totalprice ||
        !amount
      ) {
        console.error("Missing required fields");
        return res.status(400).json({ message: "Missing required fields" });
      }

      // สร้าง booking_id
      const bookingId = uuidv4();

      // เตรียมข้อมูลการจอง
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
        original_price: roominfo?.price || null,
        guests: roominfo?.guests || 1,
        promotion_code: roominfo?.promotion_code || null,
        status: "pending payment", // สถานะเริ่มต้น
        total_price: totalprice,
        amount, // จำนวนห้องที่จอง
        booking_date: new Date().toISOString(),
      };

      // บันทึกข้อมูลลงในฐานข้อมูล
      const { error: insertError } = await supabase
        .from("bookings")
        .insert(bookingData);

      // ตรวจสอบข้อผิดพลาดในการบันทึกข้อมูล
      if (insertError) {
        console.error("Error inserting booking to database:", insertError);
        return res.status(500).json({
          message: "Failed to save booking",
          error: insertError,
        });
      }

      // ส่ง response กลับเมื่อการบันทึกข้อมูลสำเร็จ
      return res.status(200).json({
        message: "Booking saved successfully",
        booking_id: bookingId,
      });
    } catch (error) {
      console.error("Error in cashBookingHandler:", error);
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  } else {
    // กรณีที่ request method ไม่ใช่ POST
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
