import React, { useState } from "react";
import { Button } from "../button";
import { useRouter } from "next/router";

function Herosection() {
  const router = useRouter();
  const [checkinValue, setCheckinValue] = useState("");
  const [checkoutValue, setCheckoutValue] = useState("");
  const [roomsGuestsValue, setRoomsGuestsValue] = useState("");
  const [currentError, setCurrentError] = useState(""); // สำหรับแสดง error ทีละขั้นตอน

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "checkin") {
      setCheckinValue(value);
      if (currentError === "checkin") setCurrentError(""); // ล้าง error ถ้ากรอกข้อมูลครบ
    } else if (id === "checkout") {
      setCheckoutValue(value);
      if (currentError === "checkout") setCurrentError("");
    } else if (id === "rooms-guests") {
      setRoomsGuestsValue(value);
      if (currentError === "rooms-guests") setCurrentError("");
    }
  };

  const handleSearch = () => {
    if (!checkinValue) {
      setCurrentError("checkin");
      return;
    }

    if (!checkoutValue) {
      setCurrentError("checkout");

      return;
    }

    if (!roomsGuestsValue) {
      setCurrentError("rooms-guests");
      return;
    }

    // Redirect ถ้ากรอกข้อมูลครบทุกช่อง
    const [rooms, guests] = {
      1: [1, 2],
      2: [2, 4],
      3: [3, 6],
    }[roomsGuestsValue];

    router.push({
      pathname: "/searchresultpage",
      query: {
        checkin: checkinValue,
        checkout: checkoutValue,
        rooms: rooms,
        guests: guests,
      },
    });
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <main
      className="relative flex h-full w-full flex-col items-center justify-center bg-cover bg-center sm:h-screen sm:w-full sm:px-16 sm:opacity-100"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.4) 10%, rgba(0, 0, 0, 0) 100%), url("/asset/bg_homepage.jpeg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* กล่องข้อความ__ */}
      <div className="flex max-w-3xl items-center justify-center px-4 py-8 text-center font-notoSerif font-medium text-white shadow-lg md:flex">
        <p
          className="sm:mt-18 mt-20 text-5xl leading-tight tracking-tight sm:text-6xl"
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
      <div className="flex w-full flex-row p-10 sm:mt-10 sm:w-full sm:items-center sm:p-20">
        <div className="relative w-full rounded bg-white p-6 shadow-lg sm:my-12 sm:mt-12 sm:flex sm:w-full sm:justify-end sm:py-10">
          {/* Check In */}
          <div className="mb-6 flex-1 sm:mb-0 sm:mr-4">
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
              value={checkinValue}
              onChange={handleInputChange}
              min={today}
              className={`w-full rounded border border-gray-300 p-3 ${
                checkinValue ? "text-gray-700" : "text-gray-400"
              }`}
            />
            {currentError === "checkin" && (
              <p className="mt-2 text-sm text-red-500">
                Please select a check-in date.
              </p>
            )}
          </div>

          {/* Check Out */}
          <div className="mb-6 flex-1 sm:mb-0 sm:mr-4">
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
              value={checkoutValue}
              onChange={handleInputChange}
              min={
                checkinValue
                  ? new Date(new Date(checkinValue).getTime() + 86400000)
                      .toISOString()
                      .split("T")[0]
                  : today
              }
              className={`w-full rounded border border-gray-300 p-3 ${
                checkoutValue ? "text-gray-700" : "text-gray-400"
              }`}
            />
            {currentError === "checkout" && (
              <p className="mt-2 text-sm text-red-500">
                Please select a check-out date.
              </p>
            )}
          </div>

          {/* Rooms & Guests */}
          <div className="mb-6 flex-1 sm:mb-0 sm:mr-4">
            <label
              htmlFor="rooms-guests"
              className="mb-2 block font-inter text-[1rem] font-normal text-gray-900"
            >
              Rooms & Guests
            </label>
            <select
              id="rooms-guests"
              name="rooms-guests"
              value={roomsGuestsValue}
              onChange={handleInputChange}
              className={`w-full rounded border border-gray-300 p-4 ${
                roomsGuestsValue ? "text-gray-700" : "text-gray-400"
              }`}
            >
              <option value="">Select rooms and guests</option>
              <option value="1">1 room, 2 guests</option>
              <option value="2">2 rooms, 4 guests</option>
              <option value="3">3 rooms, 6 guests</option>
            </select>
            {currentError === "rooms-guests" && (
              <p className="mt-2 text-sm text-red-500">
                Please select the number of rooms and guests.
              </p>
            )}
          </div>

          <Button
            type="1"
            name="Search"
            style="w-full sm:w-36 md:translate-y-9 h-12 gap-2.5 text-white"
            onClick={handleSearch}
          />
        </div>
      </div>
    </main>
  );
}

export default Herosection;
