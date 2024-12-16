import Image from "next/image";
import Navbar from "@/component/navbar";

import { Button } from "@/component/button";

  const handleBack = () => {
    console.log("Back button clicked");
    router.push("http://localhost:3000");
  };
export default function PaymentFailed() {
  return (
    <>
      <Navbar />
      <div className="md:flex md:w-screen md:flex-col md:items-center md:py-16">
        <div className="flex h-[594px] w-screen flex-col items-center justify-center gap-4 bg-orange-100 md:h-[349px] md:w-[738px]">
          <Image
            src="/asset/icon/alert.png" // แก้ path ให้เริ่มต้นด้วย /
            alt="payment-failed"
            width={64}
            height={64}
            priority
          />

          <div className="flex h-[130px] w-[327px] flex-col items-center justify-center">
            <h1 className="font-notoSerif text-[44px] font-medium text-orange-500">
              Payment failed
            </h1>

            <p className="text-center text-sm font-medium text-orange-500">
              There seems to be an issue with your card. Please check your card
              details and try again later, or use a different payment method.
            </p>
          </div>
        </div>

        <div className="flex w-screen flex-col items-center gap-4 px-6 py-8 md:hidden">
          {/*ปุ่มนี้พาไป step 1 */}
          <Button
            type="1"
            name="Back To Home"
            style="w-[372px]"
            onClick={handleBack}
          />
          {/*ปุ่มนี้พาไปลองชำระอีกครั้ง */}
          <Button type="3" name="Check Booking Detail" style="w-[372px]" />
        </div>

        <div className="hidden w-screen flex-row justify-center gap-4 px-6 py-8 md:flex">
          <Button type="3" name="Retry payment" style="w-[150px]" />
          <Button type="1" name="Back to Payment details" style="w-[372px]" />
        </div>
      </div>
    </>
  );
}