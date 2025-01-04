import Navbar from "@/component/navbar";
import Footer from "@/component/footer";
import BookingHistoryCard from "@/component/bookinghistorycard";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import axios from "axios";

function BookingHistoryPage() {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchBookings = async (page = 1) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `/api/getBookingHistory?page=${page}&limit=5`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      // Sort bookings by booking_date (latest first)
      const sortedBookings = response.data.bookings.sort(
        (a, b) => new Date(b.booking_date) - new Date(a.booking_date),
      );

      setBookings(sortedBookings);
      setTotalPages(Math.ceil(response.data.total / 5)); // total bookings from backend
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error("Session expired. Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 3000); // Redirect after 3 seconds
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading)
    return (
      <h1 className="flex justify-center text-2xl text-green-700">
        Loading...
      </h1>
    );

  return (
    <div className="bg-[#E4E6ED]">
      <Navbar />
      <h1 className="mb-6 ml-6 mt-10 flex grow font-notoSerif text-[44px] font-medium text-green-700 md:my-20 md:ml-20 md:text-[68px]">
        Booking History
      </h1>

      {/* Pass bookings data to BookingHistoryCard */}
      <BookingHistoryCard bookings={bookings} />

      {/* Styled Pagination Controls */}
      <div className="mb-4 mt-6 flex items-center justify-center">
        <button
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`mx-1 flex h-8 w-8 items-center justify-center rounded-full border ${
            currentPage === 1
              ? "cursor-not-allowed text-gray-400"
              : "text-black"
          }`}
        >
          <ChevronLeft />
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 flex h-8 w-8 items-center justify-center rounded-sm border font-openSans font-semibold ${
              currentPage === index + 1
                ? "bg-white text-green-600"
                : "text-black"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() =>
            currentPage < totalPages && handlePageChange(currentPage + 1)
          }
          disabled={currentPage === totalPages}
          className={`mx-1 flex h-8 w-8 items-center justify-center rounded-sm border font-openSans font-semibold ${
            currentPage === totalPages
              ? "cursor-not-allowed text-gray-400"
              : "text-black"
          }`}
        >
          <ChevronRight />
        </button>
      </div>

      <Footer />

      {/* Toast Notification */}
      <ToastContainer />
    </div>
  );
}

export default BookingHistoryPage;
