import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";

function BookingHistoryCard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [openDetails, setOpenDetails] = useState({});

  const handleRoomDetail = () => {
    router.push("/roomdetail");
  };

  const toggleDetails = (id) => {
    setOpenDetails((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // get Data Form API
  const fetchBooking = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/getBookingHistory", {
        headers: { Authorization: `Bearer ${token}` },
      });
      /*  console.log(response.data.bookings); */
      setBookings(response.data.bookings);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  if (loading)
    return (
      <h1 className="flex justify-center text-2xl text-green-700">
        Loading...
      </h1>
    );
  if (error)
    return (
      <h1 className="flex justify-center text-2xl text-black">
        Error: {error}
      </h1>
    );

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

  const roompicture = [
    { label: "Superior Garden View", src: "/asset/superior.jpeg" },
    { label: "Deluxe", src: "/asset/deluxe.jpeg" },
    { label: "Superior", src: "/asset/room.jpeg" },
    { label: "Premier Sea View", src: "/asset/premier.jpeg" },
    { label: "Supreme", src: "/asset/supreme.jpeg" },
    { label: "Suite", src: "/asset/room2.jpeg" },
  ];

  return (
    <>
      <div className="card-container w-full md:space-y-6 md:px-20">
        {bookings.map((booking) => {
          const matchedImage =
            roompicture.find((room) => room.label === booking.rooms.room_type)
              ?.src || "/asset/default.jpeg";

          return (
            <div
              key={booking.booking_id}
              className="booking-card overflow-hidden rounded-lg shadow-md md:shadow-none"
            >
              <div className="md:flex">
                {/* รูปภาพ */}
                <div className="md:w-1/3">
                  <Image
                    src={matchedImage}
                    width={500}
                    height={250}
                    alt={booking.rooms.room_type}
                    className="h-48 w-full object-cover md:h-full md:rounded-md md:object-contain md:object-top"
                  />
                </div>

                {/* ข้อมูลห้องพัก */}
                <div className="p-4 md:w-2/3">
                  <div className="flex flex-col items-start justify-between font-inter md:flex-row">
                    <h2 className="text-3xl font-semibold text-black">
                      {booking.rooms.room_type}
                    </h2>
                    <p className="mt-2 text-base text-gray-600">
                      Booking date: {formatDate(booking.booking_date)}
                    </p>
                  </div>

                  {/* วันที่ Check-in และ Check-out */}
                  <div className="my-6 font-inter text-gray-800 md:flex md:gap-8">
                    <p className="md:flex md:flex-col">
                      <p className="font-semibold">Check-in:</p>{" "}
                      {formatDate(booking.check_in_date)} | After 2:00 PM
                    </p>
                    <p className="md:flex md:flex-col">
                      <p className="font-semibold">Check-out:</p>{" "}
                      {formatDate(booking.check_out_date)} | Before 12:00 PM
                    </p>
                  </div>

                  {/* Booking Detail */}
                  <div className="bg-gray-200 p-4 font-inter shadow-sm">
                    <button
                      onClick={() => toggleDetails(booking.booking_id)}
                      className="flex w-full items-center justify-between"
                    >
                      <span className="font-openSans font-semibold text-gray-900">
                        Booking Detail
                      </span>
                      <span
                        className={`transform transition-transform ${
                          openDetails[booking.booking_id]
                            ? "rotate-180"
                            : "rotate-0"
                        }`}
                      >
                        ▲
                      </span>
                    </button>

                    {openDetails[booking.booking_id] && (
                      <div className="mt-4 space-y-2 text-gray-700">
                        <div className="flex justify-between">
                          <span>
                            {booking.guests} Guests ({booking.stay} Night)
                          </span>
                          <span>
                            Payment success via{" "}
                            <span className="font-semibold">
                              {booking.payment[0]?.payment_method || "N/A"}
                            </span>{" "}
                            - ***888
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>{booking.rooms.room_type}</span>
                          <span className="font-semibold text-gray-900">
                            {booking.rooms.price.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between text-gray-700">
                          <span>{booking.special_requests}</span>
                          <span className="mb-2 font-semibold text-gray-900">
                            {parseFloat(200).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between text-gray-700">
                          <span className="mb-3">Promotion Code</span>
                          <span className="mb-2 font-semibold text-gray-900">
                            {parseFloat(200).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                        <hr className="my-10 w-full rounded-md border-b bg-gray-900" />
                        <div className="flex justify-between text-gray-700">
                          <span>Total</span>
                          <span className="text-xl font-semibold text-gray-900">
                            THB{" "}
                            {parseFloat(booking.total_price).toLocaleString(
                              "en-US",
                              { minimumFractionDigits: 2 },
                            )}
                          </span>
                        </div>
                        <div className="bg-gray-300 p-4">
                          <p className="font-semibold text-gray-700">
                            Additional Request
                          </p>
                          <div className="text-gray-500">
                            {booking.additional_request}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ปุ่ม */}
                  <div className="mt-6 flex flex-wrap gap-2 md:justify-end">
                    <button
                      onClick={handleRoomDetail}
                      className="z-10 flex-grow rounded-md border px-4 py-2 font-semibold text-orange-500 md:flex-none md:cursor-pointer"
                    >
                      Room Detail
                    </button>

                    {booking.canChangeDate && (
                      <button className="z-10 flex-grow rounded-md bg-orange-500 px-4 py-2 font-semibold text-white md:flex-none">
                        Change Date
                      </button>
                    )}
                  </div>

                  {/* Cancel Button */}
                  <div className="mt-2 text-right md:flex md:-translate-y-12">
                    {booking.canCancelBooking && (
                      <button className="px-4 py-2 font-semibold text-orange-500 hover:text-red-600">
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <hr className="my-10 w-full border-b bg-gray-900" />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default BookingHistoryCard;
