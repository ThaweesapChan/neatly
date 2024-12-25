import Homepage from "./homepage";
import Bookingdetail from "@/component/payment/bookingdetail";
import Standardrequest from "@/pages/payment/step2";
import Basicinformation from "@/pages/payment/step1";
import RoomProperty from "./agent/roomproperty";
import Booking from "./payment";
import Step3 from "@/pages/payment/step3";
export default function Home() {
  console.log(Step3);
  return (
    <div>
      <Bookingdetail />
    </div>
  );
}
