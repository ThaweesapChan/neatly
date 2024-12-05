import React, { useState, useEffect } from "react";
import Roomcard from "@/component/roomcard";
import axios from "axios";

const Searchresult = () => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomDetails, setRoomDetails] = useState([]);
  const [error, setError] = useState(null);
  console.log("check roominfo", roomDetails);
  // ฟังก์ชันเรียกข้อมูลจาก API

  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/searchroom", {
        params: { check_in: checkIn, check_out: checkOut },
      });
      console.log("API Response:", response.data);
      setRoomDetails(response.data.data || []); // ป้องกันกรณี response ไม่มี rooms
    } catch (err) {
      console.error("Error fetching rooms:", err.message);
      setError("Failed to fetch rooms. Please try again.");
    }
  };

  // ดำเนินการเมื่อ Check In หรือ Check Out เปลี่ยนแปลง
  useEffect(() => {
    if (checkIn && checkOut) {
      fetchRooms();
    }
  }, [checkIn, checkOut]);

  return (
    <>
      {/* กล่องแบบฟอร์ม */}
      <div className="top-0 flex w-full flex-row bg-white md:sticky md:mt-10 md:flex md:w-full md:items-center">
        <div className="md:py my-12 mt-12 w-full rounded bg-white p-6 shadow-lg md:flex md:w-full md:justify-end md:py-10">
          {/* Check In */}
          <div className="mb-6 flex-1 md:mb-0 md:mr-4">
            <label
              htmlFor="checkin"
              className="mb-2 block font-inter text-[1rem] font-normal text-gray-900"
            >
              Check In
            </label>
            <input
              onChange={(e) => setCheckIn(e.target.value)}
              type="date"
              id="checkin"
              name="checkin"
              className="w-full rounded border border-gray-300 p-3 text-gray-400"
            />
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
              onChange={(e) => setCheckOut(e.target.value)}
              type="date"
              id="checkout"
              name="checkout"
              className="w-full rounded border border-gray-300 p-3 text-gray-400"
            />
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
              <option value="" disabled>
                1 room, 2 guests
              </option>
              <option value="1">1 room, 2 guests</option>
              <option value="2">2 rooms, 4 guests</option>
              <option value="3">3 rooms, 6 guests</option>
            </select>
          </div>

          {/* ปุ่ม Search */}
          <button
            className="w-[100px] h-[50px] rounded-sm border border-orange-500 bg-white text-orange-500"
            onClick={fetchRooms}
          >
            Search
          </button>
        </div>
      </div>

      {/* แสดงข้อมูลห้องพัก */}
      <div className="flex flex-col items-center justify-center gap-5 px-3 py-3">
        {error && <p className="text-red-500">{error}</p>}
        {roomDetails.length > 0 ? (
          roomDetails.map((room) => <Roomcard key={room.room_id} room={room} />)
        ) : (
          <div>Room Detail Not found</div>
        )}
      </div>
    </>
  );
};

export default Searchresult;
