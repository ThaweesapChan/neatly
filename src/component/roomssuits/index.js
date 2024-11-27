import React from "react";
import RoomsSuitsPost from "../roomssuitspost";
export default function RoomsSuits({ label = "", src = "", onClick }) {
  return (
    <section className="h-full gap-[40px] bg-white pb-[40px] pt-[40px]">
      <div className="flex flex-col gap-4">

      </div>
      <header>
        <h1 className="mb-10 h-[55px] text-center font-notoSerif text-[44px] font-medium leading-[55px] tracking-[-2%] text-green-800">
          Rooms & Suits
        </h1>
      </header>
      <article>
        <figure>
          {/* Mobile layout */}
          <div className="flex flex-col gap-4 md:hidden">
            <RoomsSuitsPost
              label="Superior Garden View"
              src="/asset/superior.jpeg"
            />
            <RoomsSuitsPost label="Deluxe" src="/asset/deluxe.jpeg" />
            <RoomsSuitsPost label="Superior" src="/asset/room.jpeg" />
            <RoomsSuitsPost
              label="Premier Sea View"
              src="/asset/premier.jpeg"
            />
            <RoomsSuitsPost label="Supreme" src="/asset/supreme.jpeg" />
            <RoomsSuitsPost label="Suite" src="/asset/room2.jpeg" />
          </div>
          {/* Desktop layout */}
          <div className="hidden md:block">
            <section className="ml-[11%] mr-[11%] flex flex-col gap-4">
              {/* Desktop 1 */}
              <div className="h-[540px] bg-yellow-500">
                <RoomsSuitsPost label="Superior" src="/asset/room.jpeg" />
              </div>
              {/* Desktop 2 */}
              <div className="flex h-[400px] flex-row gap-4">
                <div className="w-[58.24%]">
                  <RoomsSuitsPost label="Deluxe" src="/asset/deluxe.jpeg" />
                </div>
                <div className="w-[41.26%]">
                  <RoomsSuitsPost label="Superior" src="/asset/room.jpeg" />
                </div>
              </div>
              {/* Desktop 3 */}
              <div className="flex h-[400px] flex-row gap-4">
                <div className="w-[41%]">
                  <RoomsSuitsPost
                    label="Premier Sea View"
                    src="/asset/premier.jpeg"
                  />
                </div>
                <div className="flex w-[59%] flex-col gap-4">
                  <div className="h-[48%]">
                    <RoomsSuitsPost label="Supreme" src="/asset/supreme.jpeg" />
                  </div>
                  <div className="h-[48%]">
                    <RoomsSuitsPost label="Suite" src="/asset/room2.jpeg" />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </figure>
      </article>
    </section>
  );
}