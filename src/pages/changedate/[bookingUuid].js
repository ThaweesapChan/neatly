import Navbar from "@/component/navbar";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import ChangeDateModal from "@/component/modalchangedate";

const ChangeDatePage = () => {
  const router = useRouter();
  const { bookingUuid } = router.query; // รับ uuid จาก Dynamic Route
  const [bookingDetails, setBookingDetails] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Get booking details by booking UUID
  const getBookingById = async (uuid) => {
    try {
      const response = await axios.get(`/api/getBookingById?uuid=${uuid}`);
      setBookingDetails(response.data);
      setCheckInDate(
        new Date(response.data.check_in_date).toISOString().split("T")[0],
      );
      setCheckOutDate(
        new Date(response.data.check_out_date).toISOString().split("T")[0],
      );
    } catch (error) {
      console.error("Error fetching booking details:", error);
    }
  };

  useEffect(() => {
    if (bookingUuid) {
      getBookingById(bookingUuid);
    }
  }, [bookingUuid]);

  if (!bookingDetails) {
    return (
      <div className="flex items-center justify-center font-inter text-3xl text-black">
        Loading...
      </div>
    );
  }

  // คำนวณจำนวนวันในการจองห้องพัก
  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Validate New Dates
  const validateNewDates = () => {
    const today = new Date().toISOString().split("T")[0]; // วันที่ปัจจุบัน
    if (checkInDate < today || checkOutDate < today) {
      setErrorMessage("Selected dates cannot be in the past.");
      return false;
    }

    const originalDays = calculateDays(
      bookingDetails.check_in_date,
      bookingDetails.check_out_date,
    );

    const newDays = calculateDays(checkInDate, checkOutDate);

    if (newDays !== originalDays) {
      setErrorMessage(
        `The new dates must have the same duration as your original booking (${originalDays} days).`,
      );
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleOpenModal = () => {
    if (validateNewDates()) {
      setIsModalOpen(true);
    }
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

  const roomImageUrl =
    bookingDetails.room.room_image_url || "/asset/default.jpeg";

  return (
    <>
      <Navbar />
      <div className="bg-[#E4E6ED] md:h-full md:pb-40">
        {/* Title Section */}
        <div className="p-6 md:p-20">
          <h1 className="font-notoSerif text-5xl font-medium leading-[55px] text-green-700 md:text-7xl">
            <span>
              Change
              <br className="block md:hidden" />
              <span>Check-in </span>
            </span>
            <br className="hidden md:block" />
            <span>and Check-out Date</span>
          </h1>
        </div>

        {/* Main Content */}
        <div className="max-w-screen mt-8 md:flex md:gap-4">
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
          <div className="w-full space-y-6 md:mr-10 md:w-9/12">
            {/* Room Details */}
            <div className="p-6 md:flex md:justify-between">
              <h2 className="text-3xl font-semibold text-black">
                {bookingDetails.room.room_type}
              </h2>
              <p className="mt-2 text-gray-600">
                Booking date:{" "}
                {new Date(bookingDetails.booking_date).toLocaleDateString(
                  "en-US",
                  {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  },
                )}
              </p>
            </div>

            {/* Original Booking Date */}
            <div className="px-6 text-gray-700">
              <strong className="font-semibold text-gray-800">
                Original Date:
              </strong>{" "}
              <p>
                {formatDate(bookingDetails.check_in_date)} -{" "}
                {formatDate(bookingDetails.check_out_date)}
              </p>
            </div>

            {/* Change Date Form */}
            <div className="m-4 rounded-md bg-white p-6 shadow-md">
              <h3 className="mb-4 font-semibold text-gray-800">Change Date</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-gray-700">Check-In</label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="mt-2 block w-full rounded border px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Check-Out</label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    min={checkInDate || new Date().toISOString().split("T")[0]}
                    className="mt-2 block w-full rounded border px-4 py-2"
                  />
                </div>
              </div>
              {errorMessage && (
                <p className="mt-2 text-red-500">{errorMessage}</p>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-12 flex flex-wrap gap-4 px-6 pb-10 md:mx-8 md:flex-row-reverse md:justify-between">
          <button
            onClick={handleOpenModal}
            className="w-full rounded-md bg-orange-500 px-6 py-3 font-openSans font-semibold text-white shadow hover:bg-orange-600 md:w-auto"
          >
            Confirm Change Date
          </button>
          <button
            onClick={() => router.push("/bookinghistory")}
            className="w-full rounded-md px-6 py-3 font-openSans font-semibold text-orange-500 hover:bg-orange-50 md:w-auto"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ChangeDateModal
          booking={bookingDetails}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default ChangeDatePage;
