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

export function FormCash() {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [cardOwner, setCardOwner] = useState("");
  const [promotionCode, setPromotionCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    router.push("http://localhost:3000");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <div>
      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="font-inter text-xl font-semibold text-gray-600">
          Cash
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

        <div className="md:hidden">
          <ConditionRefund />
        </div>

        <div className="flex flex-row justify-between">
          <Button type="3" name="Back" style="w-[101PX]" onClick={handleBack} />

          <button
            disabled={!stripe || loading}
            className={`w-[101PX] rounded py-2 text-white ${
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
export default function Cash() {
  return (
    <Elements stripe={stripePromise}>
      <FormCash />
    </Elements>
  );
}
