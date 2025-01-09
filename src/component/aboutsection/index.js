import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import axios from "axios";

function Aboutsection() {
  const [hotelInfo, setHotelInfo] = useState(null);

  useEffect(() => {
    const fetchHotelInformation = async () => {
      try {
        const response = await axios.get("/api/getHotelInformation");
        setHotelInfo(response.data.data);
      } catch (error) {
        console.error("Error fetching hotel information:", error);
      }
    };

    fetchHotelInformation();
  }, []);

  if (!hotelInfo) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* about section */}
      <section className="mt-20" id="about-neatly">
        {/*แทน H1 ด้วยข้อมูล hotel_name ที่ได้จากการ get hotel_information ให้ใช้ ส่วนของการ style ตามเดิม */}
        <h1 className="m-5 px-20 font-notoSerif text-4xl font-semibold text-green-800 md:mr-40 md:px-20">
          {hotelInfo[0].hotel_name}
        </h1>

        <div className="flex flex-col items-center justify-center">
          <div className="md:mb-10 md:w-[80%]">
            {/*แทน <p> เหล่านี้ด้วยข้อมูล hotel_detail ที่ได้จากการ get hotel_information ให้ใช้ ส่วนของการ style ตามเดิม*/}
            <p className="p-4 text-left font-inter text-base text-gray-700">
              {hotelInfo[0].hotel_description}
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
              <CarouselPrevious className="hidden md:block" />
              <CarouselNext className="hidden md:block" />
            </Carousel>
          </div>
        </div>
      </section>
    </>
  );
}

export default Aboutsection;