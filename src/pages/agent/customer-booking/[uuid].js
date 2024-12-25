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
      console.log(response);
      setBookingDetail(response.data);

      // Calculate Total price
      const roomPrice = Number(response.data.room.price);
      const airportTransfer = Number(response.data.airport_transfer || 0);
      const promotionCodeDiscount = Number(response.data.promotion_code || 0);
      const calculatedTotal =
        roomPrice + airportTransfer - promotionCodeDiscount;
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
                  {bookingDetails.payment[0].payment_method} - ***888
                </span>
              </div>
              <div className="mt-4">
                {/* Room and price */}

                <div className="mb-6 flex justify-between font-inter text-gray-900">
                  <span>{bookingDetails.room.room_type} Room</span>
                  <span className="font-semibold leading-6">
                    {Number(bookingDetails.room.price).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>

                {/* Airport transter price */}

                <div className="mb-6 flex justify-between font-inter text-gray-900">
                  <span>Airport transfer</span>
                  <span className="font-semibold leading-6">
                    {Number(
                      bookingDetails.airport_transfer || 0,
                    ).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
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
                {bookingDetails.additional_request || "None"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingDetailPage;
