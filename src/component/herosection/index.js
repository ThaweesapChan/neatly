import React from "react";
import { Button } from "../button";
import { useRouter } from "next/router";

function Herosection() {
conts
  return (
    <main
      className="relative flex h-screen w-full flex-col items-center justify-center bg-cover bg-center md:h-[56.25rem] md:w-full md:px-16 md:opacity-100"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.6) 19.66%, rgba(0, 0, 0, 0) 100%), url("/asset/loginduochair.jpeg")`, // ตรวจสอบ path รูปภาพ
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* กล่องข้อความ */}
      <div className="flex w-11/12 max-w-3xl items-center justify-center px-4 py-8 text-center font-notoSerif font-medium text-white shadow-lg md:flex">
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

      <div className="flex flex-row md:mt-10 md:flex md:w-[1120px] md:items-center">
        <div className="md:py relative my-12 mt-12 w-80 rounded bg-white p-6 shadow-lg md:flex md:w-full md:justify-end md:py-10">
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
              defaultValue=""
              className="w-full rounded border border-gray-300 p-4 text-gray-400"
            >
              <option value="" disabled>
                1 room, 2 guests {/* ข้อความตัวอย่าง */}
              </option>
              <option value="1">1 room, 2 guests</option>
              <option value="2">2 rooms, 4 guests</option>
              <option value="3">3 rooms, 6 guests</option>
            </select>
          </div>

          <Button
            variant="primary"
            label="Search"
            other="w-full md:w-36 md:translate-y-9 h-12 gap-2.5 text-white"
          />
        </div>
      </div>
    </main>
  );
}

export default Herosection;
