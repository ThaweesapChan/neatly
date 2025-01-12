import { useBookingDetail } from "@/lib/BookingDetailContext";
import CountdownTimer from "@/components/CountdownTimer";
import { BriefcaseBusiness } from "lucide-react";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import TimeUpPopup from "@/components/TimePopup/idex";

export default function Bookingdetail() {
  const { bookingDetail, updateBookingDetail } = useBookingDetail();
  const [hasFetchedUserId, setHasFetchedUserId] = useState(false);

  useEffect(() => {
    // เช็คว่าได้เรียกข้อมูล user_id จาก token แล้วรึยัง
    if (!hasFetchedUserId) {
      const token = localStorage.getItem("token");

      if (token && !bookingDetail.user_id) {
        try {
          // Decode token เพื่อดึง user_id
          const decoded = jwtDecode(token);
          const user_id = decoded?.sub;

          if (user_id) {
            // อัปเดต bookingDetail ใน context
            updateBookingDetail({ user_id });
          } else {
            console.error("User ID not found in token");
          }
        } catch (error) {
          console.error("Error decoding token:", error.message);
        }
      } else if (!token) {
        console.error("Token not found in localStorage");
      }

      setHasFetchedUserId(true);
    }
  }, [hasFetchedUserId, bookingDetail.user_id, updateBookingDetail]);

  if (!bookingDetail || Object.keys(bookingDetail).length === 0) {
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

  const {
    check_in_date,
    check_out_date,
    roominfo,
    totalprice,
    additionalInfo,
  } = bookingDetail;

  return (
    <div>
      <div className="space-y-4 rounded-lg bg-[#465C50] font-inter text-white">
        <div className="flex items-center justify-between rounded-t-lg bg-[#2F3E35] p-4">
          <h2 className="flex items-center gap-4 text-xl font-semibold">
            <BriefcaseBusiness className="text-[#81A08F]" /> Booking Detail
          </h2>
          <TimeUpPopup />
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
            {check_in_date && check_out_date
              ? `${formatDate(check_in_date)} - ${formatDate(check_out_date)}`
              : "Loading dates..."}
          </div>
          <div className="pt-2">{`${roominfo?.guests || 0} guests`}</div>
        </div>

        <div className="px-6 pt-2 text-[#D5DFDA]">
          <div className="flex items-center justify-between">
            {`${roominfo?.room_type || "Unknown Room"}`}
            <span className="text-white">
              {formatPrice(roominfo?.promotion_price || roominfo?.price || 0)}
            </span>
          </div>
        </div>

        <div className="px-6 pt-2">
          <h4 className="text-lg font-semibold text-gray-300">
            Special Requests
          </h4>
          <ul>
            {Array.isArray(additionalInfo?.specialRequests) &&
            additionalInfo?.specialRequests.length > 0 ? (
              additionalInfo?.specialRequests.map((req, index) => (
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
            {Array.isArray(additionalInfo?.standardRequests) &&
            additionalInfo?.standardRequests.length > 0 ? (
              additionalInfo?.standardRequests.map((req, index) => (
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
        <div className="px-6 pt-2">
          <h4 className="text-lg font-semibold text-gray-300">
            Additional Requests
          </h4>
          {additionalInfo?.additionalRequest ? (
            <div className="text-sm text-gray-200">
              {additionalInfo.additionalRequest}
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
              {formatPrice(totalprice)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
