import RoomsSuitsPost from "../roomssuitspost";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function RoomsSuits() {
  const [roomData, setRoomData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all rooms by room_type and return room_ids
  async function fetchAllRooms(room_type) {
    try {
      const response = await axios.get("/api/getRoomDetail");
      const data = response.data;

      // Filter rooms by type
      const filteredData = data.filter((room) => room.room_type === room_type);

      // Return room_ids as an array of strings
      const roomIds = filteredData.map((room) => room.room_id.toString());

      console.log(`Room IDs for ${room_type}:`, roomIds);
      return roomIds;
    } catch (err) {
      console.error("Error fetching all rooms:", err);
      setError(err.message);
      return [];
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetch room IDs for each type
        const roomIds = {
          SuperiorGardenView: await fetchAllRooms("Superior Garden View"),
          Deluxe: await fetchAllRooms("Deluxe"),
          Superior: await fetchAllRooms("Superior"),
          PremierSeaView: await fetchAllRooms("Premier Sea View"),
          Supreme: await fetchAllRooms("Supreme"),
          Suite: await fetchAllRooms("Suite"),
        };

        setRoomData(roomIds);
      } catch (err) {
        console.error("Error in useEffect:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section
      className="h-full gap-[40px] bg-white pb-[40px] pt-[40px]"
      id="rooms-suites"
    >
      <header>
        <h1 className="mb-10 h-[55px] text-center font-notoSerif text-[44px] font-medium leading-[55px] tracking-[-2%] text-green-800">
          Rooms & Suites
        </h1>
      </header>
      <article>
        <figure>
          {/* Mobile layout */}
          <div className="flex flex-col gap-4 md:hidden">
            <RoomsSuitsPost
              label="Superior Garden View"
              src="/asset/superior.jpeg"
              roomId={roomData.SuperiorGardenView?.join(", ")}
            />
            <RoomsSuitsPost
              label="Deluxe"
              src="/asset/deluxe.jpeg"
              roomId={roomData.Deluxe?.join(", ")}
            />
            <RoomsSuitsPost
              label="Superior"
              src="/asset/room.jpeg"
              roomId={roomData.Superior?.join(", ")}
            />
            <RoomsSuitsPost
              label="Premier Sea View"
              src="/asset/premier.jpeg"
              roomId={roomData.PremierSeaView?.join(", ")}
            />
            <RoomsSuitsPost
              label="Supreme"
              src="/asset/supreme.jpeg"
              roomId={roomData.Supreme?.join(", ")}
            />
            <RoomsSuitsPost
              label="Suite"
              src="/asset/room2.jpeg"
              roomId={roomData.Suite?.join(", ")}
            />
          </div>
          {/* Desktop layout */}
          <div className="hidden md:block">
            <section className="ml-[11%] mr-[11%] flex flex-col gap-4">
              {/* Desktop 1 */}
              <div className="h-[540px] bg-yellow-500">
                <RoomsSuitsPost
                  label="Superior Garden View"
                  src="/asset/superior.jpeg"
                  roomId={roomData.SuperiorGardenView?.join(", ")}
                />
              </div>
              {/* Desktop 2 */}
              <div className="flex h-[400px] flex-row gap-4">
                <div className="w-[58.24%]">
                  <RoomsSuitsPost
                    label="Deluxe"
                    src="/asset/deluxe.jpeg"
                    roomId={roomData.Deluxe?.join(", ")}
                  />
                </div>
                <div className="w-[41.26%]">
                  <RoomsSuitsPost
                    label="Superior"
                    src="/asset/room.jpeg"
                    roomId={roomData.Superior?.join(", ")}
                  />
                </div>
              </div>
              {/* Desktop 3 */}
              <div className="flex h-[400px] flex-row gap-4">
                <div className="w-[41%]">
                  <RoomsSuitsPost
                    label="Premier Sea View"
                    src="/asset/premier.jpeg"
                    roomId={roomData.PremierSeaView?.join(", ")}
                  />
                </div>
                <div className="flex w-[59%] flex-col gap-4">
                  <div className="h-[48%]">
                    <RoomsSuitsPost
                      label="Supreme"
                      src="/asset/supreme.jpeg"
                      roomId={roomData.Supreme?.join(", ")}
                    />
                  </div>
                  <div className="h-[48%]">
                    <RoomsSuitsPost
                      label="Suite"
                      src="/asset/room2.jpeg"
                      roomId={roomData.Suite?.join(", ")}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </figure>
      </article>
    </section>
  );
}
