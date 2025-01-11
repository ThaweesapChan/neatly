import React, { useState, useEffect, use } from "react";
import Navbar from "@/component/navbar";
import { useRouter } from "next/router";
import {
  SectionsStep2,
  ConditionRefund,
} from "@/component/payment/sectionstep";
import Bookingdetail from "@/component/payment/bookingdetail";
import { useBookingDetail } from "@/lib/BookingDetailContext";
export default function Standardrequest() {
  const router = useRouter();
  const { bookingDetail, updateBookingDetail } = useBookingDetail();
  // State
  const [standardRequests, setStandardRequests] = useState([]);
  const [specialRequests, setSpecialRequests] = useState([]);
  const [additionalRequest, setAdditionalRequest] = useState("");

  const specialRequestOptions = [
    { name: "Baby cot", price: 400 },
    { name: "Airport transfer", price: 200 },
    { name: "Extra bed", price: 500 },
    { name: "Extra pillows", price: 100 },
    { name: "Phone chargers and adapters", price: 100 },
    { name: "Breakfast", price: 150 },
  ];

  const standardRequestOptions = [
    "Early check-in",
    "Late check-out",
    "Non-smoking room",
    "A room on the high floor",
    "A quiet room",
  ];

  // Handle checkbox changes
  const handleCheckboxChange = (e, type, option) => {
    const { checked } = e.target;

    if (type === "standard") {
      const updatedRequests = checked
        ? [...standardRequests, option]
        : standardRequests.filter((item) => item !== option);

      // อัปเดตข้อมูลใน State และ Context
      setStandardRequests(updatedRequests);
      updateBookingDetail({
        additionalInfo: {
          standardRequests: updatedRequests,
          specialRequests,
          additionalRequest,
        },
      });
    } else if (type === "special") {
      const updatedRequests = checked
        ? [...specialRequests, option]
        : specialRequests.filter((req) => req.name !== option.name);

      // อัปเดตข้อมูลใน State และ Context
      setSpecialRequests(updatedRequests);
      updateBookingDetail({
        additionalInfo: {
          standardRequests,
          specialRequests: updatedRequests,
          additionalRequest,
        },
      });
    }
  };

  const handleAdditionalRequestChange = (e) => {
    const value = e.target.value;

    // อัปเดตข้อมูลใน State และ Context
    setAdditionalRequest(value);
    updateBookingDetail({
      additionalInfo: {
        standardRequests,
        specialRequests,
        additionalRequest: value,
      },
    });
  };

  // Navigate back
  const handleBack = () => {
    router.push("/payment/step1");
  };

  // Navigate next
  const handleNext = () => {
    router.push("/payment/step3");
  };

  return (
    <div>
      <Navbar />
      <SectionsStep2 />
      <div className="flex min-h-screen items-start justify-center bg-gray-50 p-4">
        <div className="w-full max-w-2xl space-y-6 rounded-lg bg-white p-6 shadow-sm">
          {/* Standard Request Section */}
          <div className="space-y-4">
            <h2 className="font-inter text-lg font-semibold text-gray-700">
              Standard Request
            </h2>
            <div className="space-y-3">
              {standardRequestOptions.map((item) => (
                <label key={item} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    value={item}
                    checked={standardRequests.includes(item)}
                    onChange={(e) => handleCheckboxChange(e, "standard", item)}
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
              {specialRequestOptions.map((option) => (
                <label
                  key={option.name}
                  className="flex items-center space-x-3"
                >
                  <input
                    type="checkbox"
                    value={option.name}
                    checked={specialRequests.some(
                      (req) => req.name === option.name,
                    )}
                    onChange={(e) => handleCheckboxChange(e, "special", option)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600"
                  />
                  <span className="font-inter text-gray-600">
                    {option.name} (+THB {option.price})
                  </span>
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
              onChange={handleAdditionalRequestChange}
              className="h-32 w-full rounded-lg border px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none"
              placeholder="Enter any additional requests here..."
            />
          </div>

          <div className="ml-4 flex flex-col gap-4 md:hidden">
            <div className="w-[385px] md:block">
              <Bookingdetail />
            </div>
            <div className="w-[385px] md:block">
              <ConditionRefund />
            </div>
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

        {/* Right Side */}
        <div className="ml-4 flex flex-col gap-4">
          <div className="hidden md:block md:w-[385px]">
            <Bookingdetail
              standardRequests={standardRequests}
              specialRequests={specialRequests}
              additionalRequest={additionalRequest}
            />
          </div>
          <div className="hidden md:block md:w-[385px]">
            <ConditionRefund />
          </div>
        </div>
      </div>
    </div>
  );
}
