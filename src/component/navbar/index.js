import React from "react";
import Image from "next/image";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-white w-full h-20 p-4 md:h-20 flex items-center">
        <div className="flex items-center justify-between w-full px-4 md:px-10">
          {/* Desktop view */}
          <div className="flex-shrink-0">
            <Image src="/asset/logo.png" width={170} height={100} alt="logo" />
          </div>
          <ul className="hidden md:flex items-center font-openSans font-normal text-black text-sm gap-10 ml-10">
            <li className="cursor-pointer">About Neatly</li>
            <li className="cursor-pointer">Service & Facilities</li>
            <li className="cursor-pointer">Rooms & Suites</li>
          </ul>
          <button className="hidden md:block text-orange-500 text-sm font-openSans font-normal ml-auto">
            Log in
          </button>

          {/* Mobile view */}
          {/* Hamburger */}
          <div
            className="hamburger text-black text-2xl md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            ☰
          </div>
          {/* Slide-in Menu */}
          <div
            className={`fixed top-0 right-0 h-full w-full bg-white shadow-lg transform ${
              isOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300 ease-in-out md:hidden`}
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <Image src="/asset/logo.png" width={150} height={50} alt="logo" />
              <button className="text-black text-2xl mx-4" onClick={toggleMenu}>
                ✕
              </button>
            </div>
            <ul className="flex flex-col items-start font-openSans font-normal text-black text-xl gap-8 m-8">
              <li className="cursor-pointer" onClick={toggleMenu}>
                About Neatly
              </li>
              <li className="cursor-pointer" onClick={toggleMenu}>
                Service & Facilities
              </li>
              <li className="cursor-pointer" onClick={toggleMenu}>
                Rooms & Suites
              </li>
              <hr className="bg-gray-300 border-b w-full my-4 rounded-md" />
            </ul>
            <button className="text-orange-500 text-xl font-openSans font-semibold mx-8">
              Login
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
