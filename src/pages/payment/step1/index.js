import React, { use } from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useBookingDetail } from "@/lib/BookingDetailContext";
import Navbar from "@/component/navbar";
import {
  ConditionRefund,
  SectionsStep1,
} from "@/component/payment/sectionstep";
import Bookingdetail from "@/component/payment/bookingdetail";
export default function Basicinformation() {
  const router = useRouter();
  const { bookingDetail, updateBookingDetail } = useBookingDetail();
  const [formData, setFormData] = useState({
    firstName: bookingDetail.userinfo?.firstName || "",
    lastName: bookingDetail.userinfo?.lastName || "",
    email: bookingDetail.userinfo?.email || "",
    phoneNumber: bookingDetail.userinfo?.phoneNumber || "",
    dateOfBirth: bookingDetail.userinfo?.dateOfBirth || "",
    country: bookingDetail.userinfo?.country || "",
  });
  const [country, setCountry] = useState([]);

  // ฟังก์ชันจัดการการเปลี่ยนแปลงในฟอร์ม
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ฟังก์ชันเมื่อกดปุ่ม Back
  const handleBack = () => {
    router.push("http://localhost:3000/homepage");
  };

  // ฟังก์ชันเมื่อกดปุ่ม Next
  const handleNext = (e) => {
    e.preventDefault();
    updateBookingDetail({ userinfo: formData });
    router.push("http://localhost:3000/payment/step2");
  };

  useEffect(() => {
    // โหลดรายชื่อประเทศจาก API
    const fetchCountries = async () => {
      const response = await fetch("https://restcountries.com/v2/all");
      const data = await response.json();
      const sortedCountries = data
        .map((country) => ({
          name: country.name.common,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
      setCountry(sortedCountries);
    };
    fetchCountries();
  }, []);

  return (
    <div>
      <Navbar />
      <SectionsStep1 />
      <div className="flex min-h-screen items-start justify-center bg-gray-50 p-4">
        <div className="w-full max-w-2xl space-y-6 rounded-lg bg-white p-6 shadow-sm">
          <div className="space-y-2">
            <h1 className="font-inter text-2xl font-semibold tracking-tight text-gray-600">
              Basic Information
            </h1>
          </div>

          {/* ฟอร์มกรอกข้อมูล */}
          <form className="space-y-6 font-inter" onSubmit={handleNext}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="block font-inter text-sm font-medium text-gray-700"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Enter your first name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block font-inter text-sm font-medium text-gray-700"
                >
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block font-inter text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block font-inter text-sm font-medium text-gray-700"
              >
                Phone number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div>
              <label
                htmlFor="dateOfBirth"
                className="block font-inter text-sm font-medium text-gray-700"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            <div>
              <label
                htmlFor="country"
                className="block font-inter text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="mt-1 block w-full rounded-[4px] border border-gray-300 pl-3 font-inter shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm"
                style={{
                  height: "48px",
                  fontSize: "16px",
                  fontWeight: 400,
                  borderRadius: "4px",
                  borderWidth: "1px",
                }}
                required
              >
                <option value="" disabled>
                  Select your country
                </option>
                {country.map((country, index) => (
                  <option key={index} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="ml-4 flex flex-col gap-4 md:hidden">
              <div className="w-[385px] md:block">
                <Bookingdetail />
              </div>
              <div className="w-[385px] md:block">
                <ConditionRefund />
              </div>
            </div>
            <div className="flex justify-between pt-4">
              <button
                type="button"
                className="rounded-md border border-gray-300 bg-white px-4 py-2 font-inter text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handleBack}
              >
                Back
              </button>
              <button
                type="submit"
                className="rounded-md border border-transparent bg-orange-600 px-4 py-2 font-inter text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Next
              </button>
            </div>
          </form>
        </div>
        {/* ด้านขวา */}
        <div className="ml-4 flex flex-col gap-4">
          <div className="hidden md:block md:w-[385px]">
            <Bookingdetail />
          </div>
          <div className="hidden md:block md:w-[385px]">
            <ConditionRefund />
          </div>
        </div>
      </div>
    </div>
  );
}
