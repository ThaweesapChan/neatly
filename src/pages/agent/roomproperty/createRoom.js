"use client";

import { useState } from "react";
import Sidebar from "@/component/sidebar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Upload } from "lucide-react";

export default function CreateRoom() {
  const [formData, setFormData] = useState({
    roomNumber: "",
    roomType: "",
    roomSize: "",
    bedType: "Double bed",
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
      <div className="flex-1 p-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Create New Room</h1>
            <div className="space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleSubmit}>Create</Button>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
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
                {/* <Textarea
                  id="roomDescription"
                  value={formData.roomDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, roomDescription: e.target.value })
                  }
                  rows={4}
                /> */}
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Main Image</Label>
                  <div className="mt-2 rounded-lg border-2 border-dashed border-gray-300 p-8">
                    <div className="flex flex-col items-center">
                      <Upload className="h-8 w-8 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">Upload Photo</p>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Image Gallery</Label>
                  <div className="mt-2 rounded-lg border-2 border-dashed border-gray-300 p-8">
                    <div className="flex flex-col items-center">
                      <Upload className="h-8 w-8 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">
                        Upload Photos
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label>Room Amenities</Label>
                <div className="mt-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      // Handle adding amenity
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Amenity
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
