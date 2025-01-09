import React, { useState, useEffect } from "react";
import { useBookingDetail } from "@/lib/BookingDetailContext";
import { useTotal } from "@/lib/TotalPriceContext";
import CountdownTimer from "@/components/CountdownTimer";
export default function Bookingdetail() {
  const { bookingDetail, updateBookingDetail } = useBookingDetail();
  const { total, setTotal } = useTotal();
  const [bookingData, setBookingData] = useState(null);

  const calculateDays = (checkInDate, checkOutDate) => {
    if (!checkInDate || !checkOutDate) return 0;
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDiff = checkOut - checkIn;
    return timeDiff / (1000 * 3600 * 24); // คำนวณจำนวนวันจากเวลาที่แตกต่าง
  };

  const calculateTotal = () => {
    const days = calculateDays(
      bookingData?.check_in_date,
      bookingData?.check_out_date,
    );

    const specialRequestTotal = Array.isArray(
      bookingData?.additionalInfo?.specialRequests,
    )
      ? bookingData?.additionalInfo?.specialRequests.reduce(
          (acc, req) => acc + (req?.price || 0),
          0,
        )
      : 0;

    const roomPrice = bookingData?.roominfo?.promotion_price || 0;

    const totalRoomPrice = roomPrice * days;
    const totalprice = totalRoomPrice + specialRequestTotal;
    return totalprice;
  };

  useEffect(() => {
    setBookingData(bookingDetail);
    setTotal({ totalprice: calculateTotal() });
  }, [bookingDetail]);

  if (bookingData === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="space-y-4 rounded-lg bg-[#2F4C43] p-4 text-white">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2">Booking Detail</h2>
          <CountdownTimer className="h-[25px] w-[56px]" />
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <div className="text-gray-300">Check-in</div>
            <div>{bookingData?.check_in_date || "Loading..."}</div>
          </div>
          <div>
            <div className="text-gray-300">Check-out</div>
            <div>{bookingData?.check_out_date || "Loading..."}</div>
          </div>
        </div>

        <div className="text-sm">
          <div>
            {bookingData
              ? `${bookingData?.check_in_date} - ${bookingData?.check_out_date}`
              : "Loading dates..."}
          </div>
          <div>{`${bookingData?.roominfo?.guests || 0} guests`}</div>
        </div>

        <div className="border-t border-gray-600 pt-2">
          <div className="flex items-center justify-between">
            {`${bookingData?.roominfo?.room_type || "Unknown Room"}`}
            <span>
              {" "}
              {`+THB ${bookingData?.roominfo?.promotion_price || 0}`}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-2">
          <h4 className="text-lg font-semibold text-gray-300">
            Special Requests
          </h4>
          <ul>
            {Array.isArray(bookingData?.additionalInfo?.specialRequests) &&
            bookingData?.additionalInfo?.specialRequests.length > 0 ? (
              bookingData?.additionalInfo?.specialRequests.map((req, index) => (
                <li
                  key={index}
                  className="flex justify-between text-sm text-gray-200"
                >
                  {req.name} <span>+THB {req.price}</span>
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
            Standard Requests
          </h4>
          <ul>
            {Array.isArray(bookingData?.additionalInfo?.standardRequests) &&
            bookingData?.additionalInfo?.standardRequests.length > 0 ? (
              bookingData?.additionalInfo?.standardRequests.map(
                (req, index) => (
                  <li key={index} className="text-sm text-gray-200">
                    {req}
                  </li>
                ),
              )
            ) : (
              <li className="text-sm text-gray-400">
                No standardRequests requests selected
              </li>
            )}
          </ul>
        </div>
        <div className="border-t border-gray-600 pt-2">
          <h4 className="text-lg font-semibold text-gray-300">
            Additional Requests
          </h4>
          {bookingData?.additionalInfo?.additionalRequest ? (
            <div className="text-sm text-gray-200">
              {bookingData.additionalInfo.additionalRequest}
            </div>
          ) : (
            <div className="text-sm text-gray-400">No additional requests</div>
          )}
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
