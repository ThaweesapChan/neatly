import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import CancelModal from "../modal";

function BookingHistoryCard() {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDetails, setOpenDetails] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleCancelClick = (booking) => {
    setSelectedBooking(booking); // เก็บ Booking ที่เลือกใน state
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const handleConfirmCancel = (booking) => {
    // ตรวจสอบว่าเป็นการ Refund หรือ Cancel ธรรมดา
    if (booking.canRefund) {
      router.push(`/request-refund?booking_id=${booking.booking_id}`);
    } else if (booking.canCancelBooking) {
      router.push(`/cancel-booking?booking_id=${booking.booking_id}`);
    }
    handleCloseModal();
  };

  const handleChangeDate = (uuid) => {
    router.push(`/changedate/${uuid}`);
  };

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

  // Total Price Calculation
  const calculateTotalPrice = (booking) => {
    const roomPrice = Number(booking.rooms.price || 0);

    //  special requests total price
    const specialRequestsTotal = booking.special_requests
      ? booking.special_requests.reduce((total, request) => {
          const parsedRequest = JSON.parse(request);
          return total + Number(parsedRequest.price || 0);
        }, 0)
      : 0;

    /* // ดึงส่วนลดจาก promotion_code (หากมี)
    const promotionCodeDiscount = Number(booking.promotion_code_discount || 0); */

    return roomPrice + specialRequestsTotal /* - promotionCodeDiscount */;
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

  return (
    <>
      <div className="card-container w-full md:space-y-6 md:px-20">
        {bookings.map((booking) => {
          const roomImageUrl =
            booking.rooms.room_image_url || "/asset/default.jpeg";

          return (
            <div
              key={booking.booking_id}
              className="booking-card overflow-hidden rounded-lg md:shadow-none"
            >
              <div className="md:flex md:gap-6">
                {/* Room Image */}
                <div className="md:w-1/3">
                  <Image
                    src={roomImageUrl}
                    width={500}
                    height={250}
                    alt={booking.rooms.room_type}
                    className="h-48 w-full object-cover md:h-full md:rounded-md md:object-contain md:object-top"
                  />
                </div>

                {/* Room Details Section */}
                <div className="p-4 md:w-2/3">
                  <div className="flex flex-col justify-between font-inter md:flex-row md:items-center">
                    {/* Room Name */}
                    <h2 className="text-3xl font-semibold text-black">
                      {booking.rooms.room_type}
                    </h2>

                    {/* Booking Date and Cancellation Date */}
                    <div className="mt-2 text-gray-600 md:mt-0 md:flex md:flex-col md:items-end">
                      <p className="text-base">
                        Booking date: {formatDate(booking.booking_date)}
                      </p>
                      {booking.status === "cancelled" &&
                        booking.cancellation_date && (
                          <p className="text-base">
                            Cancellation date:{" "}
                            {formatDate(booking.cancellation_date)}
                          </p>
                        )}
                    </div>
                  </div>

                  {/* วันที่ Check-in และ Check-out */}
                  <div className="my-6 font-inter text-gray-800 md:flex md:gap-8">
                    <p className="flex flex-col">
                      <span className="font-semibold">Check-in</span>{" "}
                      {formatDate(booking.check_in_date)} | After 2:00 PM
                    </p>
                    <p className="flex flex-col">
                      <span className="font-semibold">Check-out</span>{" "}
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
                            </span>
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>{booking.rooms.room_type}</span>
                          <span className="font-semibold text-gray-900">
                            {booking.rooms.price.toFixed(2)}
                          </span>
                        </div>
                        <div>
                          {booking.special_requests &&
                          booking.special_requests.length > 0 ? (
                            booking.special_requests.map((request, index) => {
                              // Parse JSON string ก่อนใช้งาน
                              const parsedRequest = JSON.parse(request);
                              return (
                                <div
                                  key={index}
                                  className="flex justify-between text-gray-700"
                                >
                                  <span className="mb-2">
                                    {parsedRequest.request}
                                  </span>
                                  <span className="font-semibold text-gray-900">
                                    {parseFloat(
                                      parsedRequest.price,
                                    ).toLocaleString("en-US", {
                                      minimumFractionDigits: 2,
                                    })}
                                  </span>
                                </div>
                              );
                            })
                          ) : (
                            <p>No special requests</p>
                          )}
                        </div>
                        <div className="flex justify-between text-gray-700">
                          <span className="mb-3">Promotion Code</span>
                          <span className="mb-2 font-semibold text-gray-900">
                            {parseFloat(
                              booking.promotion_code_discount || 0,
                            ).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                        <hr className="my-10 w-full rounded-md border-b bg-gray-900" />
                        <div className="flex justify-between text-gray-700">
                          <span>Total</span>
                          <span className="text-xl font-semibold text-gray-900">
                            THB{" "}
                            {calculateTotalPrice(booking).toLocaleString(
                              "en-US",
                              {
                                minimumFractionDigits: 2,
                              },
                            )}
                          </span>
                        </div>
                        <div className="bg-gray-300 p-4">
                          <p className="font-semibold text-gray-700">
                            Additional Request
                          </p>
                          <div className="text-gray-500">
                            {booking.additional_request ||
                              "No additional request"}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Button */}
                  {booking.status !== "cancelled" && (
                    <div className="mt-6 flex flex-wrap gap-2 md:justify-end">
                      <button
                        onClick={handleRoomDetail}
                        className="z-10 flex-grow rounded-md border px-4 py-2 font-semibold text-orange-500 md:flex-none md:cursor-pointer md:hover:text-orange-400"
                      >
                        Room Detail
                      </button>

                      {booking.canChangeDate && (
                        <button
                          className="z-10 flex-grow rounded-md bg-orange-500 px-4 py-2 font-semibold text-white md:flex-none"
                          onClick={() => handleChangeDate(booking.booking_id)}
                        >
                          Change Date
                        </button>
                      )}
                    </div>
                  )}

                  {/* Cancel Button */}
                  {booking.status !== "cancelled" && (
                    <div className="mt-2 text-right md:flex md:-translate-y-12">
                      {booking.canCancelBooking && (
                        <button
                          className="px-4 py-2 font-semibold text-orange-500 hover:text-red-600"
                          onClick={() => handleCancelClick(booking)}
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  )}
                  {/* Cancel Modal */}
                  {isModalOpen && (
                    <CancelModal
                      booking={selectedBooking}
                      onClose={handleCloseModal}
                      onConfirm={handleConfirmCancel}
                    />
                  )}
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
