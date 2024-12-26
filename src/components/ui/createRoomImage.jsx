import React, { useState } from "react";
import Image from "next/image";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const RoomImage = ({ formData, setFormData }) => {
  const [draggedItem, setDraggedItem] = useState(null);
  //fn to validate max file size
  const validateFileSize = (file) => {
    if (file.size > 1024 * 1024 * 1) {
      alert("File size should be less than 1MB");
      return false;
    }
    return true;
  };

  // fn to convert image to base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleMainImageUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!validateFileSize(file)) return;

      const imageFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
        image: await toBase64(file),
      });
      setFormData((prev) => ({
        ...prev,
        mainImage: imageFile,
      }));
    }
  };

  const handleGalleryUpload = async (e) => {
    if (e.target.files) {
      let newFiles = [];
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        if (!validateFileSize(file)) return;
        newFiles.push(
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            image: await toBase64(file),
          }),
        );
      }

      setFormData((prev) => ({
        ...prev,
        imageGallery: [...prev.imageGallery, ...newFiles],
      }));
    }
  };

  const removeGalleryImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      imageGallery: prev.imageGallery.filter((_, i) => i !== index),
    }));
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

    const items = [...formData.imageGallery];
    const draggedItemContent = items[draggedItem];

    // Remove draggedItem
    items.splice(draggedItem, 1);
    // Insert at new position
    items.splice(index, 0, draggedItemContent);

    setFormData((prev) => ({
      ...prev,
      imageGallery: items,
    }));

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
          {formData.mainImage && (
            <div className="relative w-full pt-[70%]">
              <Image
                src={formData.mainImage.preview}
                alt="Main Image"
                fill
                className="rounded-lg object-cover"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 text-orange-500 hover:bg-orange-50"
                onClick={() => setFormData({ ...formData, mainImage: null })}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
          {!formData.mainImage && (
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
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-5">
          {formData.imageGallery.map((image, index) => (
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
          {formData.imageGallery.length < 8 && (
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
        {formData.imageGallery.length < 4 && (
          <p className="text-sm text-red-500">
            Please upload at least {4 - formData.imageGallery.length} more
            images
          </p>
        )}
      </div>
    </div>
  );
};

export default RoomImage;
