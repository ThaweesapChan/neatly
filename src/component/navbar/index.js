import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/lib/AuthContext";
import { UserRound, CreditCard, BriefcaseBusiness, LogOut } from "lucide-react";
import { HiBell } from "react-icons/hi2";
import axios from "axios";

function Navbar() {
  const { isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const handleHomepage = () => {
    router.push("/");
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
      let response = await axios.get("/api/getbooking");
      setName(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

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
              src="/asset/logo.png"
              width={170}
              height={100}
              alt="logo"
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
                <span className="text-xl text-gray-700">
                  <HiBell />
                </span>
              </button>

              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full">
                <Image
                  src="/asset/profile-pic.png"
                  alt="Profile picture"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <span className="font-openSans text-lg font-semibold text-gray-700">
                {name.user?.first_name || null}
                {"  "}
                {name.user?.last_name || null}
              </span>
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
              <Image src="/asset/logo.png" width={150} height={50} alt="logo" />
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
                  <div className="mb-8 ml-2 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full">
                    <Image
                      src="/asset/profile-pic.png"
                      alt="Profile picture"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <span className="font-openSans text-lg font-semibold text-gray-700">
                    {name.user?.first_name || null}
                    {"  "}
                    {name.user?.last_name || null}
                  </span>
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
                    <li className="flex w-full items-center gap-7 p-4">
                      <BriefcaseBusiness className="text-gray-500" />
                      Booking History
                    </li>
                    <hr className="w-full rounded-md border-b bg-gray-300" />
                    <li className="flex w-full cursor-pointer items-center gap-7 p-4">
                      <LogOut className="text-gray-500" />
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
