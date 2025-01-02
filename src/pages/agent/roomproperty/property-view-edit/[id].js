import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Sidebar from "@/component/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RoomImage from "@/components/ui/createRoomImage";
import CreateAmenities from "@/components/ui/createAmenites";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

// fn to convert image to base64
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

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
    mainImageChanged: false,
    imageGalleryChanged: false,
  });

  // Fetch room data when component mounts
  useEffect(() => {
    async function fetchRoomData() {
      if (!id) return;

      try {
        const response = await axios.get(`/api/getRoomPropertyById?id=${id}`);
        const roomData = response.data.data;

        // get and hydrate mainImage
        const mainImage = await fetch(roomData.room_image_url);
        const mainImageBlob = await mainImage.blob();
        const imageFile = Object.assign(mainImageBlob, {
          preview: URL.createObjectURL(mainImageBlob),
          image: await toBase64(mainImageBlob),
        });

        // get and hydrate imageGallery
        const imageGallery = await Promise.all(
          roomData.image_gallery.map(async (url) => {
            const image = await fetch(url);
            const imageBlob = await image.blob();
            return Object.assign(imageBlob, {
              preview: URL.createObjectURL(imageBlob),
              image: await toBase64(imageBlob),
            });
          }),
        );

        setFormData({
          roomNumber: roomData.room_number || "",
          roomType: roomData.room_type || "",
          roomSize: roomData.room_size || "",
          bedType: roomData.bed_type || "",
          guests: roomData.guests || 2,
          pricePerNight: roomData.price ? roomData.price : "",
          promotionPrice: roomData.promotion_price
            ? roomData.promotion_price
            : "",
          roomDescription: roomData.room_description || "",
          mainImage: imageFile || null,
          imageGallery: imageGallery || [],
          amenities:
            roomData.amenities?.map((amenity, index) => ({
              value: amenity,
              id: index,
            })) || [],
        });
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    }

    fetchRoomData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ฟังก์ชันแปลงไฟล์เป็น base64
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    // ฟังก์ชันแปลง imageGallery เป็น base64 strings
    const convertToBase64 = async (files) => {
      return Promise.all(
        files.map(async (file) => {
          // ถ้าเป็น string (URL) อยู่แล้วให้ส่งกลับเลย
          if (typeof file === "string") return file;
          const base64 = await toBase64(file);
          return base64;
        }),
      );
    };

    let mainImageData = null;
    if (formData.mainImageChanged) {
      // แปลง mainImage เป็น base64 ถ้าเป็นไฟล์ใหม่
      mainImageData = formData.mainImage
        ? typeof formData.mainImage === "string"
          ? formData.mainImage
          : await toBase64(formData.mainImage)
        : null;
    }

    let imageGalleryData = [];
    if (formData.imageGalleryChanged) {
      // แปลง imageGallery เป็น base64
      imageGalleryData =
        formData.imageGallery.length > 0
          ? await convertToBase64(formData.imageGallery)
          : [];
    }

    const data = {
      roomNumber: formData.roomNumber || null,
      roomType: formData.roomType || "",
      roomSize: formData.roomSize || null,
      bedType: formData.bedType || "",
      guests: formData.guests || 0,
      pricePerNight: formData.pricePerNight || null,
      promotionPrice: formData.promotionPrice || null,
      roomDescription: formData.roomDescription || "",
      mainImage: mainImageData || null,
      imageGallery: imageGalleryData || [],
      amenities: formData.amenities.map((x) => x.value) || [],
    };

    try {
      const response = await axios.put(
        `/api/updateRoomPropertyById/${id}`,
        data,
      );
      console.log(response.data);
      router.push("/agent/roomproperty/roomproperty"); // Redirect after successful update
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm("คุณแน่ใจว่าต้องการลบห้องนี้?");

    if (isConfirmed) {
      try {
        console.log("Attempting to delete room with ID:", id);

        const response = await axios.delete(
          `/api/deleteRoomPropertyById/${id}`,
        );
        console.log("Delete response:", response.data);

        if (response.data) {
          alert("ลบห้องสำเร็จ");
          router.push("/agent/roomproperty/roomproperty");
        }
      } catch (error) {
        console.error("Full error object:", error);
        console.error("Error response:", error.response?.data);

        const errorMessage =
          error.response?.data?.details ||
          error.response?.data?.error ||
          "เกิดข้อผิดพลาดในการลบห้อง กรุณาลองใหม่อีกครั้ง";

        alert(errorMessage);
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        <div className="mb-8 flex items-center justify-between p-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()} // ใช้ router.back() เพื่อย้อนกลับไปยังหน้าก่อนหน้านี้
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-semibold">{formData.roomType}</h1>
          </div>
          <Button
            variant="default"
            onClick={handleSubmit}
            className="bg-[#C1502E] hover:bg-[#A54427]"
          >
            Update
          </Button>
        </div>

        <div className="bg-gray-100 p-6 shadow">
          <form className="mx-auto max-w-5xl space-y-8 rounded-lg bg-white p-6 px-12 py-7">
            <p className="font-inter text-lg font-semibold text-[#9AA1B9]">
              Basic information
            </p>
            <div className="grid grid-cols-2 gap-10">
              <div className="space-y-2">
                <Label htmlFor="roomNumber">Room Number</Label>
                <Input
                  id="roomNumber"
                  type="number"
                  value={formData.roomNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, roomNumber: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="roomType">Room Type</Label>
                <Input
                  id="roomType"
                  list="roomOptions"
                  value={formData.roomType}
                  onChange={(e) =>
                    setFormData({ ...formData, roomType: e.target.value })
                  }
                />
                <datalist id="roomOptions">
                  <option value="Superior Garden View" />
                  <option value="Deluxe" />
                  <option value="Premier Sea View" />
                  <option value="Superior" />
                  <option value="Supreme" />
                  <option value="Suite" />
                </datalist>
              </div>

              <div className="space-y-2">
                <Label htmlFor="roomSize">Room Size (sqm)</Label>
                <Input
                  id="roomSize"
                  type="number"
                  value={formData.roomSize}
                  onChange={(e) =>
                    setFormData({ ...formData, roomSize: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bedType">Bed Type</Label>
                <Input
                  id="bedType"
                  list="bedOptions"
                  value={formData.bedType}
                  onChange={(e) =>
                    setFormData({ ...formData, bedType: e.target.value })
                  }
                />
                <datalist id="bedOptions">
                  <option value="Single" />
                  <option value="Double" />
                  <option value="Queen" />
                  <option value="King" />
                </datalist>
              </div>

              <div className="space-y-2">
                <Label htmlFor="guests">Guests</Label>
                <Input
                  id="guests"
                  type="number"
                  value={formData.guests}
                  onChange={(e) =>
                    setFormData({ ...formData, guests: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pricePerNight">Price per Night (THB)</Label>
                <Input
                  id="pricePerNight"
                  type="number"
                  value={formData.pricePerNight}
                  onChange={(e) =>
                    setFormData({ ...formData, pricePerNight: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="promotionPrice">Promotion Price</Label>
                <Input
                  id="promotionPrice"
                  type="number"
                  value={formData.promotionPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, promotionPrice: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="roomDescription">Room Description</Label>
              <textarea
                id="roomDescription"
                value={formData.roomDescription}
                rows={4}
                className="textarea-class h-24 w-full rounded-md border border-gray-300 p-2"
                onChange={(e) =>
                  setFormData({ ...formData, roomDescription: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <hr />
              <p className="mt-4 font-inter text-lg font-semibold text-[#9AA1B9]">
                Room Image
              </p>
              <RoomImage formData={formData} setFormData={setFormData} />
            </div>

            <div>
              <hr />
              <p className="mt-4 font-inter text-lg font-semibold text-[#9AA1B9]">
                Room Amenities
              </p>

              <div className="mt-2">
                <CreateAmenities
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
            </div>
          </form>
          <div className="mx-auto mt-4 flex max-w-5xl justify-end space-y-8 rounded-lg">
            <button
              variant="destructive"
              onClick={handleDelete}
              className="px-2 py-4 font-openSans text-base font-semibold text-[#646D89]"
            >
              Delete Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
