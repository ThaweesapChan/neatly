import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { uploadFile } from "@/pages/api/upload";
import { Button } from "@/component/button";

export default function NavHotelInformation({ hotel_name, hotel_description, hotelLogo,}) {
  const router = useRouter();


  /*รับค่า parameterมา 3 ตัว ซึ่งจะเป็น props ในหน้า hotel infomartion */
  
  /*set statge formdata */
  const [formData, setFormData] = useState({
    hotel_name,
    hotel_description,
    hotel_logo_url: "",
  });

  /*เมื่อมีการเปลี่ยนแปลงในส่วนของ name และ descriptions ให้เปลี่ยนแปลงค่านี้ด้วย*/
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      hotel_name,
      hotel_description,
    }));
  }, [hotel_name, hotel_description]);

  
  const onclick = async () => {
    // ตรวจสอบว่าไม่มี input ใดว่าง
    if (!formData.hotel_name || !formData.hotel_description || !hotelLogo) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      let hotel_logo_url = formData.hotel_logo_url;
      if (hotelLogo && hotelLogo.name) {
        hotel_logo_url = await uploadFile(hotelLogo);
      }
      const body = { ...formData, hotel_logo_url };

      // ตรวจสอบข้อมูลก่อนส่ง
      console.log("Updated Form Data:", body);

      const response = await axios.post("/api/updateRoomInformation", body);
      console.log("Response:", response.data);
      console.log("suuccess");
      router.push("http://localhost:3000");

    
    } catch (error) {
      console.error("Error updating hotel information:", error);
    }
  };

  return (
    <div className="flex h-20 w-full items-center justify-between border-b bg-white p-4">
      <h1 className="px-6 font-inter text-xl font-semibold">
        Hotel Information
      </h1>
      <Button name="Update" type="1" style="w-[121px]" onClick={onclick} />
    </div>
  );
}