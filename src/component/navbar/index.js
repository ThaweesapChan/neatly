import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/lib/AuthContext";
import { UserRound, CreditCard, BriefcaseBusiness, LogOut } from "lucide-react";
import { HiBell } from "react-icons/hi2";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "react-toastify";

function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState({});
  const [toastShown, setToastShown] = useState(false);
  const router = useRouter();


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");

      // ลบข้อมูล token ออกจาก localStorage
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
    setIsLoggedIn(false); // เปลี่ยนสถานะที่ customer loggedin เป็น false
    router.push("/");
  };

  const handleHomepage = () => {
    router.push("/");
  };

  const handleHistory = () => {
    router.push("/bookinghistory");
  };

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    if (isOpen) {
      toggleMenu();
    }
  };

  // get customer name from API
  async function getData() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoggedIn(false);
        setName({});
        return;
      }

      const response = await axios.get("/api/getUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setName(response.data);
      setIsLoggedIn(true);
    } catch (error) {
      setIsLoggedIn(false);
      setName({});
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token"); // เคลียร์ token ออกจาก localStorage
        if (!toastShown) {
          toast.warn("Session expired or invalid. Please log in again.");
          setToastShown(true);
        }
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      getData();
    } else {
      setIsLoggedIn(false);
    }
  }, []);

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
      <nav
        className="flex h-20 w-full items-center bg-white p-4 md:h-20"
        id="nav-bar"
      >
        <div className="flex w-full items-center justify-between px-4 md:px-10">
          {/* Desktop view */}

          <div className="flex-shrink-0 cursor-pointer">
            <Image
              src={hotelInfo[0].hotel_logo_url}
              width={170}
              height={100}
              alt="logo"
              style={{ width: "170px", height: "auto" }}
              onClick={handleHomepage}
            />
          </div>

          <ul className="ml-10 hidden flex-grow items-center gap-10 font-openSans text-sm font-normal text-black md:flex">
            {/* Use buttons for scrolling */}
            <li
              className="cursor-pointer"
              onClick={() => handleScrollTo("about-neatly")}
            >
              About Neatly
            </li>
            <li
              className="cursor-pointer"
              onClick={() => handleScrollTo("service-facilities")}
            >
              Service & Facilities
            </li>
            <li
              className="cursor-pointer"
              onClick={() => handleScrollTo("rooms-suites")}
            >
              Rooms & Suites
            </li>
          </ul>
          {/* ถ้า customer ทำการ login แล้วให้แสดง เป็นตัวนี้แทน */}
          {isLoggedIn ? (
            <div className="hidden items-center gap-8 pr-14 md:flex">
              <button aria-label="Notifications">
                <span className="cursor-pointer text-xl text-gray-700">
                  <HiBell />
                </span>
              </button>

              {/* Dropdown for User Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex cursor-pointer items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full">
                      <Image
                        src={
                          name?.data?.profile_picture_url ||
                          "/asset/profile-avatar-user-icon.png"
                        }
                        alt="Profile picture"
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <span className="font-openSans text-sm font-normal text-gray-700">
                      {name?.data?.first_name || ""}
                      {"  "}
                      {name?.data?.last_name || ""}
                    </span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem>
                    <UserRound className="mr-2 text-gray-500" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 text-gray-500" />
                    Payment Method
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleHistory}>
                    <BriefcaseBusiness className="mr-2 text-gray-500" />
                    Booking History
                  </DropdownMenuItem>
                  <hr className="my-2 w-full rounded-md border-b bg-gray-300" />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 text-gray-500" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <button
              className="ml-auto hidden font-openSans text-sm font-normal text-orange-500 md:block"
              onClick={handleLogin}
            >
              Log in
            </button>
          )}

          {/* Mobile view */}
          {/* Hamburger button */}

          <div
            className="hamburger text-2xl text-black md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            ☰
          </div>

          {/* Slide-in Menu */}

          <div
            className={`fixed right-0 top-0 z-50 h-full w-full transform bg-white shadow-lg ${
              isOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300 ease-in-out md:hidden`}
          >
            <div className="flex items-center justify-between border-b border-gray-200 p-4">
              <Image
                src="/asset/logo.png"
                width={150}
                height={50}
                alt="logo"
                style={{ width: "150px", height: "auto" }}
              />
              <button className="mx-4 text-2xl text-black" onClick={toggleMenu}>
                ✕
              </button>
            </div>
            {!isLoggedIn && (
              <ul className="m-8 flex flex-col items-start gap-8 font-openSans text-xl font-normal text-black">
                {/* Use buttons for scrolling */}
                <li
                  className="cursor-pointer"
                  onClick={() => handleScrollTo("about-neatly")}
                >
                  About Neatly
                </li>
                <li
                  className="cursor-pointer"
                  onClick={() => handleScrollTo("service-facilities")}
                >
                  Service & Facilities
                </li>
                <li
                  className="cursor-pointer"
                  onClick={() => handleScrollTo("rooms-suites")}
                >
                  Rooms & Suites
                </li>
                <hr className="my-4 w-full rounded-md border-b bg-gray-300" />
              </ul>
            )}

            {!isLoggedIn && (
              <button
                className="mx-8 font-openSans text-xl font-semibold text-orange-500"
                onClick={handleLogin}
              >
                Login
              </button>
            )}

            {isLoggedIn && (
              <>
                <div className="m-8">
                  <div className="flex items-center gap-5">
                    <div className="mb-8 ml-2 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full">
                      <Image
                        src={
                          name?.data?.profile_picture_url ||
                          "/asset/profile-avatar-user-icon.png"
                        }
                        alt="Profile picture"
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <span className="-translate-y-4 font-openSans text-sm font-normal text-gray-700">
                      {name?.data?.first_name || ""}
                      {"  "}
                      {name?.data?.last_name || ""}
                    </span>
                  </div>

                  <hr className="my-4 w-full rounded-md border-b bg-gray-300" />
                  <ul className="flex flex-col items-start gap-8 font-openSans text-xl font-normal text-gray-700">
                    <li className="flex w-full items-center gap-7 p-4">
                      <UserRound className="text-gray-500" />
                      Profile
                    </li>
                    <li className="flex w-full items-center gap-7 p-4">
                      <CreditCard className="text-gray-500" />
                      Payment Method
                    </li>
                    <li
                      className="flex w-full items-center gap-7 p-4"
                      onClick={handleHistory}
                    >
                      <BriefcaseBusiness className="text-gray-500" />
                      Booking History
                    </li>
                    <hr className="w-full rounded-md border-b bg-gray-300" />
                    <li className="flex w-full cursor-pointer items-center gap-7 p-4">
                      <LogOut
                        className="text-gray-500"
                        onClick={handleLogout}
                      />
                      Log out
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
