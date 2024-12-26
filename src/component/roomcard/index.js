import React from "react";
import Image from "next/image";
import { Images } from "lucide-react";
import { useRouter } from "next/router";

function Roomcard({ room, onClick, check_in, check_out }) {
  const router = useRouter();
  // ฟังก์ชันจัดการการคลิกปุ่ม "Rom detail"
  const handleRoomDetailClick = () => {
    router.push({
      pathname: "/roomdetail",
      query: {
        roomId: room.id,
      },
    });
  };
  // ฟังก์ชันจัดการการคลิกปุ่ม "Book Now"
  const handleBookNowClick = () => {
    // ส่งข้อมูลของห้องไปยังหน้า booking ผ่าน query parameters
    router.push({
      pathname: "/payment",
      query: {
        room_type: room.room_type,
        price: room.price,
        size: room.size,
        guests: room.guests,
        room_description: room.room_description,
        check_in,
        check_out,
      },
    });
  };
  return (
    <div className="flex h-[400px] w-[90%] flex-col items-center justify-center gap-2 bg-white md:flex-row">
      <div className="relative w-[60%]">
        <Image
          src="/asset/deluxe.jpeg"
          alt="Mountain view from hotel room"
          className="h-[265px] rounded-md md:w-[453px]"
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
              <span className="font-inter text-gray-700">{room.size} sqm</span>
            </div>
          </div>
          <p className="font-inter text-sm text-gray-700 text-muted-foreground">
            {room.room_description}
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex flex-col items-end">
            {/* ราคาเต็ม */}
            <p className="font-inter text-sm text-gray-700 text-muted-foreground line-through">
              {room.price}
            </p>
            {/* ราคาลด */}
            <h3 className="font-inter text-2xl font-semibold text-gray-900">
              {room.price}
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
            className="flex-1 text-orange-600 md:max-h-[48px] md:max-w-[143px]"
          >
            Room Detail
          </button>

          <button
            onClick={handleBookNowClick}
            className="flex-1 rounded-md bg-orange-600 hover:bg-orange-700 md:max-h-[48px] md:max-w-[143px]"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Roomcard;
