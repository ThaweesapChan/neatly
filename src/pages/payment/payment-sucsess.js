import Navbar from "@/component/navbar";
import { Button } from "@/component/button";
import { useRouter } from "next/router";
import Bookingdetail from "@/component/payment/bookingdetail";

export default function PaymentSuccess() {
  const router = useRouter();

  const handleBackToHome = () => {
    console.log("Back button clicked");
    router.push("http://localhost:3000/homepage");
  };

  const handleCheckBookingDetail = () => {
    console.log("Back button clicked");
    router.push("http://localhost:3000/payment");
  };

  return (
    <>
      <Navbar />
      <div className="mt-8 flex h-screen w-screen flex-col items-center">
        {/*ข้อความ*/}
        <div className="flex w-[375px] flex-col gap-4 bg-green-800 px-2 py-8 md:w-[738px]">
          {/*ข้อความ Mobile */}
          <div className="md:hidden">
            <h1 className="text-center font-notoSerif text-[42px] font-medium text-white">
              Your Request has been Submitted
            </h1>
            <h1 className="bg-red-300 text-center font-inter text-sm font-medium text-white">
              The cancellation is complete. You will recieve an email with a
              detail and refund within 48 hours.
            </h1>
          </div>

          {/*ข้อความ Desktop */}
          <div className="hidden md:flex md:flex-col">
            <h1 className="text-center font-notoSerif text-[44px] font-medium text-white">
              Thank you for booking
            </h1>
            <h1 className="text-center font-inter text-sm font-medium text-white md:px-16">
              We are looking forward to hosting you at our place. We will send
              you more information about check-in and staying at our Neatly
              closer to your date of reservation
            </h1>
          </div>
        </div>

        {/*ข้อความ*/}
        <div className="w-[375px] bg-[#2F4C43] md:w-[738px]">
          <Bookingdetail />
        </div>

        {/*ปุ่ม*/}
        <div className="flex w-[375px] justify-center gap-6 pt-8 md:w-[738px]">
          <div className="hidden md:flex">
            <Button type="3" name="Check Booking Detail" style="w-44" />
          </div>
          <Button
            type="1"
            name="Back To Home"
            style="w-44"
            onClick={handleBackToHome}
          />
        </div>
      </div>
    </>
  );
}
