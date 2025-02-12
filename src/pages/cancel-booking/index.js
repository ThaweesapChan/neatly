import Navbar from "@/component/navbar";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

const CancelBookingPage = () => {
  const router = useRouter();
  const { booking_id } = router.query; // รับ booking_id จาก query string
  const [bookingDetails, setBookingDetails] = useState(null);

  // Get booking details by booking ID
  const getBookingById = async (uuid) => {
    try {
      const response = await axios.get(`/api/getBookingById?uuid=${uuid}`);
      setBookingDetails(response.data);
    } catch (error) {
      console.error("Error fetching booking details:", error);
    }
  };

  const handleCancelBooking = async () => {
    try {
      await axios.put(`/api/updateBookingStatus`, {
        booking_id: bookingDetails.booking_id,
        status: "cancelled",
        cancellation_date: new Date().toISOString(),
      });

      // Redirect ไปยังหน้า CancelSuccessPage พร้อมส่ง booking_id
      router.push(`/cancel-success?booking_id=${bookingDetails.booking_id}`);
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Failed to cancel booking. Please try again later.");
    }
  };

  useEffect(() => {
    if (booking_id) {
      getBookingById(booking_id);
    }
  }, [booking_id]);

  if (!bookingDetails) {
    return (
      <div className="flex items-center justify-center font-inter text-3xl text-black">
        Loading...
      </div>
    );
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

  // ใช้ URL ของรูปภาพจาก database
  const roomImageUrl = bookingDetails.room?.room_image_url;

  return (
    <>
      <Navbar />
      <div className="bg-[#E4E6ED] md:h-full md:pb-40">
        {/* Title Section */}
        <div className="p-6 md:p-20">
          <h1 className="font-notoSerif text-[44px] font-medium leading-[55px] text-green-700 md:text-7xl">
            Cancel Booking
          </h1>
        </div>

        {/* Main Content */}
        <div className="max-w-screen mt-4 md:flex md:gap-4">
          {/* Room Image Section */}
          <div className="w-full md:mx-20 md:w-1/2">
            <Image
              src={roomImageUrl}
              width={600}
              height={350}
              objectFit="cover"
              alt={bookingDetails.room.room_type}
              className="rounded-md"
            />
          </div>

          {/* Room Details Section */}
          <div className="w-full space-y-6 font-inter md:mr-10 md:w-9/12">
            {/* Room Details */}
            <div className="p-6 md:flex md:justify-between">
              <h2 className="text-3xl font-semibold text-black">
                {bookingDetails.room.room_type}
              </h2>
              <p className="mt-2 text-gray-600">
                Booking date: {formatDate(bookingDetails.booking_date)}
              </p>
            </div>

            {/* Original Booking Date */}
            <div className="px-6 text-gray-600">
              <p>
                {formatDate(bookingDetails.check_in_date)} -{" "}
                {formatDate(bookingDetails.check_out_date)}
              </p>
            </div>

            {/* Guest */}
            <div>
              <div className="px-6 text-gray-700">
                <span>{bookingDetails.guests}</span>{" "}
                <span className="text-gray-700">Guests</span>{" "}
              </div>
            </div>

            {/* Warning Message */}
            <div className="px-6 text-red-600">
              *Cancellation of the booking now will not be able to request a
              refund.
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-12 flex flex-wrap gap-4 px-6 pb-10 md:mx-10 md:flex-row-reverse md:justify-between">
          <button
            onClick={handleCancelBooking}
            className="w-full rounded-md bg-orange-600 px-6 py-3 font-openSans font-semibold text-white shadow hover:bg-orange-600 md:w-auto"
          >
            Cancel this Booking
          </button>
          <button
            onClick={() => router.push("/bookinghistory")}
            className="w-full rounded-md px-6 py-3 font-openSans font-semibold text-orange-500 hover:bg-orange-50 md:w-auto"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default CancelBookingPage;
