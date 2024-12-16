import { ConditionRefund } from "@/component/payment/sectionstep";
import { useState } from "react";
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

// โหลด Stripe ด้วย Publishable Key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISABLE_KEY);

export function FormCreditCard() {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [cardOwner, setCardOwner] = useState("");
  const [promotionCode, setPromotionCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    console.log("Back button clicked");
    router.push("http://localhost:3000");
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

    // สร้าง Payment Method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: { name: cardOwner },
    });

    if (error) {
      console.error("Error creating payment method:", error);
      alert("Error: " + error.message);
    } else {
      console.log("PaymentMethod created:", paymentMethod);
      console.log("Payment method created successfully!");
    }

    setLoading(false);
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

        <div className="h-12 w-full bg-green-800 md:hidden">Booking Detail</div>

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
            {loading ? "Processing..." : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}

// Test Component ที่ครอบ Step3 ด้วย <Elements>
export default function CreditCard() {
  return (
    <Elements stripe={stripePromise}>
      <FormCreditCard/>
    </Elements>
  );
}
