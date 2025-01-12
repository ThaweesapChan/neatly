import React from "react";
import {
  Flower,
  Coffee,
  Dumbbell,
  Sofa,
  Wifi,
  Car,
  PhoneOutgoing,
} from "lucide-react";
function Servicesection() {
  return (
    <>
      {/*  service section */}
      <section
        className="mt-20 bg-green-700 p-4 text-white md:flex md:flex-col md:gap-5"
        id="service-facilities"
      >
        <h1 className="m-16 text-center font-notoSerif text-5xl md:text-7xl">
          Service & Facilities
        </h1>

        {/* mobile */}
        <div className="flex justify-between p-5 md:hidden">
          <div className="m-2 w-[40%]">
            <div className="flex flex-col items-center justify-center p-5">
              <Flower className="h-[60px] w-[60px]" />
              <p className="text-center font-inter text-base">Spa</p>
            </div>
            <div className="flex flex-col items-center justify-center p-5">
              <Coffee className="h-[60px] w-[60px]" />
              <p className="text-center font-inter text-base">Sauna</p>
            </div>
            <div className="flex flex-col items-center justify-center p-5">
              <Dumbbell className="h-[60px] w-[60px]" />
              <p className="text-center font-inter text-base">Fitness</p>
            </div>
          </div>

          <div className="m-2 w-[40%]">
            <div className="flex flex-col items-center justify-center p-5">
              <Sofa className="h-[60px] w-[60px]" />
              <p className="text-center font-inter text-base">
                Arrival Lounge{" "}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-5">
              <Wifi className="h-[60px] w-[60px]" />
              <p className="text-center font-inter text-base">Free Wifi</p>
            </div>
            <div className="flex flex-col items-center justify-center p-5">
              <Car className="h-[60px] w-[60px]" />
              <p className="text-center font-inter text-base">Parking</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center md:hidden">
          <PhoneOutgoing className="h-[60px] w-[60px]" />
          <p className="text-center font-inter text-base">24 hours operation</p>
        </div>

        {/* destop */}
        <div className="m-5 hidden w-[90%] justify-between p-5 md:ml-20 md:flex">
          <div className="flex flex-col items-center justify-center">
            <Flower className="h-[60px] w-[60px]" />
            <p className="text-center font-inter text-base">Spa</p>
          </div>
          <div className="items-center justify-center">
            <Coffee className="h-[60px] w-[60px]" />
            <p className="text-center font-inter text-base">Sauna</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Dumbbell className="h-[60px] w-[60px]" />
            <p className="text-center font-inter text-base">Fitness</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Sofa className="h-[60px] w-[60px]" />
            <p className="text-center font-inter text-base">Arrival Lounge</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Wifi className="h-[60px] w-[60px]" />
            <p className="text-center font-inter text-base">Free Wifi</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Car className="h-[60px] w-[60px]" />
            <p className="text-center font-inter text-base">Parking</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <PhoneOutgoing className="h-[60px] w-[60px]" />
            <p className="text-center font-inter text-base">
              24 hours operation
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Servicesection;
