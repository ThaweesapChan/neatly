import React from "react";
import Sidebar from "@/component/sidebar";
import RoomHeader from "@/components/ui/room-header";

function RoomProperty() {
  return (
    <div className="flex">
        <Sidebar />
        <RoomHeader />  
    </div>
  );
}

export default RoomProperty;
