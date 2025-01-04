import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Sidebar from "@/component/sidebar";
import RoomHeader from "@/components/ui/room-header";
import axios from "axios";

function RoomProperty() {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const router = useRouter();

  async function getData() {
    try {
      const response = await axios.get("/api/getRoomProperty");
      setRooms(response.data.data);
      setFilteredRooms(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = rooms.filter((room) =>
        Object.values(room)
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase()),
      );
      setFilteredRooms(filtered);
    } else {
      setFilteredRooms(rooms);
    }
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = filteredRooms.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex bg-gray-100">
      <Sidebar />
      <div className="flex-grow">
        <RoomHeader onSearch={handleSearchChange} />
        <div className="p-10 px-20">
          <table className="min-w-full bg-white font-inter shadow">
            <thead>
              <tr className="h-16 bg-gray-300 text-left font-medium leading-6 text-gray-800">
                <th className="px-6 py-3 pl-10">Image</th>
                <th className="px-6 py-3 pl-10">Room Type</th>
                <th className="px-6 py-3 pl-10">Price</th>
                <th className="px-6 py-3 pl-10">Promotion Price</th>
                <th className="px-6 py-3 pl-10">Guest(s)</th>
                <th className="px-6 py-3 pl-10">Bed Type</th>
                <th className="px-6 py-3 pl-10">Room Size</th>
              </tr>
            </thead>
            <tbody>
              {currentBookings.length > 0 ? (
                currentBookings.map((room) => (
                  <tr
                    key={room.room_id}
                    onClick={() =>
                      router.push(
                        `/agent/roomproperty/property-view-edit/${room.room_id}`,
                      )
                    }
                    className="h-20 cursor-pointer border-b text-left ease-out hover:bg-gray-100"
                  >
                    <td className="whitespace-nowrap px-6 py-4 pl-10">
                      <img
                        src={room.room_image_url || "/default-image.jpg"}
                        alt={room.room_type || "Room Image"}
                        className="h-20 w-20 rounded-md object-cover"
                      />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 pl-10">
                      {room.room_type || "-"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 pl-10">
                      {room.price || "-"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 pl-10">
                      {room.promotion_price || "-"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 pl-10">
                      {room.guests || "-"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 pl-10">
                      {room.bed_type || "-"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 pl-10">
                      {room.room_size || "-"}
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

          <div className="mt-6 flex items-center justify-center">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-gray-600 disabled:opacity-50"
            >
              <ChevronLeft />
            </button>
            {[...Array(Math.ceil(filteredRooms.length / itemsPerPage))].map(
              (_, index) => (
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
              ),
            )}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(filteredRooms.length / itemsPerPage)
              }
              className="px-4 py-2 text-gray-600 disabled:opacity-50"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomProperty;
