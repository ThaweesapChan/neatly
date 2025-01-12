import Image from "next/image";
import Navbar from "@/component/navbar";
import { Button } from "@/component/button";

export function PaymentFailed({ onRetry, onBack }) {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 bg-orange-100 px-8 py-4 pt-8">
        <Image
          src="/asset/icon/alert.png"
          alt="payment-failed"
          width={64}
          height={64}
          priority
        />

        <h1 className="font-notoSerif text-[25px] font-medium text-orange-500">
          Payment failed
        </h1>
        <p className="text-center text-sm font-medium text-orange-500">
          There seems to be an issue with your card. Please check your card
          details and try again later, or use a different payment method.
        </p>

        <div className="mt-4 flex w-max flex-col items-center">
          <Button
            type="1"
            name="Close"
            style="w-[250px]"
            onClick={onBack}
          />
          <Button
            type="3"
            name="Retry payment"
            style="w-[250px]"
            onClick={onRetry}
          />
        </div>
      </div>
    </>
  );
}
