import React, { useState } from "react";
import Image from "next/image";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const RoomImage = () => {
  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);

  const handleMainImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      setMainImage(imageFile);
    }
  };

  const handleGalleryUpload = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      );
      setGalleryImages((prev) => [...prev, ...newFiles]);
    }
  };

  const removeGalleryImage = (index) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = "move";
    // Make the drag image transparent
    const dragImage = new window.Image();
    dragImage.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
    e.dataTransfer.setDragImage(dragImage, 0, 0);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedItem === null) return;

    const items = [...galleryImages];
    const draggedItemContent = items[draggedItem];

    // Remove draggedItem
    items.splice(draggedItem, 1);
    // Insert at new position
    items.splice(index, 0, draggedItemContent);

    setGalleryImages(items);
    setDraggedItem(index);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <div className="space-y-8 p-1 py-5">
      <div className="space-y-4">
        <Label className="block text-base">Main Image *</Label>
        <div className="grid gap-4 sm:grid-cols-4">
          {mainImage && (
            <div className="relative w-full pt-[70%]">
              <Image
                src={mainImage.preview}
                alt="Main Image"
                fill
                className="rounded-lg object-cover"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 text-orange-500 hover:bg-orange-50"
                onClick={() => setMainImage(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
          {!mainImage && (
            <label className="relative flex cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-[#F8F8F8] pt-[100%] transition-colors hover:bg-gray-50">
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Plus className="h-6 w-6 text-orange-500" />
                <span className="mt-2 text-sm text-orange-500">
                  Upload photo
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleMainImageUpload}
                />
              </div>
            </label>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <Label className="block text-base">
          Image Gallery (At least 4 pictures) *
        </Label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative w-full pt-[100%]"
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              style={{ cursor: "move" }}
            >
              <Image
                src={image.preview}
                alt={`Gallery image ${index + 1}`}
                fill
                className={`rounded-lg object-cover transition-opacity ${
                  draggedItem === index ? "opacity-50" : "opacity-100"
                }`}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 text-orange-500 hover:bg-orange-50"
                onClick={() => removeGalleryImage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {galleryImages.length < 8 && (
            <label className="relative flex cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-[#F8F8F8] pt-[100%] transition-colors hover:bg-gray-50">
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Plus className="h-6 w-6 text-orange-500" />
                <span className="mt-2 text-sm text-orange-500">
                  Upload photo
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryUpload}
                />
              </div>
            </label>
          )}
        </div>
        {galleryImages.length < 4 && (
          <p className="text-sm text-red-500">
            Please upload at least {4 - galleryImages.length} more images
          </p>
        )}
      </div>
    </div>
  );
};

export default RoomImage;
