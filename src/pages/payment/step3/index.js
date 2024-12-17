import CreditCard from "@/component/payment/creditcard";
import Cash from "@/component/payment/cash";
import Navbar from "@/component/navbar";

import {
  ConditionRefund,
  SectionsStep3,
} from "@/component/payment/sectionstep";
import { useState } from "react";
import Bookingdetail from "../../../component/payment/bookingdetail";

export default function Step3() {
  const [selectedPayment, setSelectedPayment] = useState("credit");

  return (
    <>
      <Navbar />
      <SectionsStep3 />
      <div className="mb-8 flex w-screen justify-center bg-slate-100">
        <div className="flex h-screen w-[1150px] gap-4 bg-slate-100 px-12">
          {/* ด้านซ้าย */}
          <div className="mx-auto h-max w-96 rounded border bg-white p-4 shadow-md md:w-[690px]">
            {/* ปุ่มเลือกการชำระเงิน */}
            <div className="mb-6 flex items-center justify-between space-x-4">
              {/* ปุ่ม Credit Card */}
              <button
                onClick={() => setSelectedPayment("credit")}
                className={`flex h-16 w-44 items-center justify-center rounded border-2 p-2 font-inter text-xl font-semibold text-gray-300 md:h-20 md:w-80 ${
                  selectedPayment === "credit"
                    ? "border-orange-500 text-orange-500"
                    : "border-gray-300"
                }`}
              >
                <span className="mr-2">💳</span>
                <h1 className="font-inter text-xl font-semibold">
                  Credit Card
                </h1>
              </button>
              {/* ปุ่ม Cash */}
              <button
                onClick={() => setSelectedPayment("cash")}
                className={`flex h-16 w-44 items-center justify-center rounded border-2 p-2 font-inter text-xl font-semibold text-gray-300 md:h-20 md:w-80 ${
                  selectedPayment === "cash"
                    ? "border-orange-500 text-orange-500"
                    : "border-gray-300"
                }`}
              >
                <span className="mr-2">💰</span>
                <h1 className="font-inter text-xl font-semibold">Cash</h1>
              </button>
            </div>
            {/* แสดงคอมโพเนนต์ตามปุ่มที่เลือก */}
            <div>
              {selectedPayment === "credit" ? <CreditCard /> : <Cash />}
            </div>
          </div>
          {/* ด้านขวา */}
          <div className="flex flex-col gap-4">
            <div className="hidden md:block md:w-[385px]">
              <Bookingdetail />
            </div>
            <div className="hidden md:block">
              <ConditionRefund />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
