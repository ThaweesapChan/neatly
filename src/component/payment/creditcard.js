import { ConditionRefund } from "@/component/payment/sectionstep";
import Bookingdetail from "@/component/payment/bookingdetail";
import { useState } from "react";
import { useRouter } from "next/router";
import { useBooking } from "@/lib/BookingContext";
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
import { useBookingDetail } from "@/lib/BookingDetailContext";
import { PaymentFailed } from "@/component/payment/payment-failed";

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
  const [error, setError] = useState("");
  const { bookingDetail } = useBookingDetail();

  // state for showing the PaymentFailed popup
  const [showPaymentFailed, setShowPaymentFailed] = useState(false);

  const handleBack = () => {
    router.push("/payment/step2");
  };

  const handlePaymentFailed = () => {
    setShowPaymentFailed(true); // Show the PaymentFailed popup
  };

  const handleClosePopup = () => {
    setShowPaymentFailed(false); // Close the popup
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe.js is not available yet. Please wait a moment...");
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);
    if (!cardElement) {
      setError("An error occurred loading the card information fields.");
      return;
    }

    setLoading(true);

    try {
      const {
        roominfo,
        check_in_date,
        check_out_date,
        userinfo,
        totalprice,
        additionalInfo,
      } = bookingDetail;

      const response = await axios.post("/api/stripe/bookingHandler", {
        roominfo,
        check_in_date,
        check_out_date,
        userinfo,
        additionalInfo,
        totalprice,
        amount: totalprice,
        user_id: bookingDetail.user_id,
      });

      if (!response.data.client_secret) {
        throw new Error("No client_secret received from API");
      }

      const { client_secret } = response.data;

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
        handlePaymentFailed(); // Trigger the PaymentFailed popup
      } else {
        router.push("/payment/payment-success");
      }
    } catch (error) {
      handlePaymentFailed(); // Trigger the PaymentFailed popup
    } finally {
      setLoading(false);
    }
  };

  const stripeElementStyle = {
    base: {
      fontSize: "16px",
      color: "#A0AEC0",
      "::placeholder": {
        color: "#A0AEC0",
      },
    },
    invalid: { color: "#ff6b6b" },
  };

  return (
    <>
      <div className="mx-auto mb-4 rounded bg-white">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="font-inter text-xl font-semibold text-gray-600">
            Credit Card
          </div>

          <div>
            <label className="mb-1 block font-inter text-sm font-normal">
              Card Number
            </label>
            <div className="h-12 rounded border p-2">
              <CardNumberElement options={{ style: stripeElementStyle }} />
            </div>
          </div>

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

          {error && <p className="mt-2 text-red-500">{error}</p>}

          <div className="md:hidden">
            <Bookingdetail />
          </div>

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
      {/* Show PaymentFailed pop-up if payment failed */}
      {showPaymentFailed && (
        <PaymentFailed onRetry={handleSubmit} onBack={handleClosePopup} />
      )}
    </>
  );
}
/*

*/
export default function CreditCard() {
  return (
    <Elements stripe={stripePromise}>
      <FormCreditCard />
    </Elements>
  );
}
