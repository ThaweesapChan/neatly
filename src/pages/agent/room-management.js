import React from "react";
import Sidebar from "@/component/sidebar";
import RoomManageSearch from "@/components/ui/room-management-search";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

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
      console.log(response);
      console.log(response.data.data);
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
    <>
      <div className="flex flex-row bg-slate-300">
        {/*ซ้าย  Sidebar */}
        <Sidebar />

        {/*ซ้าย  Search และ status*/}
        <div className="w-full bg-red-600">
          <RoomManageSearch />
        </div>
      </div>
    </>
  );
}

export default Room_management_page;