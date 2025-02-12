import React from "react";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

function Footer() {
  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <footer className="bg-green-800 p-4 text-white md:px-28 md:py-16">
        <div className="mx-5 my-8 justify-between md:flex">
          <div className="mb-5 font-inter">
            <Image
              src="/asset/logo_1.png"
              width={200}
              height={50}
              alt="logo"
              className="my-8 cursor-pointer md:mb-12 md:mt-0"
              onClick={() => handleScrollTo("nav-bar")}
            />

            <h1 className="my-2 text-xl font-semibold">Neatly Hotel</h1>
            <h4>The best hotel for rising your experience</h4>
          </div>

          <ul className="font-inter text-xl">
            Contact
            <li className="mt-5 flex gap-4 font-ibmPlexSansThai md:mt-10">
              <Phone />
              +66 99 999 9999
            </li>
            <li className="mt-5 flex gap-4 font-ibmPlexSansThai md:mt-6">
              <Mail />
              contact@neatlyhotel.com
            </li>
            <li className="mt-5 flex gap-4 font-ibmPlexSansThai md:my-6">
              <MapPin />
              <div>
                <div>188 Phaya Thai Rd, Thung Phaya Thai,</div>
                <div className="break-words">Ratchathewi, Bangkok 10400</div>
              </div>
            </li>
          </ul>
        </div>
        <hr className="w-full rounded-md border-b border-green-700 md:my-10" />
        <div className="m-5 flex justify-between md:pt-8">
          <div className="flex gap-3 md:gap-10">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-blue-500"
            >
              <Facebook />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-pink-500"
            >
              <Instagram />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-blue-400"
            >
              <Twitter />
            </a>
          </div>
          <div className="text-right font-inter text-sm text-green-300">
            Copyright ©2022 Neatly Hotel
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
