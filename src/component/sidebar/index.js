import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BriefcaseBusiness,
  ClipboardCheck,
  Hotel,
  Box,
  LogOut,
} from "lucide-react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "@/lib/AuthContext";

function Sidebar() {
  const router = useRouter();
  const { setIsLoggedIn } = useAuth();

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");

      // ลบข้อมูล token ออกจาก localStorage
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Logout Error:", error.message);
    }

    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <>
      {/* Sidebar */}
      <aside className="flex h-dvh w-1/6 flex-col bg-green-800 tracking-wide">
        <div className="my-10 flex flex-col items-center justify-center">
          <Image src="/asset/logo_1.png" width={120} height={50} alt="logo" />
          <p className="mt-10 font-inter text-lg leading-6 text-green-400">
            Admin Panel Control
          </p>
        </div>
        {/* Sidebar Menu */}
        <div className="mt-14 flex grow items-start justify-center">
          <ul className="flex w-1/6 flex-col gap-2 font-inter font-medium leading-6 text-green-200">
            <li className="w-full">
              <Link
                href="/agent/customer-booking"
                className="flex w-full items-center justify-center gap-7 px-4 py-7 hover:bg-green-600 active:bg-green-700"
              >
                <BriefcaseBusiness />
                Customer Booking
              </Link>
            </li>
            <li className="w-full">
              <Link
                href="/agent/room-management"
                className="flex w-full items-center justify-center gap-7 px-4 py-7 hover:bg-green-600 active:bg-green-700"
              >
                <ClipboardCheck />
                Room Management
              </Link>
            </li>
            <li className="w-full">
              <Link
                href="/agent/hotel-information"
                className="flex w-full items-center justify-center gap-7 px-4 py-7 hover:bg-green-600 active:bg-green-700"
              >
                <Hotel />
                Hotel Information
              </Link>
            </li>
            <li className="w-full">
              <Link
                href="/agent/roomproperty"
                className="flex w-full items-center justify-center gap-7 px-4 py-7 hover:bg-green-600 active:bg-green-700"
              >
                <Box />
                Room & Property
              </Link>
            </li>
          </ul>
        </div>
        <hr className="w-full rounded-md border-b border-green-700" />
        <div
          className="m-4 flex grow cursor-pointer justify-center gap-5 font-inter font-medium leading-6 text-green-200"
          onClick={handleLogout}
        >
          <LogOut />
          Log Out
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
