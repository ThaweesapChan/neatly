import React from "react";
import Image from "next/image";
import { useState } from "react";

function Roomcard() {
  /* ค่า value ตัวอย่าง ค่อเอามจาก db ที่หลัง */
  const [room] = useState({
    title: "Superior Garden View",
    image: "/asset/room.jpeg",
    guests: 2,
    bedType: "1 Double bed",
    size: 32,
    description:
      "Rooms (36sqm) with full garden views, 1 single bed, bathroom with bathtub & shower.",
    originalPrice: 3100,
    currency: "THB",
  });
  /* fn ส่วนลด */
  function cal(number, discout) {
    let result = number * discout;
    return number - result;
  }
  const discountedPrice = cal(room.originalPrice, 0.1935);
  /* fn ส่วนลด */

  return (
    <div className="mt-5 flex min-h-screen w-full items-center justify-center bg-white">
      <div className="flex w-full flex-col items-center bg-white md:max-h-[400px] md:max-w-[80%] md:flex-row">
        <Image
          src={room.image}
          alt="Mountain view from hotel room"
          className="h-[265px] w-full md:w-[453px]"
          width={453}
          height={265}
        />

        <div className="space-y-4 p-4">
          <div>
            <h2 className="font-inter text-2xl font-semibold text-black">
              {room.title}
            </h2>
            <div className="text-muted-foreground mt-2 flex gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span className="font-inter text-gray-700">
                  {room.guests} Guests
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-inter text-gray-700">{room.bedType}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-inter text-gray-700">
                  {room.size} sqm
                </span>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground font-inter text-sm text-gray-700">
            {room.description}
          </p>

          <div className="space-y-1">
            <div className="flex flex-col items-end">
              <p className="text-muted-foreground font-inter text-sm text-gray-700 line-through">
                {room.currency} {room.originalPrice.toFixed(2)}
              </p>
              <h3 className="font-inter text-2xl font-semibold text-gray-900">
                {room.currency} {discountedPrice.toFixed(2)}
              </h3>
            </div>

            <div className="text-muted-foreground flex flex-col items-end font-inter text-sm text-gray-700">
              <p className="font-inter">Per Night</p>
              (Including Taxes & Fees)
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <button variant="link" className="flex-1 text-orange-600">
              Room Detail
            </button>

            <button className="flex-1 rounded-md bg-orange-600 hover:bg-orange-700">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Roomcard;
