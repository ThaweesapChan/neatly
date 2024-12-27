import React, { useState } from "react";
import Navbar from "@/component/navbar";
import { useRouter } from "next/router";
import {
  SectionsStep2,
  ConditionRefund,
} from "@/component/payment/sectionstep";
import Bookingdetail from "@/component/payment/bookingdetail";

export default function Standardrequest() {
  const router = useRouter();

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

  // State
  const [standardRequests, setStandardRequests] = useState([]);
  const [specialRequests, setSpecialRequests] = useState([]);
  const [additionalRequest, setAdditionalRequest] = useState("");

  // Handle checkbox changes
  const handleCheckboxChange = (e, type, option) => {
    const { checked } = e.target;

    if (type === "standard") {
      // For standard requests, just add/remove the string values
      setStandardRequests((prev) => {
        if (checked) {
          return [...prev, option];
        } else {
          return prev.filter((item) => item !== option);
        }
      });
    } else if (type === "special") {
      // For special requests, add/remove objects with name and price
      setSpecialRequests((prev) => {
        if (checked) {
          return [...prev, option];
        } else {
          return prev.filter((req) => req.name !== option.name);
        }
      });
    }
  };

  // Navigate back
  const handleBack = () => {
    router.push("http://localhost:3000/payment/step1");
  };

  // Navigate next
  const handleNext = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/payment/step3",
      query: {
        standardRequests: JSON.stringify(standardRequests),
        specialRequests: JSON.stringify(specialRequests),
        additionalRequest: additionalRequest,
      },
    });
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
              onChange={(e) => setAdditionalRequest(e.target.value)}
              className="h-32 w-full rounded-lg border px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none"
              placeholder="Enter any additional requests here..."
            />
          </div>

          <div className="ml-4 flex flex-col gap-4 md:hidden">
            <div className="w-[385px] md:block">
              <Bookingdetail
                standardRequests={standardRequests}
                specialRequests={specialRequests}
                additionalRequest={additionalRequest}
              />
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
