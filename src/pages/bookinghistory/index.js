import Navbar from "@/component/navbar";
import Footer from "@/component/footer";
import BookingHistoryCard from "@/component/bookinghistorycard";

function BookingHistoryPage() {
  return (
    <div className="bg-[#E4E6ED]">
      <Navbar />
      <h1 className="mb-6 ml-6 mt-10 flex grow font-notoSerif text-[44px] font-medium text-green-700 md:my-20 md:ml-20 md:text-[68px]">
        Booking History
      </h1>
      <BookingHistoryCard />
      <Footer />
    </div>
  );
}

export default BookingHistoryPage;
