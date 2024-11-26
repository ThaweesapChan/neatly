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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
function Homepage() {
  return (
    <>
      {/* about sectoin */}
      <section>
        <div className="md:max-4/5  flex flex-col items-center justify-center p-2 m-6 gap-3 ">
          <h1 className="font-notoSerif font-semibold text-4xl text-green-800">
            Neatly Hotel
          </h1>

          <p className="text-center font-inter text-base p-2 text-gray-700">
            Set in Bangkok, Thailand. Neatly Hotel offers 5-star accommodation
            with an outdoor pool, kids' club, sports facilities and a fitness
            centre. There is also a spa, an indoor pool and saunas.
          </p>
          <p className="text-center font-inter text-base p-2 text-gray-700">
            All units at the hotel are equipped with a seating area, a
            flat-screen TV with satellite channels, a dining area and a private
            bathroom with free toiletries, a bathtub and a hairdryer. Every room
            in Neatly Hotel features a furnished balcony. Some rooms are
            equipped with a coffee machine.
          </p>
          <p className="text-center font-inter text-base p-2 text-gray-700">
            Free WiFi and entertainment facilities are available at property and
            also rentals are provided to explore the area.
          </p>
        </div>

        <div className="flex items-center justify-center">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-6/7 md:w-[50%]"
          >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <img
                    src={`/asset/deluxe.jpeg`}
                    alt={`Image ${index + 1}`}
                    className="object-cover "
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

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

export default Homepage;
