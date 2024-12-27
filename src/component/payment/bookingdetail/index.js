import React, { useState, useEffect } from "react";
import { useBookingDetail } from "@/lib/BookingDetailContext";

export default function Bookingdetail({
  standardRequests = [],
  specialRequests = [],
  additionalRequest = "",
}) {
  const { room } = useBookingDetail();
  const [timeLeft, setTimeLeft] = useState(300);
  const [spacialreq, setSpecialRequests] = useState(specialRequests);
  const [additionalreq, setAdditionalRequest] = useState(additionalRequest);
  const [standardreq, setStandardRequests] = useState(standardRequests);
  

  useEffect(() => {
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

  const calculateTotal = () => {
    const specialRequestTotal = specialRequests.reduce(
      (acc, req) => acc + req.price,
      0,
    );
    const roomPrice = room ? room.price : 0;
    return specialRequestTotal + roomPrice;
  };

  return (
    <div>
      <div className="space-y-4 rounded-lg bg-[#2F4C43] p-4 text-white">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2">Booking Detail</h2>
          <span className="rounded bg-red-100 px-2 py-0.5 text-sm text-red-600">
            {formatTime(timeLeft)}
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
          <h4 className="text-lg font-semibold text-gray-300">
            Standard Requests
          </h4>
          <ul>
            {standardRequests.length > 0 ? (
              standardRequests.map((req, index) => (
                <li key={index} className="text-sm text-gray-200">
                  {req}
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-400">
                No standard requests selected
              </li>
            )}
          </ul>
        </div>

        <div className="border-t border-gray-600 pt-2">
          <h4 className="text-lg font-semibold text-gray-300">
            Special Requests
          </h4>
          <ul>
            {specialRequests.length > 0 ? (
              specialRequests.map((req, index) => (
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
          <h4 className="text-lg font-semibold text-gray-300">
            Additional Request
          </h4>
          <p className="text-sm text-gray-200">
            {additionalRequest || "No additional requests provided"}
          </p>
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
