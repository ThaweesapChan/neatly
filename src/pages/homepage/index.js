import React from "react";
import RoomsSuits from "@/component/RoomsSuits";
RoomsSuits
function Homepage() {
  return (
    <section className="bg-white h-full pt-[40px] pb-[40px] gap-[40px]">
      <header>
        <h1
          className="h-[55px] mb-10 font-notoSerif text-green-800
        font-medium text-[44px] leading-[55px] tracking-[-2%] text-center"
        >
          Rooms & Suits
        </h1>
      </header>
      <article>
        <figure>
          {/* Mobile layout */}
          <div className="flex flex-col gap-4 h-[1755px] md:hidden ">
            <RoomsSuits
              label="Superior Garden View"
              src="/asset/superior.jpeg"
            />
            <RoomsSuits label="Deluxe" src="/asset/deluxe.jpeg" />
            <RoomsSuits label="Superior" src="/asset/room.jpeg" />
            <RoomsSuits label="Premier Sea View" src="/asset/premier.jpeg" />
            <RoomsSuits label="Supreme" src="/asset/supreme.jpeg" />
            <RoomsSuits label="Suite" src="/asset/room2.jpeg" />
          </div>

          {/* Desktop layout */}
          <div className="hidden md:block ">
            <section className="flex flex-col ml-[11%] mr-[11%] gap-4 ">
              {/* Desktop 1 */}
              <div className="bg-yellow-500 h-[540px]">
                <RoomsSuits label="Superior" src="/asset/room.jpeg" />
              </div>
              {/* Desktop 2 */}
              <div className="h-[400px] flex flex-row gap-4">
                <div className="w-[58.24%]">
                  <RoomsSuits label="Deluxe" src="/asset/deluxe.jpeg" />
                </div>
                <div className="w-[41.26%]">
                  <RoomsSuits label="Superior" src="/asset/room.jpeg" />
                </div>
              </div>

              {/* Desktop 3 */}
              <div className="h-[400px] flex flex-row gap-4">
                <div className="w-[41%]">
                  <RoomsSuits
                    label="Premier Sea View"
                    src="/asset/premier.jpeg"
                  />
                </div>

                <div className="w-[59%] flex flex-col gap-4">
                  <div className="h-[48%]">
                    <RoomsSuits label="Supreme" src="/asset/supreme.jpeg" />
                  </div>
                  <div className="h-[48%]">
                    <RoomsSuits label="Suite" src="/asset/room2.jpeg" />
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

export default Homepage;
