"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Plus, Upload } from "lucide-react";
import Image from "next/image";
import Sidebar from "@/component/sidebar";

export default function RoomForm() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Superior Garden View</h1>
            <Button
              variant="default"
              className="bg-[#C1502E] hover:bg-[#A54427]"
            >
              Update
            </Button>
          </div>

          <Card className="space-y-8 p-6">
            <div>
              <h2 className="mb-4 text-lg font-semibold">Basic Information</h2>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label>Room Type *</Label>
                  <Input defaultValue="Superior Garden View" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Room Number *</Label>
                    <Input defaultValue="2J" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Bed Type *</Label>
                    <Input defaultValue="Double bed" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>GuestList *</Label>
                  <Input defaultValue="2" type="number" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Price per Night(THB) *</Label>
                    <Input defaultValue="2,450.00" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Promotion Price</Label>
                    <Input defaultValue="2,350.00" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Room Description *</Label>
                  {/* <Textarea defaultValue="Room (32sqm) with full garden view, 1 king bed, bedroom with bathtub & shower" /> */}
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-lg font-semibold">Room Images</h2>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label>Main Image *</Label>
                  <div className="rounded-lg border-2 border-dashed p-4">
                    <Image
                      src="/placeholder.svg"
                      alt="Main room image"
                      width={300}
                      height={200}
                      className="rounded-lg"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Image Gallery(at least 4 pictures) *</Label>
                  <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="group relative">
                        <Image
                          src="/placeholder.svg"
                          alt={`Gallery image ${i}`}
                          width={150}
                          height={100}
                          className="rounded-lg"
                        />
                        <button className="absolute right-2 top-2 rounded-full bg-white p-1 opacity-0 shadow transition-opacity group-hover:opacity-100">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="flex h-[100px] flex-col gap-1"
                    >
                      <Upload className="h-5 w-5" />
                      Upload Photo
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-lg font-semibold">Room Amenities</h2>
              <div className="space-y-4">
                {[
                  "Safe in Room",
                  "Air Conditioning",
                  "High speed internet connection",
                  "Pool view",
                  "Shower",
                ].map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center justify-between rounded border p-3"
                  >
                    <span>{amenity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:bg-red-50 hover:text-red-700"
                    >
                      Delete
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="flex w-full items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Amenity
                </Button>
              </div>
            </div>

            <div className="border-t pt-4">
              <Button
                variant="ghost"
                className="text-red-500 hover:bg-red-50 hover:text-red-700"
              >
                Delete Room
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
