import React from "react";
import Roomcard from "@/component/roomcard";
import { Button } from "@/component/button";
function Searchresult() {
  return (
    <>
      {/* กล่องแบบฟอร์ม */}
      <div className="top-0 flex w-full flex-row bg-white md:sticky md:mt-10 md:flex md:w-full md:items-center">
        <div className="md:py relative my-12 mt-12 w-full rounded bg-white p-6 shadow-lg md:flex md:w-full md:justify-end md:py-10">
          {/* Check In */}
          <div className="mb-6 flex-1 md:mb-0 md:mr-4">
            <label
              htmlFor="checkin"
              className="mb-2 block font-inter text-[1rem] font-normal text-gray-900"
            >
              Check In
            </label>
            <input
              type="date"
              id="checkin"
              name="checkin"
              className="w-full rounded border border-gray-300 p-3 text-gray-400"
            />
            <style jsx>{`
              input[type="date"]::-webkit-calendar-picker-indicator {
                color: gray;
                opacity: 0.5;
              }
            `}</style>
          </div>
          {/* Check Out */}
          <div className="mb-6 flex-1 md:mb-0 md:mr-4">
            <label
              htmlFor="checkout"
              className="mb-2 block font-inter text-[1rem] font-normal text-gray-900"
            >
              Check Out
            </label>
            <input
              type="date"
              id="checkout"
              name="checkout"
              className="w-full rounded border border-gray-300 p-3 text-gray-400"
            />
            <style jsx>{`
              input[type="date"]::-webkit-calendar-picker-indicator {
                color: gray;
                opacity: 0.5;
              }
            `}</style>
          </div>
          {/* Rooms & Guests */}
          <div className="mb-6 flex-1 md:mb-0 md:mr-4">
            <label
              htmlFor="rooms-guests"
              className="mb-2 block font-inter text-[1rem] font-normal text-gray-900"
            >
              Rooms & Guests
            </label>
            <select
              id="rooms-guests"
              name="rooms-guests"
              className="w-full rounded border border-gray-300 p-4 text-gray-400"
            >
              <option value="" disabled selected>
                1 room, 2 guests {/* ข้อความตัวอย่าง */}
              </option>
              <option value="1">1 room, 2 guests</option>
              <option value="2">2 rooms, 4 guests</option>
              <option value="3">3 rooms, 6 guests</option>
            </select>
          </div>
          {/* ปุ่ม Search */}

          <Button
            type="2"
            name="Search"
            style="w-full md:w-36 md:translate-y-9 "
          />
        </div>
      </div>

      <Roomcard />
    </>
  );
}
export default Searchresult;
