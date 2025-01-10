import React from "react";
import Image from "next/image";
import { Images, Users, Bed, Maximize } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useBookingDetail } from "@/lib/BookingDetailContext";
function Roomcard({ room, onClick, checkIn, checkOut }) {
  const [roomData, setRoomData] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const router = useRouter();
  const { bookingDetail, updateBookingDetail } = useBookingDetail();

  useEffect(() => {
    if (room) {
      setRoomData(room);
      setCheckInDate(checkIn);
      setCheckOutDate(checkOut);
    }
  }, []);

  // ฟังก์ชันจัดการการคลิกปุ่ม "Rom detail"
  const handleRoomDetailClick = () => {
    router.push({
      pathname: "/roomdetail",
      query: {
        roomId: room.room_id,
      },
    });
  };

  // ฟังก์ชันจัดการการคลิกปุ่ม "Book Now"
  const handleBookNowClick = () => {
    // ส่งข้อมูลการจองเข้า Context
    const bookingData = {
      roominfo: roomData,
      check_in_date: checkInDate,
      check_out_date: checkOutDate,
    };
    // บันทึกข้อมูลลงใน Context
    updateBookingDetail(bookingData);
    // เปลี่ยนหน้าไปยัง Payment Step 1
    router.push("/payment/step1");
  };

  return (
    <>
      {/*<div className="flex w-[90%] flex-col items-center justify-center gap-2 border bg-white md:h-[400px] md:flex-row">
        <div className="relative flex w-full md:w-[60%]">
          <Image
            src={room.room_image_url}
            alt="room-image"
            className="max-h-[265px] w-full rounded-md md:w-[453px]"
            width={453}
            height={265}
          />
          <button
            onClick={onClick}
            className="absolute bottom-4 left-4 flex items-center justify-center rounded-full bg-gray-800 p-2 text-white hover:bg-gray-700"
            aria-label="View Images"
          >
            <Images className="h-6 w-6" />
          </button>
        </div>

        <div className="flex w-[80%] flex-col items-end justify-end md:max-w-[80%]">
          <div className="p-2">
            <h2 className="font-inter text-2xl font-semibold text-black">
              {room.room_type}
            </h2>
            <div className="mt-2 flex gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <span className="font-inter text-gray-700">
                  {room.guests} Guests
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-inter text-gray-700">2</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-inter text-gray-700">
                  {room.size} sqm
                </span>
              </div>
            </div>
            <p className="font-inter text-sm text-gray-700 text-muted-foreground">
              {room.room_description}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex flex-col items-end">
              <p className="font-inter text-sm text-gray-700 text-muted-foreground line-through">
                {room.price}
              </p>

              <h3 className="font-inter text-2xl font-semibold text-gray-900">
                {room.promotion_price}
              </h3>
            </div>

            <div className="flex flex-col items-end font-inter text-sm text-gray-700 text-muted-foreground">
              <p className="font-inter">Per Night</p>
              (Including Taxes & Fees)
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-2">
            <button
              onClick={handleRoomDetailClick}
              variant="link"
              className="h-[48px] w-[143px] flex-1 text-orange-600"
            >
              Room Detail
            </button>

            <button
              onClick={handleBookNowClick}
              className="h-[48px] w-[143px] flex-1 rounded-md bg-orange-600 text-white hover:bg-orange-700"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>*/}

      <div className="overflow-hidden rounded-lg bg-white shadow-sm md:w-[80%]">
        <div className="md:flex md:h-[280px] ">
          <div className="relative flex w-full md:w-[60%]">
            <Image
              src={room.room_image_url}
              alt="room-image"
              className="max-h-[265px] w-full rounded-md md:w-[453px]"
              width={453}
              height={265}
            />
            <button
              onClick={onClick}
              className="absolute bottom-4 left-4 flex items-center justify-center rounded-full bg-gray-800 p-2 text-white hover:bg-gray-700"
              aria-label="View Images"
            >
              <Images className="h-6 w-6" />
            </button>
          </div>

          <div className="p-4 md:flex md:flex-1 md:flex-col md:p-6">
            <div className="md:flex md:items-start md:justify-between">
              <div className="space-y-4 md:space-y-6">
                <h3 className="text-xl font-semibold">{room.room_type}</h3>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    <span>{room.guests} Guests</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Bed className="h-4 w-4" />
                    <span>{room.bed_type}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Maximize className="h-4 w-4" />
                    <span>{room.size} sqm</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600">{room.room_description}</p>
              </div>

              <div className="mt-4 md:mt-0 md:text-right">
                <div className="text-sm text-gray-500 line-through">
                  THB {room.price}
                </div>
                <div className="text-xl font-semibold">
                  THB {room.promotion_price}
                </div>
                <div className="text-sm text-gray-500">
                  Per Night
                  <br />
                  (Including Taxes & Fees)
                </div>
              </div>
            </div>

            <div className="mt-auto grid grid-cols-2 gap-3 pt-6 md:ml-auto md:max-w-[260px]">
              <button className="rounded border border-orange-600 px-4 py-2 text-sm font-medium text-orange-600 transition-colors hover:bg-orange-50">
                Room Detail
              </button>
              <button className="rounded bg-orange-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-700">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Roomcard;
