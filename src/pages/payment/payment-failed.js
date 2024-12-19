import Image from "next/image";
import { useRouter } from "next/router";
import Navbar from "@/component/navbar";
import { Button } from "@/component/button";
import { loadStripe } from "@stripe/stripe-js";
import { useBooking } from "@/lib/BookingContext"; // Import Booking Context
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
} from "@stripe/react-stripe-js";

import React, { useEffect } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISABLE_KEY);

export function PaymentFailed() {
  const router = useRouter();
  const { bookingData } = useBooking(); // ใช้ Booking Context
  const stripe = useStripe();
  const elements = useElements();

  console.log("ข้อมูลเก่า : ",bookingData);

  const handleBack = () => {
    console.log("Back button clicked");
    router.push("http://localhost:3000/payment");
  };

  const handleRetryPayment = async () => {
    if (!stripe || !elements) {
      alert("Stripe.js ยังไม่พร้อมใช้งาน โปรดรอสักครู่...");
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);
    if (!cardElement) {
      alert("ไม่พบข้อมูลบัตร");
      return;
    }

    try {
      // Retry การชำระเงินโดยใช้ข้อมูลเดิมจาก bookingData
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: bookingData.paymentMethod.cardOwner,
        },
      });

      if (error) {
        console.error("Retry payment failed:", error);
        alert("ชำระเงินไม่สำเร็จ โปรดลองอีกครั้ง");
      } else {
        console.log("Retry payment success:", paymentMethod);
        alert("ชำระเงินสำเร็จ");
        router.push("http://localhost:3000/payment/success");
      }
    } catch (err) {
      console.error("Error during retry:", err);
      alert("เกิดข้อผิดพลาด โปรดลองอีกครั้ง");
    }
  };

  return (
    <>
      <Navbar />
      <div className="md:flex md:w-screen md:flex-col md:items-center md:py-16">
        <div className="flex h-[594px] w-screen flex-col items-center justify-center gap-4 bg-orange-100 md:h-[349px] md:w-[738px]">
          <Image
            src="/asset/icon/alert.png"
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
          <Button
            type="1"
            name="Back to Payment details"
            style="w-[372px]"
            onClick={handleBack}
          />
          <Button
            type="3"
            name="Retry payment"
            style="w-[372px]"
            onClick={handleRetryPayment} // เพิ่มการทำงาน Retry
          />
        </div>

        <div className="hidden w-screen flex-row justify-center gap-4 px-6 py-8 md:flex">
          <Button
            type="3"
            name="Retry payment"
            style="w-[150px]"
            onClick={handleRetryPayment} // เพิ่มการทำงาน Retry
          />
          <Button
            type="1"
            name="Back to Payment details"
            style="w-[372px]"
            onClick={handleBack}
          />
        </div>
      </div>
    </>
  );
}

export default function CreditCard() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentFailed />
    </Elements>
  );
}