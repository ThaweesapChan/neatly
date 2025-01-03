import React from "react";
import { X } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/router";

const ChangeDateModal = ({ booking, checkInDate, checkOutDate, onClose }) => {
  const router = useRouter();

  const handleConfirmChange = async () => {
    try {
      const updatedCheckInDate = new Date(checkInDate)
        .toISOString()
        .split("T")[0];
      const updatedCheckOutDate = new Date(checkOutDate)
        .toISOString()
        .split("T")[0];

      await axios.put(`/api/changeBookingDate`, {
        booking_id: booking.booking_id,
        check_in_date: updatedCheckInDate,
        check_out_date: updatedCheckOutDate,
      });

      alert("Booking dates updated successfully");
      onClose();
      router.push("/bookinghistory");
    } catch (error) {
      console.error("Error updating booking dates:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-45">
      <div className="relative w-10/12 max-w-2xl rounded-md bg-white p-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-800"
        >
          <X />
        </button>
        <h2 className="font-inter text-xl font-semibold text-black">
          Change Date
        </h2>
        <hr className="my-2 w-full border-b bg-gray-400" />
        <p className="mt-4 font-inter text-[#646D89]">
          Are you sure you want to change your check-in and check-out date?
        </p>
        <div className="mt-6 flex flex-col justify-end gap-4 font-openSans font-semibold md:flex-row-reverse md:justify-start">
          <button
            onClick={handleConfirmChange}
            className="rounded-md bg-orange-500 px-4 py-3 text-white"
          >
            Yes, I want to change
          </button>
          <button
            onClick={onClose}
            className="rounded-md border border-orange-500 bg-white px-4 py-3 text-orange-500"
          >
            No, I don&apos;t
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeDateModal;
