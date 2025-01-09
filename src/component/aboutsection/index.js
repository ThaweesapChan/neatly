import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import axios from "axios";
import Image from "next/image";

function Aboutsection() {
  const [hotelInfo, setHotelInfo] = useState(null);
  const [allRooms, setAllRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [hotelResponse, roomsResponse] = await Promise.all([
          axios.get("/api/getHotelInformation"),
          axios.get("/api/getRoomDetail"),
        ]);
        
        setHotelInfo(hotelResponse.data.data);
        setAllRooms(roomsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || !hotelInfo) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section
        className="flex h-full w-full flex-col bg-[#F7F7FB]"
        id="about-neatly"
      >
        <h1 className="m-5 mt-14 px-0 font-notoSerif text-5xl font-medium text-[#2F3E35] sm:mr-40 sm:mt-28 sm:px-20 sm:text-6xl">
          {hotelInfo[0].hotel_name}
        </h1>

        <div className="mt-6 flex flex-col items-center justify-center">
          <div className="sm:mb-10 sm:w-[60%]">
            {/*แทน <p> เหล่านี้ด้วยข้อมูล hotel_detail ที่ได้จากการ get hotel_information ให้ใช้ ส่วนของการ style ตามเดิม*/}
            <p
              className="m-5 text-left font-inter text-base font-normal text-[#646D89]"
              style={{ whiteSpace: "pre-line" }}
            >
              {hotelInfo[0].hotel_description}
            </p>
          </div>
          <div className="h-[full] w-[full] md:mt-10">
            {allRooms.length > 0 ? (
              <Carousel
                opts={{
                  align: "start",
                }}
                className="flex h-[440px] w-full overflow-hidden"
              >
                <CarouselContent className="flex h-full w-full">
                  {allRooms.map((room) => (
                    <CarouselItem
                      key={room.room_id}
                      className="flex h-full w-full shrink-0 basis-2/3 items-center justify-center md:basis-2/5"
                      style={{ width: "calc(33.333% + 20px)" }} // เพิ่มพื้นที่ครึ่งหนึ่งของรูปที่ 4 และ 5
                    >
                      <Image
                        src={room.room_image_url}
                        alt={room.room_type}
                        width={400}
                        height={500}
                        className="h-full w-full object-cover"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselPrevious className="absolute left-4 z-10 text-zinc-200" />
                <CarouselNext className="absolute right-4 z-10 text-zinc-200" />
              </Carousel>
            ) : (
              <div>No rooms available</div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Aboutsection;
