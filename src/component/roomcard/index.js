import React from "react";
import Image from "next/image";

function Roomcard({ room }) {
  /* function cal(number, discout) {
    let result = number * discout;
    return number - result;
  }
  const discountedPrice = cal(room.originalPrice, 0.1935); */

  return (
    <div className="flex w-[90%] flex-col items-center gap-5 bg-white md:flex-row">
      <Image
        src="/asset/deluxe.jpeg"
        alt="Mountain view from hotel room"
        className="h-[265px] rounded-md md:w-[453px]"
        width={453}
        height={265}
      />

      <div className="max-w-[90%] md:max-w-[60%]">
        <h2 className="font-inter text-2xl font-semibold text-black">
          {room.room_type}
        </h2>
        <div className="mt-2 flex gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span className="font-inter text-gray-700">
              {/* {room.guests} Guests */} 2
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-inter text-gray-700">2</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-inter text-gray-700">
              {/*  {room.size} sqm */}2
            </span>
          </div>
        </div>

        <p className="font-inter text-sm text-gray-700 text-muted-foreground">
          {/* {room.description} */} is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry standard dummy
          text ever since the 1500s
        </p>

        <div className="space-y-1">
          <div className="flex flex-col items-end">
            {/* ราคาเต็ม */}
            <p className="font-inter text-sm text-gray-700 text-muted-foreground line-through">
              {room.price}
              {/* {room.originalPrice.toFixed(2)} */}
            </p>
            {/* ราคาลด */}
            <h3 className="font-inter text-2xl font-semibold text-gray-900">
              {room.price} {/* {discountedPrice.toFixed(2)} */}
            </h3>
          </div>

          <div className="flex flex-col items-end font-inter text-sm text-gray-700 text-muted-foreground">
            <p className="font-inter">Per Night</p>
            (Including Taxes & Fees)
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-2">
          <button
            variant="link"
            className="flex-1 text-orange-600 md:max-h-[48px] md:max-w-[143px]"
          >
            Room Detail
          </button>

          <button className="flex-1 rounded-md bg-orange-600 hover:bg-orange-700 md:max-h-[48px] md:max-w-[143px]">
            Book Now
          </button>
        </div>
      </div>
      <div className=""></div>
    </div>
  );
}

export default Roomcard;

import React from "react";
import Image from "next/image";

function Roomcard({ room }) {
  /* function cal(number, discout) {
    let result = number * discout;
    return number - result;
  }
  const discountedPrice = cal(room.originalPrice, 0.1935); */

  return (
    <div className="flex w-[90%] flex-col items-center gap-5 bg-white md:flex-row">
      <Image
        src="/asset/deluxe.jpeg"
        alt="Mountain view from hotel room"
        className="h-[265px] rounded-md md:w-[453px]"
        width={453}
        height={265}
      />

      <div className="max-w-[90%] md:max-w-[60%]">
        <h2 className="font-inter text-2xl font-semibold text-black">
          {room.room_type}
        </h2>
        <div className="mt-2 flex gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span className="font-inter text-gray-700">
              {/* {room.guests} Guests */} 2
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-inter text-gray-700">2</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-inter text-gray-700">
              {/*  {room.size} sqm */}2
            </span>
          </div>
        </div>

        <p className="font-inter text-sm text-gray-700 text-muted-foreground">
          {/* {room.description} */} is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry standard dummy
          text ever since the 1500s
        </p>

        <div className="space-y-1">
          <div className="flex flex-col items-end">
            {/* ราคาเต็ม */}
            <p className="font-inter text-sm text-gray-700 text-muted-foreground line-through">
              {room.price}
              {/* {room.originalPrice.toFixed(2)} */}
            </p>
            {/* ราคาลด */}
            <h3 className="font-inter text-2xl font-semibold text-gray-900">
              {room.price} {/* {discountedPrice.toFixed(2)} */}
            </h3>
          </div>

          <div className="flex flex-col items-end font-inter text-sm text-gray-700 text-muted-foreground">
            <p className="font-inter">Per Night</p>
            (Including Taxes & Fees)
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-2">
          <button
            variant="link"
            className="flex-1 text-orange-600 md:max-h-[48px] md:max-w-[143px]"
          >
            Room Detail
          </button>

          <button className="flex-1 rounded-md bg-orange-600 hover:bg-orange-700 md:max-h-[48px] md:max-w-[143px]">
            Book Now
          </button>
        </div>
      </div>
      <div className=""></div>
    </div>
  );
}

export default Roomcard;
