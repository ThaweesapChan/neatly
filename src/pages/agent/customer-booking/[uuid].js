import Sidebar from "@/component/sidebar";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

function BookingDetailPage() {
  const router = useRouter();
  const { uuid } = router.query;
  const [bookingDetails, setBookingDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const getBookingById = async (bookingId) => {
    try {
      const response = await axios.get(`/api/getBookingById?uuid=${bookingId}`);
      setBookingDetail(response.data);

      // Calculate Total price
      const roomPrice = Number(response.data?.total_price || 0); // ราคา Room
      const promotionCodeDiscount = Number(response.data?.promotion_code || 0); // ส่วนลดจาก Promotion Code
      const specialRequestsTotal = (
        response.data?.special_requests || []
      ).reduce((sum, request) => {
        const parsedRequest = JSON.parse(request || "{}");
        return sum + Number(parsedRequest.price || 0);
      }, 0); // รวมราคาจาก special_requests

      // Calculate Total price
      const calculatedTotal =
        roomPrice + specialRequestsTotal - promotionCodeDiscount;

      setTotal(calculatedTotal);
    } catch (error) {
      console.error("Error fetching booking details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (uuid) {
      getBookingById(uuid);
    }
  }, [uuid]);

  if (loading) {
    return (
      <div className="flex items-center justify-center font-inter text-3xl text-black">
        Loading...
      </div>
    );
  }

  if (!bookingDetails) {
    return (
      <div className="flex items-center justify-center font-inter text-3xl text-black">
        No booking details available
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

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full bg-gray-100">
          <nav className="flex items-center gap-10 bg-white p-6 pl-16 shadow">
            <ArrowLeft
              className="cursor-pointer text-gray-500"
              onClick={() => router.back()}
            />
            <h1 className="font-inter text-xl font-semibold text-[#2A2E3F]">
              {`${bookingDetails.user.first_name} ${bookingDetails.user.last_name}`}
            </h1>
            <h1 className="font-inter text-xl font-normal text-[#2A2E3F]">
              {bookingDetails.room.room_type}
            </h1>
          </nav>

          {/* Booking Detail Box */}

          <div className="mx-16 my-12 rounded-md bg-white p-20 pt-12 shadow-md">
            <div className="space-y-10 font-inter text-base font-normal leading-6 text-gray-600">
              <div>
                <strong className="mb-1 block text-xl font-semibold leading-8">
                  Customer name
                </strong>
                <p className="text-black">{`${bookingDetails.user.first_name} ${bookingDetails.user.last_name}`}</p>
              </div>
              <div>
                <strong className="mb-1 block text-xl font-semibold leading-8">
                  Guest(s)
                </strong>
                <p className="text-black">{bookingDetails.guests}</p>
              </div>
              <div>
                <strong className="mb-1 block text-xl font-semibold leading-8">
                  Room type
                </strong>
                <p className="text-black">
                  {bookingDetails.room.room_type} Room
                </p>
              </div>
              <div>
                <strong className="mb-1 block text-xl font-semibold leading-8">
                  Amount
                </strong>
                <p className="text-black">{`${bookingDetails.amount} room`}</p>
              </div>
              <div>
                <strong className="mb-1 block text-xl font-semibold leading-8">
                  Bed type
                </strong>
                <p className="text-black">{bookingDetails.room.bed_type}</p>
              </div>
              <div>
                <strong className="mb-1 block text-xl font-semibold leading-8">
                  Check-in
                </strong>
                <p className="text-black">
                  {formatDate(bookingDetails.check_in_date)}
                </p>
              </div>
              <div>
                <strong className="mb-1 block text-xl font-semibold leading-8">
                  Check-out
                </strong>
                <p className="text-black">
                  {formatDate(bookingDetails.check_out_date)}
                </p>
              </div>
              <div>
                <strong className="mb-1 block text-xl font-semibold leading-8">
                  Stay (total)
                </strong>
                <p className="text-black">{`${bookingDetails.stay} night${bookingDetails.stay > 1 ? "s" : ""}`}</p>
              </div>
              <div>
                <strong className="mb-1 block text-xl font-semibold leading-8">
                  Booking date
                </strong>
                <p className="text-black">
                  {formatDate(bookingDetails.booking_date)}
                </p>
              </div>
            </div>

            {/* Reciept Box */}

            <div className="mt-8 rounded-md bg-gray-100 p-12">
              {/* Payment Type */}

              <div className="flex items-center justify-end gap-4 font-inter text-gray-600">
                <h2 className="font-normal">Payment success via </h2>
                <span className="font-semibold">
                  {bookingDetails.payment[0].payment_method}
                </span>
              </div>
              <div className="mt-4">
                {/* Room and price */}

                <div className="mb-6 flex justify-between font-inter text-gray-900">
                  <span>{bookingDetails.room.room_type} Room</span>
                  <span className="font-semibold leading-6">
                    {Number(
                      bookingDetails.room.promotion_price ??
                        bookingDetails.room.price,
                    ).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>

                {/* Special_requests price */}

                <div className="mb-6 font-inter">
                  {/* ตรวจสอบว่า special_requests ไม่เป็น null */}
                  {bookingDetails.special_requests &&
                  bookingDetails.special_requests.length > 0 ? (
                    bookingDetails.special_requests.map((request, index) => {
                      // Parse JSON string ก่อนใช้งาน
                      const parsedRequest = JSON.parse(request);
                      return (
                        <div
                          key={index}
                          className="mb-2 flex justify-between text-gray-900"
                        >
                          <div className="flex-1">
                            <p>{parsedRequest.name}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              {parseFloat(parsedRequest.price).toLocaleString(
                                "en-US",
                                {
                                  minimumFractionDigits: 2,
                                },
                              )}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-gray-500">No special requests</p>
                  )}
                </div>

                {/* Promotion Code Discount */}

                <div className="mb-6 flex justify-between font-inter text-gray-900">
                  <span>Promotion Code</span>
                  <span className="font-semibold leading-6">
                    {Number(bookingDetails.promotion_code || 0).toLocaleString(
                      "en-US",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      },
                    )}
                  </span>
                </div>

                {/* Total price */}

                <div className="mt-4 flex justify-between border-t pt-4 font-inter text-gray-900">
                  <span className="mt-4 font-normal">Total</span>
                  <span className="mt-4 font-semibold">
                    THB{" "}
                    {total.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            </div>
            {/* Additional Request */}
            <div className="mt-8 rounded-md border bg-gray-300 px-12 py-6 font-inter">
              <h2 className="mb-2 font-semibold text-gray-700">
                Additional Request
              </h2>
              <p className="text-gray-700">
                {bookingDetails.additional_request || "No additional request"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingDetailPage;
