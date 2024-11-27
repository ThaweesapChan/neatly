import React from "react";
import { Button } from "@/component/button";

function Herosection() {
  return (
    <main
      className="relative w-full h-screen md:w-full md:h-[56.25rem] md:opacity-100 md:px-16 bg-cover bg-center flex flex-col items-center justify-center "
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.6) 19.66%, rgba(0, 0, 0, 0) 100%), url("/asset/loginduochair.jpeg")`, // ตรวจสอบ path รูปภาพ
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* กล่องข้อความ */}
      <div className="flex items-center justify-center font-notoSerif font-medium text-white text-center px-4 py-8  shadow-lg w-11/12 max-w-3xl md:flex">
        <p
          className="text-6xl leading-tight tracking-tight"
          style={{
            letterSpacing: "-0.02em",
            textUnderlinePosition: "from-font",
            textDecorationSkipInk: "none",
          }}
        >
          A Best Place <br className="md:hidden" /> for Your Neatly Experience
        </p>
      </div>

      {/* กล่องแบบฟอร์ม */}
      <div className="md:w-[1120px] md:flex md:items-center flex flex-row md:mt-10">
        <div className="bg-white  p-6 rounded w-80 mt-12 my-12 shadow-lg md:w-full md:flex md:py relative md:justify-end md:py-10">
          {/* Check In */}
          <div className="mb-6 md:mb-0 md:mr-4 flex-1 ">
            <label
              htmlFor="checkin"
              className="block font-normal font-inter text-[1rem] mb-2 text-gray-900"
            >
              Check In
            </label>
            <input
              type="date"
              id="checkin"
              name="checkin"
              className="w-full p-3 rounded border border-gray-300 text-gray-400"
            />
            <style jsx>{`
              input[type="date"]::-webkit-calendar-picker-indicator {
                color: gray;
                opacity: 0.5;
              }
            `}</style>
          </div>
          {/* Check Out */}
          <div className="mb-6 md:mb-0 md:mr-4 flex-1 ">
            <label
              htmlFor="checkout"
              className="block font-normal font-inter text-[1rem] mb-2 text-gray-900"
            >
              Check Out
            </label>
            <input
              type="date"
              id="checkout"
              name="checkout"
              className="w-full p-3 rounded border border-gray-300 text-gray-400"
            />
            <style jsx>{`
              input[type="date"]::-webkit-calendar-picker-indicator {
                color: gray;
                opacity: 0.5;
              }
            `}</style>
          </div>
          {/* Rooms & Guests */}
          <div className="mb-6 md:mb-0 md:mr-4 flex-1">
            <label
              htmlFor="rooms-guests"
              className="block font-normal font-inter text-[1rem] mb-2 text-gray-900"
            >
              Rooms & Guests
            </label>
            <select
              id="rooms-guests"
              name="rooms-guests"
              className="w-full p-4 rounded border border-gray-300 text-gray-400"
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

          {/* <button className="w-full p-4 bg-orange-600 text-white rounded text-lg hover:bg-orange-700 md:absolute bottom-6 md:h-8 md:w-56">
            Search
          </button> */}
          <Button
            variant="primary"
            label="Search"
            other="w-full md:w-36 md:translate-y-9 "
          />
        </div>
      </div>
    </main>
  );
}

export default Herosection;
