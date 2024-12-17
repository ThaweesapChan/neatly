import React from "react";

export default function Bookingdetail() {
  return (
    <div>
      <div className="space-y-4 rounded-lg bg-[#2F4C43] p-4 text-white">
        <div className="bg- flex items-center justify-between">
          <h2 className="flex items-center gap-2">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            Booking Detail
          </h2>
          <span className="rounded bg-red-100 px-2 py-0.5 text-sm text-red-600">
            04:55
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <div className="text-gray-300">Check-in</div>
            <div>After 2:00 PM</div>
          </div>
          <div>
            <div className="text-gray-300">Check-out</div>
            <div>Before 12:00 PM</div>
          </div>
        </div>

        <div className="text-sm">
          <div>Th, 19 Oct 2022 - Fri, 20 Oct 2022</div>
          <div>2 Guests</div>
        </div>

        <div className="border-t border-gray-600 pt-2">
          <div className="flex items-center justify-between text-sm">
            <span>Superior Garden View Room</span>
            <span>2,500.00</span>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-2">
          <div className="flex items-center justify-between">
            <span>Total</span>
            <span className="text-lg font-semibold">THB 2,500.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}
