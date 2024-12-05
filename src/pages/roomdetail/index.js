import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/component/navbar";
import RoomsSuits from "@/component/roomssuits";
import Footer from "@/component/footer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function RoomDatail() {
  const [roomData, setRoomData] = useState(null); // State สำหรับเก็บข้อมูลห้องที่ดึงมาจาก API
  const [loading, setLoading] = useState(true); // State สำหรับติดตามสถานะการโหลดข้อมูล
  const [error, setError] = useState(null); // State สำหรับจัดเก็บข้อความข้อผิดพลาด

  // ฟังก์ชันสำหรับเรียกข้อมูลจาก API
  async function fetchRoomData() {
    try {
      // เรียก API Endpoint ที่จะดึงข้อมูลห้อง
      const response = await fetch("/api/getRoomdetail"); // แก้ URL ให้ตรงกับ API backend ของคุณ
      // ตรวจสอบว่า API ตอบกลับสำเร็จหรือไม่

      if (!response.ok) {
        throw new Error("Failed to fetch room details"); // สร้างข้อความข้อผิดพลาด
      }
      // อ่านข้อมูล JSON จากการตอบกลับ
      const data = await response.json();
      console.log("Fetched data:", data);
      // อัปเดตข้อมูลใน roomData
      setRoomData(data);
    } catch (err) {
      // เก็บข้อความข้อผิดพลาดใน state error
      setError(err.message);
    } finally {
      // เมื่อโหลดข้อมูลเสร็จสิ้น ให้เปลี่ยนสถานะ loading เป็น false
      setLoading(false);
    }
  }

  // useEffect เพื่อเรียก fetchRoomData เมื่อคอมโพเนนต์โหลดครั้งแรก
  useEffect(() => {
    fetchRoomData(); // เรียกฟังก์ชันดึงข้อมูล
  }, []);

  // กรณีที่ข้อมูลกำลังโหลด แสดงข้อความ Loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // กรณีที่เกิดข้อผิดพลาด แสดงข้อความข้อผิดพลาด
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="font-NotoSansThai">
      <Navbar />
      <div className="flex items-center justify-center overflow-hidden">
        <div className="relative h-fit w-full overflow-visible">
          <Carousel
            opts={{
              align: "start", // เลื่อนจากด้านซ้าย
            }}
            className="flex w-full md:h-[80vh]"
          >
            <CarouselContent className="flex gap-10">
              {Array.from({ length: 6 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="w-[60%] shrink-0 transition-transform duration-300"
                >
                  <div className="border-2 border-gray-300 shadow-lg">
                    <img
                      src={`/asset/superior.jpeg`}
                      alt={`Image ${index + 1}`}
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-8 z-10 text-zinc-200" />
            <CarouselNext className="absolute right-8 z-10 text-zinc-200" />
          </Carousel>
        </div>
      </div>

      <div className="px-10 py-10 md:px-60 md:py-10">
        <div className="mt-4 space-y-10">
          <h1 className="mb-4 font-notoSerif text-5xl font-medium text-green-800">
            {roomData[0]?.room_type || "Room Details"}
          </h1>
          <div className="md:flex md:justify-between">
            <div className="md:mt-4 md:w-1/2">
              <p className="text-lg text-gray-600">
                {`Rooms (${roomData[0]?.size || "N/A"} sqm) with full garden views, ${roomData[0]?.bed_type || "N/A"} bed, bathroom with bathtub & shower.`}
              </p>
              <p className="text-md mb-4 mt-10  text-gray-500">
                {`${roomData[0]?.guests || "N/A"} Person | ${roomData[0]?.bed_type || "N/A"} | ${roomData[0]?.size || "N/A"} sqm`}
              </p>
            </div>

            <div className="flex flex-row justify-between font-inter md:flex md:flex-col">
              <div className="">
                <p className="m-1 text-xl text-gray-500 line-through">
                  THB 3,100.00
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  THB{" "}
                  {roomData[0]?.price
                    ? Intl.NumberFormat("en-US", {
                        minimumFractionDigits: 2,
                      }).format(roomData[0].price)
                    : "N/A"}
                </p>
              </div>
              {/* ปุ่ม Book Now */}
              <Link href="#" legacyBehavior>
                <a className="w-font-weight: 100; font-weight: 200; font-weight: 300; font-weight: 400; font-weight: 500; flex h-[48px] items-center justify-center rounded-sm bg-orange-600 px-12 py-0 text-center text-white transition-transform hover:scale-105">
                  Book Now
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 h-full w-full md:mt-20">
          <h3 className="font-inter text-2xl font-semibold">Room Amenities</h3>
          <div className="mx-auto mt-6 px-4">
            <ul className="grid list-inside list-disc grid-cols-1 gap-x-10 text-gray-700 md:grid-cols-2">
              <li className="m-1">Safe in Room</li>
              <li className="m-1">Air Conditioning</li>
              <li className="m-1">High speed internet connection</li>
              <li className="m-1">Hairdryer</li>
              <li className="m-1">Shower</li>
              <li className="m-1">Bathroom amenities</li>
              <li className="m-1">Lamp</li>
              <li className="m-1">Minibar</li>
              <li className="m-1">Telephone</li>
              <li className="m-1">Ironing board</li>
              <li className="m-1">
                A floor only accessible via a guest room key
              </li>
              <li className="m-1">Alarm clock</li>
              <li className="m-1">Bathrobe</li>
            </ul>
          </div>
        </div>
      </div>
      <RoomsSuits />
      <Footer />
    </div>
  );
}
