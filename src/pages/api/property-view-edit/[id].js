// File: pages/agent/roomproperty/property-view-edit/[id].js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Sidebar from "@/component/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RoomImage from "@/components/ui/createRoomImage";
import CreateAmenities from "@/components/ui/createAmenites";
import axios from "axios";

export default function PropertyViewEdit() {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState({
    roomNumber: "",
    roomType: "",
    roomSize: "",
    bedType: "",
    guests: 2,
    pricePerNight: "",
    promotionPrice: "",
    roomDescription: "",
    mainImage: null,
    imageGallery: [],
    amenities: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch room data when component mounts and id is available
  useEffect(() => {
    async function fetchRoomData() {
      if (!id) return; // Ensure id is available before making the request

      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`/api/getRoomProperty/${id}`);
        const roomData = response.data.data;

        setFormData({
          roomNumber: roomData.room_number || "",
          roomType: roomData.room_type || "",
          roomSize: roomData.room_size || "",
          bedType: roomData.bed_type || "",
          guests: roomData.guests || 2,
          pricePerNight: roomData.price || "",
          promotionPrice: roomData.promotion_price || "",
          roomDescription: roomData.room_description || "",
          mainImage: roomData.main_image || null,
          imageGallery: roomData.image_gallery || [],
          amenities:
            roomData.amenities?.map((amenity) => ({
              value: amenity,
              label: amenity,
            })) || [],
        });
      } catch (error) {
        console.error("Error fetching room data:", error);
        setError("Failed to load room data");
      } finally {
        setLoading(false);
      }
    }

    fetchRoomData();
  }, [id]); // Run the effect again when `id` changes

  return (
    <div>
      <Sidebar />
      <form onSubmit={handleSubmit}>
        {/* Render form inputs for room data */}
        <Label htmlFor="roomNumber">Room Number</Label>
        <Input
          id="roomNumber"
          value={formData.roomNumber}
          onChange={(e) =>
            setFormData({ ...formData, roomNumber: e.target.value })
          }
        />
        {/* Add other fields here */}
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
