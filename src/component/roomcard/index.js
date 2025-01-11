import React from "react";
import Image from "next/image";
import { Images, Users, Bed, Maximize, SquareDashed } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useBookingDetail } from "@/lib/BookingDetailContext";
import { useTimer } from "@/lib/TimerContext";
function Roomcard({ room, onClick, checkIn, checkOut }) {
  const [roomData, setRoomData] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [roomId, setRoomId] = useState();
  const router = useRouter();
  const { bookingDetail, updateBookingDetail } = useBookingDetail();
  const { resetTimer } = useTimer();

  useEffect(() => {
    if (room) {
      setRoomData(room);
      setCheckInDate(checkIn);
      setCheckOutDate(checkOut);
      setRoomId(room.room_id);
    }
  }, []);

  // ฟังก์ชันจัดการการคลิกปุ่ม "Rom detail"
  const handleRoomDetailClick = () => {
    router.push(`/roomdetail/${roomId}`);
  };

  // ฟังก์ชันจัดการการคลิกปุ่ม "Book Now"
  const handleBookNowClick = () => {
    // ส่งข้อมูลการจองเข้า Context
    const bookingData = {
      roominfo: roomData,
      check_in_date: checkInDate,
      check_out_date: checkOutDate,
    };
    resetTimer();
    // บันทึกข้อมูลลงใน Context
    updateBookingDetail(bookingData);
    // เปลี่ยนหน้าไปยัง Payment Step 1
    router.push("/payment/step1");
  };

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-sm">
      <div className="justify-between md:flex">
        <div className="h-[320px] w-full md:mt-6 md:w-1/2 p-1">
          <div className="grid h-[95%] w-full md:w-[94%] grid-cols-1 grid-rows-1 overflow-hidden rounded-lg">
            {/* Image Layer */}
            <div className="col-span-1 col-start-1 row-span-1 row-start-1">
              <Image
                src={room.room_image_url}
                alt={room.room_type}
                className="h-full w-full object-cover"
                width={453}
                height={300}
                priority
              />
            </div>
            {/* Button Layer - Using Grid for Consistent Placement */}
            <div className="col-span-1 col-start-1 row-span-1 row-start-1 grid">
              <button
                onClick={onClick}
                className="m-4 place-self-start self-end rounded-full bg-gray-800/80 p-2 text-white backdrop-blur-sm transition hover:bg-gray-700"
                aria-label="View Images"
              >
                <Images className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-3 font-inter md:flex md:flex-1 md:flex-col md:p-6">
          <div className="flex flex-col items-end md:flex-row md:items-stretch">
            <div className="space-y-4 md:w-[60%]">
              <h3 className="whitespace-nowrap p-2 text-2xl font-semibold text-gray-700">
                {room.room_type}
              </h3>

              <div className="flex flex-wrap gap-4 text-base text-gray-900">
                <div className="flex items-center gap-1.5">
                  <Users className="h-3 w-3" />
                  <span>{room.guests} Guests</span>
                </div>
                <span className="hidden h-4 w-px bg-gray-300 sm:inline-block"></span>

                <div className="flex items-center gap-1.5">
                  <Bed className="h-3 w-3" />
                  <span>{room.bed_type}</span>
                  <span className="hidden h-4 w-px bg-gray-300 sm:inline-block"></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <SquareDashed className="w- h-3" />
                  <span>{room.room_size} sqm</span>
                </div>
              </div>

              <p className="text-base text-gray-600">
                {room.room_description.length > 100
                  ? room.room_description.slice(0, 100) + "..."
                  : room.room_description}
              </p>
            </div>

            <div className="mt-4 flex flex-col p-3 text-right md:mt-0">
              {room.promotion_price && (
                <p className="m-1 font-inter text-base text-gray-700 line-through">
                  THB{" "}
                  {room.price
                    ? Intl.NumberFormat("en-US", {
                        minimumFractionDigits: 2,
                      }).format(room.price)
                    : "N/A"}
                </p>
              )}
              <p className="font-inter text-xl font-semibold text-black">
                THB{" "}
                {room.promotion_price
                  ? Intl.NumberFormat("en-US", {
                      minimumFractionDigits: 2,
                    }).format(room.promotion_price)
                  : room.price
                    ? Intl.NumberFormat("en-US", {
                        minimumFractionDigits: 2,
                      }).format(room.price)
                    : "N/A"}
              </p>
              <div className="whitespace-nowrap text-base text-gray-700">
                Per Night
                <br />
                (Including Taxes & Fees)
              </div>
            </div>
          </div>

          <div className="mr-3 mt-auto grid grid-cols-2 gap-3 pt-6 md:ml-auto md:max-w-[260px]">
            <button
              onClick={handleRoomDetailClick}
              className="rounded px-4 py-2 text-sm font-medium text-orange-600 transition-colors hover:bg-orange-500 hover:text-white"
            >
              Room Detail
            </button>
            <button
              onClick={handleBookNowClick}
              className="rounded bg-orange-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-700 hover:text-orange-600"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Roomcard;
