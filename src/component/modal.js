import React from "react";
import { X } from "lucide-react";

const CancelModal = ({ booking, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-35">
      <div className="relative w-10/12 max-w-md rounded-md bg-white p-6 md:max-w-full">
        <div>
          {/* ปุ่ม X */}
          <button
            onClick={onClose}
            className="absolute right-6 top-6 text-gray-400 hover:text-gray-800"
          >
            <X className="h-6 w-6" />
          </button>

          <h2 className="mb-4 font-inter text-xl font-semibold text-black">
            Cancel Booking
          </h2>
        </div>

        <hr className="my-4 w-full border bg-gray-300" />

        {/* ข้อความ */}
        <p className="mb-8 font-inter text-[#646D89]">
          {booking.canRefund ? (
            "Are you sure you would like to cancel and request a refund?"
          ) : (
            <>
              <span>
                Cancellation of the booking now will not be able to request a
                refund.
              </span>
              <br />
              <span>Are you sure you would like to cancel this booking?</span>
            </>
          )}
        </p>

        {/* ปุ่ม */}
        <div className="flex flex-col gap-4 md:flex-row-reverse">
          <button
            onClick={onClose}
            className="w-full rounded-md bg-orange-500 px-4 py-2 font-openSans font-semibold text-white hover:bg-orange-600 md:w-auto md:bg-orange-500 md:text-white md:hover:bg-orange-600"
          >
            No, Don't Cancel
          </button>
          <button
            onClick={onConfirm}
            className="w-full rounded-md border border-orange-500 px-4 py-2 font-openSans font-semibold text-orange-500 hover:bg-orange-50 md:w-auto md:border md:border-orange-500 md:bg-transparent md:text-orange-500 md:hover:bg-orange-50"
          >
            {booking.canRefund
              ? "Yes, I want to cancel and request refund"
              : "Yes, I want to cancel"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelModal;
