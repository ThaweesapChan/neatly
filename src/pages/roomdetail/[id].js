import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/component/navbar";
import Footer from "@/component/footer";
import axios from "axios";
import { useRouter } from "next/router";
import { useBookingDetail } from "@/lib/BookingDetailContext";
import { useBookingDetail } from "@/lib/BookingDetailContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import RoomsSuitsPost from "@/component/roomssuitspost";

export default function RoomDetail() {
  const [roomData, setRoomData] = useState(null);
  const [allRooms, setAllRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query; // ดึง ID ของห้องจาก URL

  // Fetch room data from API
  async function fetchRoomData() {
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // กรองข้อมูลให้แสดงเฉพาะห้องที่ตรงกับ ID
  // แก้ไขส่วนที่หา room จาก roomData
  const room = roomData?.find((room) => room.room_id === parseInt(id));

  if (!room) {
    return <div>Room not found</div>;
  }

  const images = [
    room.room_image_url, // เพิ่ม room_image_url เป็นรูปแรก
    ...(room.image_gallery || []), // ตามด้วยรูปจาก image_gallery
  ];

  return (
    <div className="w-full bg-[#F7F7FB]">
      {/* Navbar Section */}
      <div className="w-full">
        <Navbar />
      </div>

      {/* Carousel Section */}
      <div className="w-full md:mt-14">
        <Carousel
          opts={{
            align: "start",
          }}
          className="mt-6 flex h-96 w-full overflow-hidden"
        >
          <CarouselContent className="flex h-full">
            {images.map((imageUrl, index) => (
              <CarouselItem
                key={`${room.id}-${index}`}
                className="flex h-full w-full shrink-0 items-center justify-center md:basis-2/5"
              >
                <img
                  src={imageUrl}
                  alt={`Room Image ${index + 1}`}
                  className="h-full w-full rounded object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-8 z-10 text-zinc-200" />
          <CarouselNext className="absolute right-8 z-10 text-zinc-200" />
        </Carousel>
      </div>

      {/* Content Section */}
      <div className="flex w-full items-start justify-center">
        <div className="mt-6 px-10 py-10 md:w-[1000px]">
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

              <div className="flex flex-row justify-between font-inter md:flex md:flex-col md:items-end">
                <div className="text-center md:text-right">
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
                {/* ปุ่ม Book Now */}
                <Link href={`/book/${room.room_id || ""}`} legacyBehavior>
                  <a className="mt-4 flex h-[48px] items-center justify-center rounded-sm bg-orange-600 px-12 py-0 text-center font-openSans text-base font-medium text-white transition-transform hover:scale-105 md:mt-0">
                    Book Now
                  </a>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-16 h-full w-full md:mt-20">
            <h3 className="font-inter text-xl font-semibold">Room Amenities</h3>
            <div className="mt-6 px-5">
              <ul className="grid list-inside list-disc grid-cols-1 gap-x-5 font-inter text-base text-gray-700 md:grid-cols-2">
                {room.amenities.map((amenity, index) => (
                  <li key={index} className="m-0">
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* RoomsSuits and Footer */}
      <div className="mt-10 flex h-[34rem] w-full flex-col items-center justify-center bg-[#E6EBE9] md:mt-28 md:h-[45rem]">
        <div className="flex w-full flex-col items-center justify-center md:mb-20">
          <p className="font-notoSerif text-4xl font-medium text-[#2F3E35] md:text-5xl">
            Other Rooms
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
          }}
          className="flex h-96 w-full overflow-hidden md:h-[25rem]"
        >
          <CarouselContent className="flex h-full">
            {allRooms
              .filter((room) => room.room_id !== parseInt(id)) // ไม่แสดงห้องปัจจุบัน
              .map((otherRoom) => (
                <CarouselItem
                  key={otherRoom.room_id}
                  className="flex h-full w-full shrink-0 basis-3/4 items-center justify-center"
                >
                  <RoomsSuitsPost
                    label={otherRoom.room_type}
                    src={otherRoom.room_image_url}
                    roomId={otherRoom.room_id}
                  />
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 z-10 text-zinc-200" />
          <CarouselNext className="absolute right-4 z-10 text-zinc-200" />
        </Carousel>
      </div>
      <Footer />
    </div>
  );
}
