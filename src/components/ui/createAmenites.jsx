import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";

const CreateAmenities = () => {
  const [amenities, setAmenities] = useState([
    { id: 1, label: "Amenitiy *", value: "" },
  ]);

  const handleAddAmenity = () => {
    const newId = Math.max(...amenities.map((a) => a.id), 0) + 1;
    setAmenities([
      ...amenities,
      {
        id: newId,
        label: "Amenitiy",
        value: "",
      },
    ]);
  };

  const handleChange = (id, value) => {
    setAmenities(
      amenities.map((amenity) =>
        amenity.id === id ? { ...amenity, value } : amenity,
      ),
    );
  };

  const removeAmenity = (id) => {
    setAmenities(amenities.filter((amenity) => amenity.id !== id));
  };

  return (
    <div className="w-full max-w-2xl  space-y-4 mt-10">
      {amenities.map((amenity) => (
        <div key={amenity.id} className="space-y-2">
          <Label className="text-sm text-gray-600">{amenity.label}</Label>
          <div className="flex gap-2">
            <Input
              value={amenity.value}
              onChange={(e) => handleChange(amenity.id, e.target.value)}
              className="w-full"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={`px-2 hover:bg-transparent ${
                amenity.value.trim() === ""
                  ? "text-gray-400 hover:text-gray-600"
                  : "text-orange-500 hover:text-orange-600"
              }`}
              onClick={() => removeAmenity(amenity.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="border-orange-500 text-orange-500 hover:bg-orange-50 "
        onClick={handleAddAmenity}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Amenity
      </Button>
    </div>
  );
};

export default CreateAmenities;
