import React from "react";
import Router from "next/router";
import Sidebar from "@/component/sidebar";
import axios from "axios";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

function CustomerBookingpage() {
  const [bookings, setBooking] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const router = Router;

  // Get Data From API
  async function getData() {
    try {
      let response = await axios.get("/api/getbooking");
      setBooking(response.data.data);
      setFilteredBookings(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Render Data When Refresh Page
  useEffect(() => {
    getData();
  }, []);

  // Handle Input Search
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query) {
      const filtered = bookings.filter((booking) =>
        `${booking.user?.first_name} ${booking.user?.last_name}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      );
      setFilteredBookings(filtered);
    } else {
      setFilteredBookings(bookings);
    }
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = filteredBookings.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // FormatDate
  const formatDate = (dateString) => {
    const options = {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <>
      <div className="flex bg-gray-100">
        <Sidebar />
        <div className="flex-grow">
          <div className="flex items-center justify-between bg-white px-20 py-6 shadow">
            <h1 className="bg-white font-inter text-xl font-semibold leading-8 tracking-tight">
              Customer Booking
            </h1>
            <div>
              <input
                type="text"
                id="search"
                name="search"
                value={searchQuery}
                onChange={handleSearchChange}
                className="relative w-96 rounded border border-gray-300 p-2 pl-12 text-gray-400"
                placeholder="Search..."
              />
              <Search className="absolute -translate-y-8 translate-x-3 text-gray-400" />
            </div>
          </div>
          <div className="p-10 px-20">
            <table className="min-w-full bg-white font-inter shadow">
              <thead>
                <tr className="h-16 bg-gray-300 text-left font-medium leading-6 text-gray-800">
                  <th className="px-6 py-3 pl-10">Customer name</th>
                  <th className="px-6 py-3 pl-10">Guest(s)</th>
                  <th className="px-6 py-3 pl-10">Room type</th>
                  <th className="px-6 py-3 pl-10">Amount</th>
                  <th className="px-6 py-3 pl-10">Bed Type</th>
                  <th className="px-6 py-3 pl-10">Check-in</th>
                  <th className="px-6 py-3 pl-10">Check-out</th>
                </tr>
              </thead>
              <tbody>
                {/* Map Data From API */}
                {currentBookings.length > 0 ? (
                  currentBookings.map((booking) => (
                    <tr
                      key={booking.booking_id}
                      onClick={() =>
                        router.push(
                          `/agent/customer-booking/${booking.booking_id}`,
                        )
                      }
                      className="h-20 cursor-pointer border-b text-left ease-out hover:bg-gray-100"
                    >
                      <td className="whitespace-nowrap px-6 py-4 pl-10">
                        <span>
                          {booking.user?.first_name || "N/A"}
                          {"  "}
                          {booking.user?.last_name || "N/A"}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 pl-10">
                        {booking.guests || "N/A"}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 pl-10">
                        {booking.room?.room_type || "N/A"}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 pl-10">
                        {booking.amount || "N/A"}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 pl-10">
                        {booking.room?.bed_type || "N/A"}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 pl-10">
                        {formatDate(booking.check_in_date)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 pl-10">
                        {formatDate(booking.check_out_date)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No bookings available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="mt-6 flex items-center justify-center">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-gray-600 disabled:opacity-50"
              >
                <ChevronLeft />
              </button>
              {[
                ...Array(Math.ceil(filteredBookings.length / itemsPerPage)),
              ].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`mx-1 rounded-md px-3 py-1 ${
                    currentPage === index + 1
                      ? "bg-white text-green-600"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={
                  currentPage ===
                  Math.ceil(filteredBookings.length / itemsPerPage)
                }
                className="px-4 py-2 text-gray-600 disabled:opacity-50"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerBookingpage;
