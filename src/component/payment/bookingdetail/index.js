import React from "react";
import { useBookingDetail } from "@/lib/BookingDetailContext";
import { useBooking } from "@/lib/BookingContext";
import { useState, useEffect } from "react";

export default function Bookingdetail() {
  const { room } = useBookingDetail();
  const { roomreq } = useBooking();
  console.log(roomreq);
  console.log(room);

  const [timeLeft, setTimeLeft] = useState(300); // ตั้งค่าตัวแปรเวลาเป็น 5 นาที (300 วินาที)
  useEffect(() => {
    // ตั้งค่าการอัปเดตเวลาในทุกๆ 1 วินาที
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer); // หยุดการนับถอยหลังเมื่อถึง 0
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000); // อัปเดตทุก 1 วินาที

    // ลบ timer เมื่อ Component ถูกทำลาย (cleanup)
    return () => clearInterval(timer);
  }, []);

  // ฟังก์ชันที่ใช้แสดงเวลาในรูปแบบนาที:วินาที
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  return (
    <div>
      <div className="space-y-4 rounded-lg bg-[#2F4C43] p-4 text-white">
        <div className="bg- flex items-center justify-between">
          <h2 className="flex items-center gap-2">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            Booking Detail
          </h2>
          <span className="rounded bg-red-100 px-2 py-0.5 text-sm text-red-600">
            {formatTime(timeLeft)} {/* แสดงเวลาในรูปแบบนาที:วินาที */}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <div className="text-gray-300">Check-in</div>
            <div>After 2:00 PM</div>
          </div>
          <div>
            <div className="text-gray-300">Check-out</div>
            <div>Before 12:00 PM</div>
          </div>
        </div>

        <div className="text-sm">
          <div>
            {room
              ? `${room.checkin_date} - ${room.checkout_date}`
              : "Loading dates..."}
          </div>
          <div>{room ? `${room.guest} Guests` : "Loading room details..."}</div>
        </div>

        <div className="border-t border-gray-600 pt-2">
          <div className="flex items-center justify-between text-sm">
            <span>{room ? room.name : "Room Name"}</span>
            <span>{room ? room.price : "0.00"}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>{room ? room.name : "Room Name"}</span>
            <span>{room ? room.price : "0.00"}</span>
          </div>
        </div>
        <div>{roomreq.map()}</div>
        <div className="border-t border-gray-600 pt-2">
          <div className="flex items-center justify-between">
            <span>Total</span>
            <span className="text-lg font-semibold">total</span>
          </div>
        </div>
      </div>
    </div>
  );
}
