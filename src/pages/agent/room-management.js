import React, { useState, useEffect } from "react";
import Sidebar from "@/component/sidebar";
import RoomManageSearch from "@/components/ui/room-management-search";
import { useRouter } from "next/router";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

/*
Room no.|| Room Type ||  Bed Type || Status

Status

Vacant
#006753
#F0F2F8

Occupied
#084BAF
#E4ECFF

Assign Clean
#006753
#E5FFFA

Assign Dirty
#A50606
#FFE5E5

Vacant Clean
#006753
#E5FFFA

Vacant Clean Inspected
#766A00
#FFF9E5

Vacant Clean Pick Up
#006753
#E5FFFA

Occupied Clean
#084BAF
#E4ECFF

Occupied Clean Inspected
#766A00
#FFF9E5

Occupied Dirty
#A50606
#FFE5E5

Out of Order
#6E7288
#F0F1F8

Out of Service
#6E7288
#F0F1F8
Out of Inventory
#6E7288
#F0F1F8

*/

function Room_management_page() {
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

  async function updateRoomStatus(roomId, newStatus) {
    try {
      await axios.post("/api/updateRoomStatus", { roomId, status: newStatus });
      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.room_id === roomId ? { ...room, status: newStatus } : room
        )
      );
      setFilteredRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.room_id === roomId ? { ...room, status: newStatus } : room
        )
      );
    } catch (error) {
      console.error("Error updating room status:", error);
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
          .includes(query.toLowerCase())
      );
      setFilteredRooms(filtered);
    } else {
      setFilteredRooms(rooms);
    }
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = filteredRooms.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const statusOptions = [
    "Vacant",
    "Occupied",
    "Assign Clean",
    "Assign Dirty",
    "Vacant Clean",
    "Vacant Clean Inspected",
    "Vacant Clean Pick Up",
    "Occupied Clean",
    "Occupied Clean Inspected",
    "Occupied Dirty",
    "Out of Order",
    "Out of Service",
    "Out of Inventory",
  ];

  return (
    <>
      <div className="flex flex-row bg-slate-300">
        <Sidebar />

        <div className="w-full bg-red-600">
          <RoomManageSearch />

          <div className="p-10 px-20">
            <table className="min-w-full bg-white font-inter shadow">
              <thead>
                <tr className="h-16 bg-gray-300 text-left font-medium leading-6 text-gray-800">
                  <th className="px-6 py-3 pl-10">Room no.</th>
                  <th className="px-6 py-3 pl-10">Room Type</th>
                  <th className="px-6 py-3 pl-10">Bed Type</th>
                  <th className="px-6 py-3 pl-10">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentBookings.length > 0 ? (
                  currentBookings.map((room) => (
                    <tr
                      key={room.room_id}
                      onClick={() =>
                        router.push(
                          `/agent/roomproperty/property-view-edit/${room.room_id}`
                        )
                      }
                      className="h-20 cursor-pointer border-b text-left ease-out hover:bg-gray-100"
                    >
                      <td className="whitespace-nowrap px-6 py-4 pl-10">
                        {room.room_number || "-"}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 pl-10">
                        {room.room_type || "-"}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 pl-10">
                        {room.bed_type || "-"}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 pl-10">
                        <select
                          value={room.status}
                          onChange={(e) =>
                            updateRoomStatus(room.room_id, e.target.value)
                          }
                          className="rounded border px-3 py-2"
                        >
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
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
                )
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
    </>
  );
}

export default Room_management_page;
