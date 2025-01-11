import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/component/navbar";
import Footer from "@/component/footer";
import axios from "axios";
import { useRouter } from "next/router";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import RoomsSuitsPost from "@/component/roomssuitspost";
import Image from "next/image";

export default function RoomDetail() {
  const [roomData, setRoomData] = useState(null);
  const [allRooms, setAllRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query; // Get the room ID from the URL

  // Fetch room data from API
  async function fetchRoomData() {
    try {
      const response = await axios.get(`/api/getRoomdetailById?id=${id}`);
      const data = await response.data;
      setRoomData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Fetch all rooms for carousel
  async function fetchAllRooms() {
    try {
      const response = await axios.get("/api/getRoomDetail");
      const data = await response.data;
      setAllRooms(data);
    } catch (err) {
      console.error("Error fetching all rooms:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      fetchRoomData();
    }
    fetchAllRooms();
  }, [id]);

   const handleBookNow = () => {
     router.push("/searchresultpage");
   };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Filter the room based on ID
  const room = roomData?.find((room) => room.room_id === parseInt(id));

  if (!room) {
    return <div>Room not found</div>;
  }

  const images = [
    room.room_image_url, // First image
    ...(room.image_gallery || []), // Additional images
  ];

  return (
    <div className="w-full bg-[#F7F7FB]">
      <div className="w-full">
        <Navbar />
      </div>

      <div className="w-full">
        {/* Desktop View - Original Style */}
        <div className="hidden md:mt-14 md:block">
          <Carousel
            centerMode
            infinite
            autoPlaySpeed={3000}
            responsive={{
              desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
              tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
              mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
            }}
            showDots={false}
            swipeable
            className="mt-6 flex w-full overflow-hidden"
          >
            {images.map((imageUrl, index) => (
              <div
                key={`${room.id}-desktop-${index}`}
                className="h-[450px] w-full p-2"
              >
                <Image
                  src={imageUrl}
                  alt={`Room Image ${index + 1}`}
                  className="h-full w-full rounded object-cover p-2"
                  layout="fill" // ใช้ layout เพื่อรองรับการปรับขนาดภาพ
                  objectFit="cover" // ให้ภาพแสดงผลตามพื้นที่ที่กำหนด
                  quality={75} // ตั้งค่าคุณภาพของภาพ (ตัวเลือก)
                />
              </div>
            ))}
          </Carousel>
        </div>

        {/* Mobile View */}
        <div className="block md:hidden">
          <Carousel
            infinite
            autoPlaySpeed={3000}
            responsive={{
              desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
              tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
              mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
            }}
            showDots={false}
            centerMode={false}
            className="w-full"
          >
            {images.map((imageUrl, index) => (
              <div
                key={`${room.id}-mobile-${index}`}
                className="h-[250px] w-full"
              >
                <Image
                  src={imageUrl}
                  alt={`Room Image ${index + 1}`}
                  className="h-full w-full object-cover"
                  layout="fill"
                  objectFit="cover"
                  quality={75}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex w-full items-start justify-center">
        <div className="mt-6 px-4 py-10 md:w-[1000px]">
          <div className="mt-4 space-y-10">
            <h1 className="mb-4 font-notoSerif text-5xl font-medium text-green-800 md:text-6xl">
              {room.room_type || "Room Details"}
            </h1>
            <div className="md:flex md:justify-between">
              <div className="md:mt-4 md:w-1/2">
                <p className="font-inter text-base text-gray-700">
                  {`${room?.room_description || "N/A"} `}
                </p>
                <p className="mb-4 mt-10 font-inter text-base text-gray-700">
                  {`${room.guests || "N/A"} Person | ${room?.bed_type || "N/A"} | ${room.room_size || "N/A"} sqm`}
                </p>
              </div>

              <div className="mt-12 flex flex-row justify-between font-inter md:flex md:flex-col md:items-end">
                <div className="md:text-right">
                  {room.promotion_price && (
                    <p className="m-1 font-inter text-base text-gray-700 line-through">
                      THB{" "}
                      {room.price
                        ? Intl.NumberFormat("en-US", {
                            minimumFractionDigits: 2,
                          }).format(room.price)
                        : "N/A"}
                    </p>
                  )}
                  <p className="font-inter text-xl font-semibold text-gray-900">
                    THB{" "}
                    {room.promotion_price
                      ? Intl.NumberFormat("en-US", {
                          minimumFractionDigits: 2,
                        }).format(room.promotion_price)
                      : room.price
                        ? Intl.NumberFormat("en-US", {
                            minimumFractionDigits: 2,
                          }).format(room.price)
                        : "N/A"}
                  </p>
                </div>
                {/* Book Now Button */}
                <button
                  onClick={handleBookNow}
                  className="mt-4 flex h-[48px] items-center justify-center rounded-sm bg-orange-600 px-12 py-0 text-center font-openSans text-base font-medium text-white transition-transform hover:scale-105 md:mt-0"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>

          <div className="mt-16 h-full w-full md:mt-20">
            <h3 className="font-inter text-xl font-semibold">Room Amenities</h3>
            <div className="mt-6 px-3 sm:px-1">
              <ul className="grid list-inside list-disc grid-cols-1 gap-x-5 font-inter text-base text-gray-700 md:grid-cols-2">
                {room.amenities.map((amenity, index) => (
                  <li key={index} className="">
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex h-[34rem] w-full flex-col items-center justify-center bg-[#E6EBE9] md:mt-28 md:h-[45rem]">
        <div className="flex w-full flex-col items-center justify-center md:mb-20">
          <p className="font-notoSerif text-4xl font-medium text-[#2F3E35] md:text-5xl">
            Other Rooms
          </p>
        </div>
        <Carousel
          arrows
          autoPlaySpeed={3000}
          centerMode
          className=""
          containerClass="w-full mt-20 sm:mt-0"
          infinite
          responsive={{
            desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
            tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
            mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
          }}
          swipeable
        >
          {allRooms
            .filter((room) => room.room_id !== parseInt(id)) // Avoid displaying the current room
            .map((otherRoom) => (
              <div
                key={otherRoom.room_id}
                className="h-full w-full p-1 sm:h-[390px] sm:p-2"
              >
                <RoomsSuitsPost
                  label={otherRoom.room_type}
                  src={otherRoom.room_image_url}
                  roomId={otherRoom.room_id}
                  labelStyle="text-[#FFFFFF] sm:text-4xl text-1xl font-notoSerif"
                />
              </div>
            ))}
        </Carousel>
      </div>
      <Footer />
    </div>
  );
}
