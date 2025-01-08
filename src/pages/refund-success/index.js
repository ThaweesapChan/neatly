import Navbar from "@/component/navbar";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

const RefundSuccessPage = () => {
  const router = useRouter();
  const { booking_id } = router.query; // รับ booking_id จาก query string
  const [bookingDetails, setBookingDetails] = useState(null);

  // ดึงข้อมูลการจองจาก booking_id
  const getBookingById = async (id) => {
    try {
      const response = await axios.get(`/api/getBookingById?uuid=${id}`);
      setBookingDetails(response.data);
    } catch (error) {
      console.error("Error fetching booking details:", error);
    }
  };

  useEffect(() => {
    if (booking_id) {
      getBookingById(booking_id);
    }
  }, [booking_id]);

  if (!bookingDetails) {
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

  return (
    <>
      <Navbar />
      <div className="h-screen items-center justify-center bg-[#E4E6ED]">
        <div className="w-full max-w-screen-md md:mx-auto md:flex md:flex-col md:justify-center">
          {/* Header Section */}
          <div className="bg-[#2F3E35] px-8 py-8 text-center text-white md:mt-16 md:rounded-t-sm">
            <h1 className="font-notoSerif text-[44px] font-medium">
              Your Request has been Submitted
            </h1>
            <p className="mt-4 font-inter text-sm font-medium text-green-400 md:mx-20 md:mt-6 md:text-sm">
              <p>The cancellation is complete.</p>{" "}
              <p className="block md:inline">
                You will receive an email with a detail and refund
              </p>{" "}
              within 48 hours.
            </p>
          </div>

          {/* Booking Details */}
          <div className="bg-[#465C50] px-6 pb-10 pt-8 md:w-full md:rounded-b-sm md:px-8 md:py-10">
            <div className="gap-4 rounded-md bg-[#5D7B6A] p-8 font-inter text-white">
              <h2 className="text-xl font-semibold">
                {bookingDetails.room.room_type}
              </h2>
              <p className="mt-4 font-semibold">
                {formatDate(bookingDetails.check_in_date)} -{" "}
                {formatDate(bookingDetails.check_out_date)}
              </p>
              <p className="mt-4">{bookingDetails.guests} Guests</p>

              <p className="mt-8 text-green-300">
                Booking date: {formatDate(bookingDetails.booking_date)}
              </p>
              <p className="mt-4 text-green-300">
                Cancellation date: {formatDate(new Date())}
              </p>
            </div>
            <hr className="my-8 border-gray-400 md:my-12" />
            <p className="flex justify-between text-lg font-bold text-white">
              <span className="text-[#D5DFDA]">Total Refund</span>THB{" "}
              {parseFloat(bookingDetails.total_price).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>

          {/* Back to Home Button */}
          <div className="mt-6 flex justify-center md:mt-10">
            <button
              onClick={() => router.push("/")}
              className="w-full max-w-xs rounded-md bg-orange-500 px-6 py-3 font-openSans font-semibold text-white shadow hover:bg-orange-600"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RefundSuccessPage;
