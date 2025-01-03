import React, { useState, useEffect } from "react";
import Sidebar from "@/component/sidebar";
import RoomManageSearch from "@/components/ui/room-management-search";
import { useRouter } from "next/router";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

const statusStyles = {
  "Vacant": { textColor: "#006753", bgColor: "#F0F2F8" },
  "Occupied": { textColor: "#084BAF", bgColor: "#E4ECFF" },
  "Assign Clean": { textColor: "#006753", bgColor: "#E5FFFA" },
  "Assign Dirty": { textColor: "#A50606", bgColor: "#FFE5E5" },
  "Vacant Clean": { textColor: "#006753", bgColor: "#E5FFFA" },
  "Vacant Clean Inspected": { textColor: "#766A00", bgColor: "#FFF9E5" },
  "Vacant Clean Pick Up": { textColor: "#006753", bgColor: "#E5FFFA" },
  "Occupied Clean": { textColor: "#084BAF", bgColor: "#E4ECFF" },
  "Occupied Clean Inspected": { textColor: "#766A00", bgColor: "#FFF9E5" },
  "Occupied Dirty": { textColor: "#A50606", bgColor: "#FFE5E5" },
  "Out of Order": { textColor: "#6E7288", bgColor: "#F0F1F8" },
  "Out of Service": { textColor: "#6E7288", bgColor: "#F0F1F8" },
  "Out of Inventory": { textColor: "#6E7288", bgColor: "#F0F1F8" },
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
      const roomsData = response.data.data;
  
      // ตรวจสอบสถานะของแต่ละห้อง
      const updatedRooms = await Promise.all(
        roomsData.map(async (room) => {
          if (!statusOptions.includes(room.status)) {
            const newStatus = "Vacant";
            await axios.post("/api/updateRoomStatus", { roomId: room.room_id, status: newStatus });
            return { ...room, status: newStatus };
          }
          return room;
        })
      );
  
      const sortedRooms = updatedRooms.sort((a, b) => a.room_id - b.room_id);
      setRooms(sortedRooms);
      setFilteredRooms(sortedRooms);
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

  return (
    <>
      <div className="flex flex-row bg-slate-300">
        <Sidebar />

        <div className="w-full">
          <RoomManageSearch onSearch={handleSearchChange} />

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
                  currentBookings.map((room) => {
                    const status = room.status;
                    const styles = statusStyles[status] || { textColor: "#000000", bgColor: "#FFFFFF" };

                    console.log(`Status: ${status}`, styles); // สำหรับตรวจสอบในคอนโซล

                    return (
                      <tr
                        key={room.room_id}
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
                            className="rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            style={{
                              color: styles.textColor,
                              backgroundColor: styles.bgColor,
                            }}
                          >
                            {statusOptions.map((statusOption) => (
                              <option key={statusOption} value={statusOption}>
                                {statusOption}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                      No bookings available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination */}
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
