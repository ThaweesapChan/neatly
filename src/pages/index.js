import Homepage from "./homepage";
import Bookingdetail from "@/component/payment/bookingdetail";
import Basicinformation from "@/component/payment/step1/idex";
import Standardrequest from "@/component/payment/step2/idex";
import RoomProperty from "./agent/roomproperty";
export default function Home() {
  return (
    <div>
      <Basicinformation />
      <Standardrequest />
      <Bookingdetail />
      <RoomProperty />
    </div>
  );
}
