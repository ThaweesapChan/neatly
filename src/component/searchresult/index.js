import React, { useState, useEffect } from "react";
import Roomcard from "@/component/roomcard";
import axios from "axios";
import RoomModal from "../roomdetailpopup";
import { useRouter } from "next/router";
import { Button } from "../button";

const Searchresult = () => {
  const router = useRouter();
  const { checkin, checkout, guests, rooms } = router.query;
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guest, setGuest] = useState("");
  const [roomDetails, setRoomDetails] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setCurrentDate(today);
  }, []);

  useEffect(() => {
    if (router.query.checkin) {
      setCheckIn(router.query.checkin);
    }
    if (router.query.checkout) {
      setCheckOut(router.query.checkout);
    }
    if (router.query.guests) {
      setGuest(parseInt(router.query.guests));
    }
  }, [router.query]);

  // ฟังก์ชันเปิด Modal และตั้งค่า room ที่เลือก
  const openModal = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  // ฟังก์ชันปิด Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  // ฟังก์ชันดึงข้อมูลห้อง
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
      setError(null);
    } catch (err) {
      setError("Failed to fetch rooms. Please try again.");
    }
  };

  // ดึงข้อมูลห้องใหม่ทุกครั้งที่มีการเปลี่ยนแปลง checkIn, checkOut, หรือ guest
  useEffect(() => {
    fetchRooms();
  }, [checkIn, checkOut, guest]);

  return (
    <div className="flex flex-col items-center">
      <div className="top-0 z-50 flex w-full flex-row bg-white md:sticky md:mt-10">
        <div className="w-full shadow-lg">
          <div className="mx-auto max-w-7xl bg-white px-4 py-6 md:px-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="flex-1">
                <label
                  htmlFor="checkin"
                  className="mb-2 block font-inter text-[1rem] font-normal text-gray-900"
                >
                  Check In
                </label>
                <input
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  type="date"
                  id="checkin"
                  name="checkin"
                  min={currentDate} // ป้องกันการเลือกวันที่ย้อนหลัง
                  className="w-full rounded border border-gray-300 p-3 text-gray-700"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="checkout"
                  className="mb-2 block font-inter text-[1rem] font-normal text-gray-900"
                >
                  Check Out
                </label>
                <input
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  type="date"
                  id="checkout"
                  name="checkout"
                  min={checkIn || currentDate} // ป้องกันการเลือกวันที่ย้อนหลัง
                  className="w-full rounded border border-gray-300 p-3 text-gray-700"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="rooms-guests"
                  className="mb-2 block font-inter text-[1rem] font-normal text-gray-900"
                >
                  Rooms & Guests
                </label>
                <select
                  value={guest}
                  onChange={(e) => setGuest(parseInt(e.target.value, 10))}
                  id="rooms-guests"
                  name="rooms-guests"
                  className="w-full rounded border border-gray-300 p-4 text-gray-700"
                >
                  <option value="">Select rooms and guests</option>
                  <option value="2">1 room, 2 guests</option>
                  <option value="4">2 rooms, 4 guests</option>
                  <option value="6">3 rooms, 6 guests</option>
                </select>
              </div>

              <button
                onClick={fetchRooms}
                className="rounded border-[1px] border-orange-600 px-4 py-2 font-inter text-xl text-orange-600 transition-colors hover:bg-orange-500 hover:text-white md:h-[48px] md:w-[144px]"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex w-full max-w-7xl flex-col items-center justify-center gap-1 px-4 pb-10 md:px-6">
        {error && <p className="text-red-500">{error}</p>}
        {roomDetails.length > 0 ? (
          roomDetails.map((room) => (
            <Roomcard
              key={room.room_id}
              room={room}
              checkIn={checkIn}
              checkOut={checkOut}
              onClick={() => openModal(room)}
            />
          ))
        ) : (
          <div>No rooms available for the selected dates.</div>
        )}
      </div>

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
