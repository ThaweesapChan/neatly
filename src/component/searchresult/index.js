import React, { useState, useEffect } from "react";
import Roomcard from "@/component/roomcard";
import axios from "axios";
import { Button } from "@/component/button";
import RoomModal from "../roomdetailpopup";
import { useRouter } from "next/router";

const Searchresult = () => {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guest, setGuest] = useState("");
  const [roomDetails, setRoomDetails] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // ใช้เปิดปิด modal
  const [selectedRoom, setSelectedRoom] = useState(null); // เก็บห้องที่ถูกเลือก
  // ฟังก์ชันเปิด Modal และตั้งค่า room ที่เลือก
  const openModal = (room) => {
    setSelectedRoom(room); // เก็บข้อมูลห้องที่ถูกเลือก
    setIsModalOpen(true); // เปิด Modal
  };

  // ฟังก์ชันปิด Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null); // ล้างข้อมูลห้องที่เลือก
  };

  const fetchRooms = async () => {
    if (!checkIn || !checkOut || !guest) {
      setError("Please fill in all fields.");
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      setError("Check-out date must be after check-in date.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/api/searchroom", {
        params: { check_in: checkIn, check_out: checkOut, guest },
      });
      setRoomDetails(response.data.data || []);
      console.log(roomDetails, "ข้อมูลของห้อง");
      setError(null);
    } catch (err) {
      setError("Failed to fetch rooms. Please try again.");
    }
  };

  useEffect(() => {
    if (checkIn && checkOut && guest) {
      fetchRooms();
    }
  }, [checkIn, checkOut, guest]);

  return (
    <div className="flex flex-col items-center">
      <div className="top-0 flex w-full flex-row bg-white md:sticky md:mt-10 md:flex md:w-full md:items-center">
        <div className="md:py my-12 mt-12 w-full rounded bg-white p-6 shadow-lg md:flex md:w-full md:justify-end md:py-10">
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
          <div className="mb-6 flex-1 md:mb-0 md:mr-4">
            <label
              htmlFor="rooms-guests"
              className="mb-2 block font-inter text-[1rem] font-normal text-gray-900"
            >
              Rooms & Guests
            </label>
            <select
              onChange={(e) => setGuest(parseInt(e.target.value, 10))}
              id="rooms-guests"
              name="rooms-guests"
              className="w-full rounded border border-gray-300 p-4 text-gray-400"
            >
              <option value="">Select rooms and guests</option>
              <option value="2">1 room, 2 guests</option>
              <option value="4">2 rooms, 4 guests</option>
              <option value="6">3 rooms, 6 guests</option>
            </select>
          </div>
          <Button
            onClick={fetchRooms}
            type="1"
            name="Search"
            style="w-full md:w-36 md:translate-y-9 h-12 gap-2.5 text-white"
          />
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-5 px-3 py-3">
        {error && <p className="text-red-500">{error}</p>}
        {roomDetails.length > 0 ? (
          roomDetails.map((room) => (
            <Roomcard
              key={room.room_id}
              room={room}
              checkIn={checkIn}
              checkOut={checkOut}
              onClick={() => {
                openModal(room);
              }}
            />
          ))
        ) : (
          <div>No rooms available for the selected dates.</div>
        )}
      </div>

      {/* เมื่อ isModalOpen เป็น true, จะแสดง RoomModal */}
      {isModalOpen && (
        <RoomModal
          room={selectedRoom}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Searchresult;
