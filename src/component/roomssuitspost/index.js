import React from "react";

export default function RoomsSuitsPost({ label = "", src = "", onClick }) {
  return (
    <div className="relative w-full h-[250px] md:h-full ">
      {/* รูปภาพ */}
      <div className="relative w-full h-full">
        <img
          src={src}
          alt="Rooms type"
          className="w-full h-full object-cover"
        />
        {/* สร้างเลเยอร์สีดำซ้อนทับ */}
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      {/* ข้อความและปุ่มที่อยู่ในรูป */}
      <div className=" absolute top-[138px] w-full left-4 sm:top-auto sm:bottom-10 flex flex-col justify-between gap-3 pr-4">
        {/* ข้อความ */}
        <div className="font-notoSerif w-full font-medium text-3xl text-white break-words whitespace-normal ">
          <h1> {label}</h1>
        </div>

        {/* ปุ่มที่อยู่ในรูป */}
        <button className="w-[148px] flex flex-row items-center justify-between pl-2">
          <h1
            className="font-openSans font-semibold text-white text-[16px] leading-[16px]"
            onClick={onClick}
          >
            Explore Room
          </h1>
          <img src="/asset/icon/Vector.png" alt="Explore Room" />
        </button>
      </div>
    </div>
  );
}


