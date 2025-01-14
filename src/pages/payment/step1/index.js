import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useBookingDetail } from "@/lib/BookingDetailContext";
import Navbar from "@/component/navbar";
import {
  ConditionRefund,
  SectionsStep1,
} from "@/component/payment/sectionstep";
import Bookingdetail from "@/component/payment/bookingdetail";
import axios from "axios";

export default function Basicinformation() {
  const router = useRouter();
  const { bookingDetail, updateBookingDetail, resetBookingDetail } =
    useBookingDetail();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    country: "",
  });

  const [errors, setErrors] = useState({});
  const [country, setCountry] = useState([]);
  const [loading, setLoading] = useState(true); // สำหรับแสดงสถานะโหลดข้อมูล

  const validate = () => {
    const newErrors = {};

    const nameRegex = /^[a-zA-Z\s]+$/;

    if (!formData.firstName || formData.firstName.length < 4) {
      newErrors.firstName = "First name must be at least 4 characters long.";
    } else if (!nameRegex.test(formData.firstName)) {
      newErrors.firstName = "First name must contain only letters.";
    }

    if (!formData.lastName || formData.lastName.length < 5) {
      newErrors.lastName = "Last name must be at least 5 characters long.";
    } else if (!nameRegex.test(formData.lastName)) {
      newErrors.lastName = "Last name must contain only letters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    const phoneRegex = /^\d{10}$/;
    if (!formData.phoneNumber || !phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits.";
    }

    const dob = new Date(formData.dateOfBirth);
    const age = new Date().getFullYear() - dob.getFullYear();
    if (!formData.dateOfBirth || age < 18) {
      newErrors.dateOfBirth = "You must be at least 18 years old.";
    }

    if (!formData.country) {
      newErrors.country = "Please select a country.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ฟังก์ชันจัดการการเปลี่ยนแปลงในฟอร์ม
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ฟังก์ชันเมื่อกดปุ่ม Back
  const handleBack = () => {
    resetBookingDetail();
    router.push("/searchresultpage");
  };

  // ฟังก์ชันเมื่อกดปุ่ม Next
  const handleNext = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    updateBookingDetail({ userinfo: formData });
    router.push("/payment/step2");
  };

  // ฟังก์ชันดึงข้อมูลโปรไฟล์ผู้ใช้
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token"); // ดึง Token จาก Local Storage
      if (!token) {
        throw new Error("Access token not found");
      }

      const response = await axios.get("/api/getUserProfile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // ตั้งค่า formData ด้วยข้อมูลที่ได้รับจาก API
      const userData = response.data;
      setFormData({
        firstName: userData.first_name || "",
        lastName: userData.last_name || "",
        email: userData.email || "",
        phoneNumber: userData.phone_number || "",
        dateOfBirth: userData.date_of_birth || "",
        country: userData.country || "",
      });
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
    } finally {
      setLoading(false); // ปิดสถานะโหลดข้อมูล
    }
  };

  useEffect(() => {
    // ดึงข้อมูล user profile
    fetchUserProfile();
    // โหลดรายชื่อประเทศ
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v2/all");
        const sortedCountries = response.data
          .map((country) => ({ name: country.name }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountry(sortedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error.message);
      }
    };
    fetchCountries();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // แสดงสถานะโหลดข้อมูล
  }

  return (
    <div>
      <Navbar />
      <SectionsStep1 />
      <div className="flex min-h-screen items-start justify-center bg-gray-50 p-4">
        <div className="w-full max-w-2xl space-y-6 rounded-lg bg-white p-6 shadow-md">
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
                {errors.firstName && (
                  <p className="text-red-500">{errors.firstName}</p>
                )}
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
                {errors.lastName && (
                  <p className="text-red-500">{errors.lastName}</p>
                )}
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
              {errors.email && <p className="text-red-500">{errors.email}</p>}
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
              {errors.phoneNumber && (
                <p className="text-red-500">{errors.phoneNumber}</p>
              )}
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
              {errors.dateOfBirth && (
                <p className="text-red-500">{errors.dateOfBirth}</p>
              )}
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
              {errors.country && (
                <p className="text-red-500">{errors.country}</p>
              )}
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
