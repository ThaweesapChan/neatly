import { ConditionRefund } from "@/component/payment/sectionstep";
import Bookingdetail from "@/component/payment/bookingdetail";
import { useState } from "react";
import { useBooking } from "@/lib/BookingContext";
import { useRouter } from "next/router";
import {
  CardExpiryElement,
  CardCvcElement,
  CardNumberElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/component/button";
import axios from "axios";

import PaymentFailed from "../../pages/payment/payment-failed";

// โหลด Stripe ด้วย Publishable Key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISABLE_KEY);

export function FormCreditCard() {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [cardOwner, setCardOwner] = useState("");
  const [promotionCode, setPromotionCode] = useState("");
  const [loading, setLoading] = useState(false);

  const { bookingData } = useBooking();

  const handleBack = () => {
    console.log("Back button clicked");
    router.push("http://localhost:3000/homepage");
  };

  const handlePaymentFailed = () => {
    router.push("http://localhost:3000/payment/payment-failed");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      alert("Stripe.js ยังไม่พร้อมใช้งาน โปรดรอสักครู่...");
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);
    if (!cardElement) {
      alert("เกิดข้อผิดพลาดในการโหลดฟิลด์ข้อมูลบัตร");
      return;
    }

    setLoading(true);

    try {
      // เรียกข้อมูลจาก Context
      const { basicInfo, specialRequest } = bookingData;
      // ต้องมาเพิ่มที่หลังว่า front-end ที่แก้วทำส่ง data มาเป็นแบบไหน

      // เรียก API Backend เพื่อสร้าง PaymentIntent และรับ client_secret
      const response = await axios.post("/api/stripe/bookingHandler", {
        basicInfo,
        specialRequest,
        checkInDate,
        checkOutDate,
        originalPrice,
        promotionCode,
        totalPrice,
        amount,
      });

      // ตรวจสอบ Response
      if (!response.data.client_secret) {
        throw new Error("No client_secret received from API");
      }

      const { client_secret } = response.data;

      // ใช้ client_secret กับ stripe.confirmCardPayment
      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(client_secret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: cardOwner,
            },
          },
        });

      if (confirmError) {
        console.error("Error confirming payment:", confirmError);
        handlePaymentFailed();
      } else {
        console.log("PaymentIntent confirmed:", paymentIntent);
        alert("การชำระเงินสำเร็จ!");
        router.push("/payment/payment-success"); // Redirect ไปหน้า success
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      handlePaymentFailed();
    } finally {
      setLoading(false);
    }
  };

  // Stripe element styles
  const stripeElementStyle = {
    base: {
      fontSize: "16px",
      color: "#A0AEC0", // Light gray for text
      "::placeholder": {
        color: "#A0AEC0", // Light gray placeholder
      },
    },
    invalid: { color: "#ff6b6b" },
  };

  return (
    <div className="mx-auto rounded bg-white">
      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="font-inter text-xl font-semibold text-gray-600">
          Credit Card
        </div>

        {/* Card Number */}
        <div>
          <label className="mb-1 block font-inter text-sm font-normal">
            Card Number
          </label>
          <div className="h-12 rounded border p-2">
            <CardNumberElement options={{ style: stripeElementStyle }} />
          </div>
        </div>

        {/* Card Owner */}
        <div>
          <label className="mb-1 block font-inter text-sm font-normal">
            Card Owner
          </label>
          <input
            type="text"
            value={cardOwner}
            onChange={(e) => setCardOwner(e.target.value)}
            placeholder="Name"
            className="w-full rounded border p-2 text-gray-400 placeholder-gray-400"
            style={{
              fontSize: "16px",
              color: "#A0AEC0",
            }}
            required
          />
        </div>

        {/* Expiry Date และ CVC */}
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="mb-1 block font-inter text-sm font-normal">
              Expiry Date
            </label>
            <div className="h-12 rounded border p-2">
              <CardExpiryElement options={{ style: stripeElementStyle }} />
            </div>
          </div>
          <div className="w-1/2">
            <label className="mb-1 block font-inter text-sm font-normal">
              CVC/CVV
            </label>
            <div className="h-12 rounded border p-2">
              <CardCvcElement options={{ style: stripeElementStyle }} />
            </div>
          </div>
        </div>

        {/* Promotion Code */}
        <div>
          <label className="mb-1 block font-inter text-sm font-normal">
            Promotion Code
          </label>
          <input
            type="text"
            value={promotionCode}
            onChange={(e) => setPromotionCode(e.target.value)}
            placeholder="NEATLYNEW400"
            className="w-full rounded border p-2 text-gray-400 placeholder-gray-400"
            style={{
              fontSize: "16px",
              color: "#A0AEC0",
            }}
          />
        </div>

        {/* Booking Detail */}
        <div className="md:hidden">
          <Bookingdetail />
        </div>

        {/* Conditions refund */}
        <div className="md:hidden">
          <ConditionRefund />
        </div>

        <div className="flex flex-row justify-between">
          <Button
            type="3"
            name="Back"
            style="w-[101PX] md:w-48"
            onClick={handleBack}
          />

          <button
            disabled={!stripe || loading}
            className={`w-[101PX] rounded py-2 text-white md:w-48 ${
              loading ? "cursor-not-allowed bg-gray-400" : "bg-orange-500"
            }`}
          >
            {loading ? "Processing..." : "Confirm Booking"}
          </button>
        </div>
      </form>
    </div>
  );
}

// Test Component ที่ครอบ Step3 ด้วย <Elements>//
export default function CreditCard() {
  return (
    <Elements stripe={stripePromise}>
      <FormCreditCard />
    </Elements>
  );
}
