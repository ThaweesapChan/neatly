import Navbar from "@/component/navbar";
import { Button } from "@/component/button";
import { useRouter } from "next/router";
import { useBookingDetail } from "@/lib/BookingDetailContext";

export default function PaymentSuccess() {
  const { bookingDetail } = useBookingDetail();
  const router = useRouter();

  const handleBackToHome = () => {
    router.push("/");
  };

  const handleCheckBookingDetail = () => {
    router.push(`/bookinghistory`);
  };

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

  if (!bookingDetail || Object.keys(bookingDetail).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="h-full items-center justify-center bg-[#E4E6ED]">
        <div className="w-full max-w-screen-md md:mx-auto md:flex md:flex-col md:justify-center">
          {/* Header Section */}
          <div className="bg-[#2F3E35] px-8 py-8 text-center text-white md:mt-16 md:rounded-t-sm">
            <h1 className="font-notoSerif text-[44px] font-medium">
              Thank you for booking
            </h1>
            <p className="mt-4 font-inter text-sm font-medium text-green-400 md:mx-20 md:mt-6 md:text-sm">
              <span>
                <span className="block">
                  We are looking forward to hosting you at our place.
                </span>
                We will send you more information about check-in and staying at
                our Neatly{" "}
                <span className="block">
                  closer to your date of reservation
                </span>
              </span>
            </p>
          </div>

          {/* Booking Details */}
          <div className="bg-[#465C50] px-6 pb-10 pt-8 md:w-full md:rounded-b-sm md:px-8 md:py-10">
            <div className="gap-4 rounded-md bg-[#5D7B6A] p-8 font-inter text-white">
              <div>
                <p className="font-semibold">
                  {formatDate(bookingDetail.check_in_date)} -{" "}
                  {formatDate(bookingDetail.check_out_date)}
                </p>
                <p className="mb-10 mt-4">
                  {bookingDetail.roominfo?.guests || 0} Guests
                </p>
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <p className="font-semibold">Check-in</p>
                  <p>After 2:00 PM</p>
                </div>
                <div>
                  <p className="font-semibold">Check-out</p>
                  <p>Before 12:00 PM</p>
                </div>
              </div>
            </div>

            {/* Payment Type Success Section */}
            <div className="mb-8 mt-6 font-inter text-[#D5DFDA]">
              <p className="flex justify-between">
                Payment success via{"   "}
                <span className="font-semibold">
                  {bookingDetail.payment_method || "Credit Card"}
                </span>
              </p>
            </div>

            {/* Room Type */}
            <div>
              <div className="mt-4 flex justify-between font-inter text-[#D5DFDA]">
                <p>{bookingDetail.roominfo?.room_type || "Unknown Room"}</p>
                <p className="text-white">
                  {parseFloat(
                    bookingDetail.roominfo?.promotion_price ||
                      bookingDetail.roominfo?.price ||
                      0,
                  ).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>

            {/* Special Requests */}
            <div className="font-inter">
              {Array.isArray(bookingDetail.additionalInfo?.specialRequests) &&
              bookingDetail.additionalInfo.specialRequests.length > 0 ? (
                bookingDetail.additionalInfo.specialRequests.map(
                  (req, index) => (
                    <div key={index} className="mt-4 flex justify-between">
                      <span className="text-[#D5DFDA]">{req.name}</span>
                      <span className="text-white">
                        {parseFloat(req.price || 0).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  ),
                )
              ) : (
                <p className="text-[#D5DFDA]">No special requests</p>
              )}
            </div>

            {/* Total Price */}
            <hr className="my-8 border-gray-400 md:my-12" />
            <p className="flex justify-between font-inter text-lg font-bold text-white">
              <span className="text-[#D5DFDA]">Total</span>
              <span className="font-semibold text-white">
                THB{" "}
                {parseFloat(bookingDetail.totalprice || 0).toLocaleString(
                  "en-US",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  },
                )}
              </span>
            </p>
          </div>

          {/* Button */}
          <div className="flex w-full flex-col-reverse items-center justify-center gap-6 pb-6 pt-8 md:flex-row md:gap-8 md:pb-16 md:pt-10">
            <div className="md:w-1/3">
              <Button
                type="3"
                name="Check Booking Detail"
                style="w-full px-4 "
                onClick={handleCheckBookingDetail}
              />
            </div>
            <Button
              type="1"
              name="Back To Home"
              style="w-[80%] px-4 md:w-1/3"
              onClick={handleBackToHome}
            />
          </div>
        </div>
      </div>
    </>
  );
}
