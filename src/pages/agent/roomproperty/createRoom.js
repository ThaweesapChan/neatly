import { useState } from "react";
import Sidebar from "@/component/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus} from "lucide-react";
import RoomUploadForm from "@/components/ui/createRoomImage";
import CreateAmenities from "@/components/ui/createAmenites";


export default function CreateRoom() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      roomNumber: formData.roomNumber || null,
      roomType: formData.roomType || "",
      roomSize: formData.roomSize || null,
      bedType: formData.bedType || "",
      guests: formData.guests || 0,
      pricePerNight: formData.pricePerNight || null,
      promotionPrice: formData.promotionPrice || null,
      roomDescription: formData.roomDescription || "",
      mainImage: formData.mainImage || null,
      imageGallery: formData.imageGallery || [],
      amenities: formData.amenities.join(",") || "",
    };

    try {
      const response = await fetch("/api/createRoom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 px-12 py-7">
        <div className="max-w-full">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Create New Room</h1>
            <div className="space-x-2">
              <Button
                variant="outline"
                className="border-[#E76B39] px-6 text-[#E76B39] hover:bg-orange-600 hover:text-white active:bg-[#C14817] active:text-white"
              >
                Cancel
              </Button>
              <Button
                className="bg-[#C14817] px-6 hover:bg-orange-600 hover:text-white active:bg-[#E76B39] active:text-[#C14817]"
                onClick={handleSubmit}
              >
                Create
              </Button>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <form
              onSubmit={handleSubmit}
              className="mx-auto max-w-5xl space-y-8 p-6"
            >
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
                    className="w-full"
                  />
                  <datalist id="bedOptions">
                    <option value="Single bed" />
                    <option value="Double bed" />
                    <option value="Queen bed" />
                    <option value="King bed" />
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
                      setFormData({
                        ...formData,
                        pricePerNight: e.target.value,
                      })
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
                      setFormData({
                        ...formData,
                        promotionPrice: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="roomDescription">Room Description</Label>
                <textarea
                  id="roomDescription"
                  value={formData.roomDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      roomDescription: e.target.value,
                    })
                  }
                  rows={4}
                  className="textarea-class h-24 w-full rounded-md border border-gray-300 p-2"
                />
              </div>

              <div className="space-y-2">
                <hr/>
                <p className="font-inter text-lg font-semibold text-[#9AA1B9] mt-4">
                  Room Image
                </p>
                <RoomUploadForm />
              </div>

              <div>
                <hr />
                <p className="mt-4 font-inter text-lg font-semibold text-[#9AA1B9]">
                  Room Amenities
                </p>

                <div className="mt-2">
                  <CreateAmenities />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
