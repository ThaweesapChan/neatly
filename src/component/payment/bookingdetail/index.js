import React, { useState, useEffect } from "react";
import { useBookingDetail } from "@/lib/BookingDetailContext";
import { useTotal } from "@/lib/TotalPriceContext";
import CountdownTimer from "@/components/CountdownTimer";
import { BriefcaseBusiness } from "lucide-react";

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
    setTotal({ totaprice: calculateTotal() });
  }, [bookingDetail]);

  if (bookingData === null) {
    return <div>Loading...</div>;
  }

  // Format date function
  const formatDate = (dateString) => {
    const options = {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Format price function
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "THB",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price || 0);
  };

  return (
    <div>
      <div className="space-y-4 rounded-lg bg-[#465C50] font-inter text-white">
        <div className="flex items-center justify-between rounded-t-lg bg-[#2F3E35] p-4">
          <h2 className="flex items-center gap-4 text-xl font-semibold">
            <BriefcaseBusiness className="text-[#81A08F]" /> Booking Detail
          </h2>
          <CountdownTimer className="h-[25px] w-[56px]" />
        </div>

        <div className="grid grid-cols-2 gap-2 px-6 text-sm">
          <div>
            <div className="font-semibold">Check-in</div>
            <div>After 2:00 PM</div>
          </div>
          <div>
            <div className="font-semibold">Check-out</div>
            <div>Before 12:00 PM</div>
          </div>
        </div>

        <div className="px-6 pt-2 text-sm">
          <div>
            {bookingData
              ? `${formatDate(bookingData?.check_in_date)} - ${formatDate(bookingData?.check_out_date)}`
              : "Loading dates..."}
          </div>
          <div className="pt-2">{`${bookingData?.roominfo?.guests || 0} guests`}</div>
        </div>

        <div className="px-6 pt-2 text-[#D5DFDA]">
          <div className="flex items-center justify-between">
            {`${bookingData?.roominfo?.room_type || "Unknown Room"}`}
            <span className="text-white">
              {" "}
              {formatPrice(bookingData?.roominfo?.promotion_price || 0)}
            </span>
          </div>
        </div>

        <div className="px-6 pt-2">
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
                  {req.name} <span>{formatPrice(req.price)}</span>
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-400">
                No special requests selected
              </li>
            )}
          </ul>
        </div>

        <div className="px-6 pt-2">
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
                No standard requests selected
              </li>
            )}
          </ul>
        </div>
        <div className="px-6 pt-2">
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

        <div className="p-6 pt-2">
          <hr className="rounded-md border border-[#5D7B6A]" />
          <div className="flex items-center justify-between pt-4">
            <span>Total</span>
            <span className="text-xl font-semibold">
              {formatPrice(calculateTotal())}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
