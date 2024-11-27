import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function Aboutsection() {
  return (
    <>
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
      ;
    </>
  );
}

export default Aboutsection;