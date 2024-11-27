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
      {/* about section */}
      <section>
        <h1 className="m-5 translate-x-10 font-notoSerif text-4xl font-semibold text-green-800 md:mr-40">
          Neatly Hotel
        </h1>
        <div className="flex flex-col items-center justify-center">
          <div className="md:w-[80%]">
            <p className="p-4 text-center font-inter text-base text-gray-700">
              Set in Bangkok, Thailand. Neatly Hotel offers 5-star accommodation
              with an outdoor pool, kids' club, sports facilities and a fitness
              centre. There is also a spa, an indoor pool and saunas.
            </p>
            <p className="p-4 text-center font-inter text-base text-gray-700">
              All units at the hotel are equipped with a seating area, a
              flat-screen TV with satellite channels, a dining area and a
              private bathroom with free toiletries, a bathtub and a hairdryer.
              Every room in Neatly Hotel features a furnished balcony. Some
              rooms are equipped with a coffee machine.
            </p>
            <p className="p-4 text-center font-inter text-base text-gray-700">
              Free WiFi and entertainment facilities are available at property
              and also rentals are provided to explore the area.
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
                      className="object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>
      ;
    </>
  );
}

export default Aboutsection;
