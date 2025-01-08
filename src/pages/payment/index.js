import Navbar from "@/component/navbar";
import Step1 from "@/pages/payment/step1";
import { useRouter } from "next/router";

export default function Booking() {
  const router = useRouter();
  const { checkIn, checkOut, room } = router.query;
  console.log(checkIn, checkOut, room, "checkIn, checkOut, room .query");

  return (
    <>
      <Navbar />
      <Step1 />
    </>
  );
}
