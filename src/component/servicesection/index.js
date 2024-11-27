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
      <section className="bg-green-700 mt-5 text-white p-4 md:flex md:flex-col md:gap-5">
        <h1 className="text-center text-7xl font-notoSerif m-20">
          Service & Facilities
        </h1>

        {/* mobile */}
        <div className="flex justify-between md:hidden p-5">
          <div className="m-2 w-[40%]">
            <div className="items-center justify-center flex flex-col p-5">
              <Flower className="w-[60px] h-[60px]" />
              <p className="text-base font-inter text-center">Spa</p>
            </div>
            <div className="items-center justify-center flex flex-col p-5">
              <Coffee className="w-[60px] h-[60px]" />
              <p className="text-base font-inter text-center">Sauna</p>
            </div>
            <div className="items-center justify-center flex flex-col p-5">
              <Dumbbell className="w-[60px] h-[60px]" />
              <p className="text-base font-inter text-center">Fitness</p>
            </div>
          </div>

          <div className="m-2 w-[40%]">
            <div className="items-center justify-center flex flex-col p-5">
              <Sofa className="w-[60px] h-[60px]" />
              <p className="text-base font-inter text-center">
                Arrival Lounge{" "}
              </p>
            </div>
            <div className="items-center justify-center flex flex-col p-5">
              <Wifi className="w-[60px] h-[60px]" />
              <p className="text-base font-inter text-center">Free Wifi</p>
            </div>
            <div className="items-center justify-center flex flex-col p-5">
              <Car className="w-[60px] h-[60px]" />
              <p className="text-base font-inter text-center">Parking</p>
            </div>
          </div>
        </div>
        <div className="items-center justify-center flex flex-col md:hidden">
          <PhoneOutgoing className="w-[60px] h-[60px]" />
          <p className="text-base font-inter text-center">24 hours operation</p>
        </div>

        {/* destop */}
        <div className="md:flex justify-between hidden p-5 w-[90%] m-5">
          <div className="items-center justify-center flex flex-col ">
            <Flower className="w-[60px] h-[60px]" />
            <p className="text-base font-inter text-center">Spa</p>
          </div>
          <div className="items-center justify-center ">
            <Coffee className="w-[60px] h-[60px]" />
            <p className="text-base font-inter text-center">Sauna</p>
          </div>
          <div className="items-center justify-center flex flex-col ">
            <Dumbbell className="w-[60px] h-[60px]" />
            <p className="text-base font-inter text-center">Fitness</p>
          </div>
          <div className="items-center justify-center flex flex-col ">
            <Sofa className="w-[60px] h-[60px]" />
            <p className="text-base font-inter text-center">Arrival Lounge</p>
          </div>
          <div className="items-center justify-center flex flex-col ">
            <Wifi className="w-[60px] h-[60px]" />
            <p className="text-base font-inter text-center">Free Wifi</p>
          </div>
          <div className="items-center justify-center flex flex-col">
            <Car className="w-[60px] h-[60px]" />
            <p className="text-base font-inter text-center">Parking</p>
          </div>
          <div className="items-center justify-center flex flex-col ">
            <PhoneOutgoing className="w-[60px] h-[60px]" />
            <p className="text-base font-inter text-center">
              24 hours operation
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Servicesection;
