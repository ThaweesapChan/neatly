import React, { useState } from "react";
import Navbar from "@/component/navbar";
import { useRouter } from "next/router";
import { useBooking } from "@/lib/BookingContext";
import { SectionsStep2 } from "@/component/payment/sectionstep";

export default function Standardrequest() {
  const router = useRouter();
  const { bookingData, setBookingData } = useBooking(); // ใช้ Context

  // State เก็บค่าที่ checkbox ถูกเลือกและข้อความจาก textarea
  const [standardRequests, setStandardRequests] = useState(
    bookingData.specialRequest.standardRequests || [],
  );
  const [specialRequests, setSpecialRequests] = useState(
    bookingData.specialRequest.specialRequests || [],
  );
  const [additionalRequest, setAdditionalRequest] = useState(
    bookingData.specialRequest.additionalRequest || "",
  );

  // ฟังก์ชันจัดการ checkbox
  const handleCheckboxChange = (e, type) => {
    const { checked, value } = e.target;

    if (type === "standard") {
      setStandardRequests((prev) =>
        checked ? [...prev, value] : prev.filter((item) => item !== value),
      );
    } else if (type === "special") {
      setSpecialRequests((prev) =>
        checked ? [...prev, value] : prev.filter((item) => item !== value),
      );
    }
  };

  console.log(`standardRequests : ${standardRequests}`);
  console.log(`specialRequests : ${specialRequests}`);
  console.log(`additionalRequest : ${additionalRequest}`);

  // ฟังก์ชันเมื่อกด Back
  const handleBack = () => {
    router.push("http://localhost:3000/payment/step1");
  };

  // ฟังก์ชันเมื่อกด Next
  const handleNext = (e) => {
    e.preventDefault();

    // อัปเดต Context
    setBookingData((prev) => ({
      ...prev,
      specialRequest: {
        standardRequests,
        specialRequests,
        additionalRequest,
      },
    }));

    router.push("http://localhost:3000/payment/step3");
  };

  return (
    <div>
      <Navbar />
      <h1>asdqwasdasd</h1>
      <SectionsStep2 />
      <div className="flex min-h-screen items-start justify-center bg-gray-50 p-4">
        <div className="w-full max-w-2xl space-y-6 rounded-lg bg-white p-6 shadow-sm">
          {/* Standard Request Section */}
          <div className="space-y-4">
            <h2 className="font-inter text-lg font-semibold text-gray-700">
              Standard Request
            </h2>
            <div className="space-y-3">
              {[
                "Early check-in",
                "Late check-out",
                "Non-smoking room",
                "A room on the high floor",
                "A quiet room",
              ].map((item) => (
                <label key={item} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    value={item}
                    checked={standardRequests.includes(item)}
                    onChange={(e) => handleCheckboxChange(e, "standard")}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600"
                  />
                  <span className="font-inter text-gray-600">{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Special Request Section */}
          <div className="space-y-4">
            <h2 className="font-inter text-lg font-semibold text-gray-700">
              Special Request
            </h2>
            <div className="space-y-3">
              {[
                "Baby cot (+THB 400)",
                "Airport transfer (+THB 200)",
                "Extra bed (+THB 500)",
                "Extra pillows (+THB 100)",
                "Phone chargers and adapters (+THB 100)",
                "Breakfast (+150)",
              ].map((item) => (
                <label key={item} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    value={item}
                    checked={specialRequests.includes(item)}
                    onChange={(e) => handleCheckboxChange(e, "special")}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600"
                  />
                  <span className="font-inter text-gray-600">{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Request Section */}
          <div className="space-y-4">
            <h2 className="font-inter text-lg font-semibold text-gray-700">
              Additional Request
            </h2>
            <textarea
              value={additionalRequest}
              onChange={(e) => setAdditionalRequest(e.target.value)}
              className="h-32 w-full rounded-lg border px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none"
              placeholder="Enter any additional requests here..."
            />
          </div>

          {/* Navigation Buttons */}
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
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
