import React, { useState, useEffect } from "react";
import { useBookingDetail } from "@/lib/BookingDetailContext";

export default function Bookingdetail() {
  const { bookingDetail } = useBookingDetail();
  const [timeLeft, setTimeLeft] = useState(300);
  console.log(bookingDetail, "bookingDetail from Bookingdetail");
  
  /* useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
 */
  const calculateTotal = () => {
    const specialRequestTotal = Array.isArray(bookingDetail?.specialRequest)
      ? bookingDetail.specialRequest.reduce(
          (acc, req) => acc + (req.price || 0),
          0,
        )
      : 0;

    const roomPrice = bookingDetail?.roominfo?.price || 0;

    return specialRequestTotal + roomPrice;
  };

  return (
    <div>
      <div className="space-y-4 rounded-lg bg-[#2F4C43] p-4 text-white">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2">Booking Detail</h2>
          <span className="rounded bg-red-100 px-2 py-0.5 text-sm text-red-600">
            {/* {formatTime(timeLeft)} */}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <div className="text-gray-300">Check-in</div>
            <div>{bookingDetail?.checkIn || "Loading..."}</div>
          </div>
          <div>
            <div className="text-gray-300">Check-out</div>
            <div>{bookingDetail?.checkOut || "Loading..."}</div>
          </div>
        </div>

        <div className="text-sm">
          <div>
            {bookingDetail?.roominfo
              ? `${bookingDetail.checkIn} - ${bookingDetail.checkOut}`
              : "Loading dates..."}
          </div>
          <div>
            {bookingDetail?.roominfo?.guests
              ? `${bookingDetail.roominfo.guests} Guests`
              : "Loading room details..."}
          </div>
        </div>

        <div className="border-t border-gray-600 pt-2">
          <div className="flex items-center justify-between">
            {bookingDetail?.roominfo?.room_type || "Loading room details..."}
          </div>
        </div>

        <div className="border-t border-gray-600 pt-2">
          <h4 className="text-lg font-semibold text-gray-300">
            Special Requests
          </h4>
          <ul>
            {Array.isArray(bookingDetail?.specialRequest) &&
            bookingDetail.specialRequest.length > 0 ? (
              bookingDetail.specialRequest.map((req, index) => (
                <li key={index} className="text-sm text-gray-200">
                  {req.name} (+THB {req.price})
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-400">
                No special requests selected
              </li>
            )}
          </ul>
        </div>

        <div className="border-t border-gray-600 pt-2">
          <div className="flex items-center justify-between">
            <span>Total</span>
            <span className="text-lg font-semibold">
              {calculateTotal()} THB
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
