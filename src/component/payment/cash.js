import { ConditionRefund } from "@/component/payment/sectionstep";
import { useState } from "react";
import { useRouter } from "next/router";
import { useBookingDetail } from "@/lib/BookingDetailContext";
import { Button } from "@/component/button";
import Bookingdetail from "@/component/payment/bookingdetail";
import { Banknote } from "lucide-react";

export function FormCash() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { bookingDetail } = useBookingDetail();

  const handleBack = () => {
    router.push("/payment/step2");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const {
        roominfo,
        check_in_date,
        check_out_date,
        userinfo,
        totalprice,
        additionalInfo,
        user_id,
      } = bookingDetail;

      const response = await fetch("/api/cashBookingHandler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roominfo,
          check_in_date,
          check_out_date,
          userinfo,
          additionalInfo,
          totalprice,
          amount: 1,
          user_id,
        }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Failed to process booking.");
      }

      const data = await response.json();

      router.push(`/payment/payment-success`);
    } catch (err) {
      console.error("Booking error:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="font-inter text-xl font-semibold text-gray-600">
          Cash
        </div>

        <div className="rounded-md bg-[#F1F2F6] p-6">
          <div className="flex items-center gap-4">
            <Banknote className="h-20 w-20 text-orange-500 md:h-10" />
            <span className="font-inter text-sm text-[#2A2E3F] md:text-base">
              Pay at the hotel with cash or cheque. No payment is required until
              you check in.
            </span>
          </div>
        </div>

        <div className="md:hidden">
          <Bookingdetail />
        </div>

        <div className="md:hidden">
          <ConditionRefund />
        </div>

        {error && <div className="text-red-500">{error}</div>}

        <div className="flex flex-row justify-between">
          <Button type="3" name="Back" style="w-[101PX]" onClick={handleBack} />

          <button
            type="submit"
            disabled={loading}
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

export default function Cash() {
  return <FormCash />;
}
