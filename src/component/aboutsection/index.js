import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
            <p
              className="m-5 text-left font-inter text-base font-normal text-[#646D89]"
              style={{ whiteSpace: "pre-line" }}
            >
              {hotelInfo[0].hotel_description}
            </p>
          </div>
          <div className="h-full w-full mt-10">
            {allRooms.length > 0 ? (
              <Carousel
                centerMode
                infinite
                autoPlaySpeed={3000}
                responsive={{
                  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
                  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
                  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
                }}
                showDots={false}
                swipeable
              >
                {allRooms.map((room) => (
                  <div
                    key={room.room_id}
                    className="h-[260px] w-full p-2 sm:h-[480px]"
                  >
                    <Image
                      src={room.room_image_url}
                      alt={room.room_type}
                      width={400}
                      height={500}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
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
