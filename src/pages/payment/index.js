import Navbar from "@/component/navbar";
import Step1 from "@/pages/payment/step1";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Booking() {
  const router = useRouter();
  const { check_in, check_out, room } = router.query;
  console.log(check_in, check_out, room, "check_in, check_out, room");
  return (
    <>
      <Navbar />
      <Step1 />
    </>
  );
}
