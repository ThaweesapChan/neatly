import axios from "axios";
import { useState, useEffect } from "react";
import { uploadFile } from "@/pages/api/upload";
import { Button } from "@/component/button";

export default function NavHotelInformation({
  hotel_name,
  hotel_description,
  hotelLogo,
}) {
  const [formData, setFormData] = useState({
    id: 1, // สมมติว่า id ของโรงแรมคือ 1
    hotel_name,
    hotel_description,
    hotel_logo_url: "",
  });

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      hotel_name,
      hotel_description,
    }));
  }, [hotel_name, hotel_description]);

  const onclick = async () => {
    try {
      let hotel_logo_url = formData.hotel_logo_url;
      if (hotelLogo && hotelLogo.name) {
        hotel_logo_url = await uploadFile(hotelLogo);
      }
      const updatedFormData = { ...formData, hotel_logo_url };

      // ตรวจสอบข้อมูลก่อนส่ง
      console.log("Updated Form Data:", updatedFormData);

      const response = await axios.post("/api/updateRoomInformation", updatedFormData);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error updating hotel information:", error);
    }
  };

  return (
    <div className="flex h-20 w-full items-center justify-between border-b bg-red-600 p-4">
      <h1 className="px-6 font-inter text-xl font-semibold">
        Hotel Information
      </h1>
      <Button name="Update" type="1" style="w-[121px]" onClick={onclick} />
    </div>
  );
}