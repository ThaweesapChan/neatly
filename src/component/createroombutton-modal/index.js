import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Button } from "@/components/ui/button";

const CreateRoomWithModal = ({ formData, resetFormData }) => {
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCreating(true);
    setError(null);

    try {
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
            const base64 = await toBase64(file);
            return base64;
          }),
        );
      };

      // แปลง mainImage เป็น base64 ถ้ามี
      const mainImageData = formData.mainImage
        ? await toBase64(formData.mainImage)
        : null;

      // แปลง imageGallery เป็น base64 ถ้ามี
      const imageGalleryData =
        formData.imageGallery.length > 0
          ? await convertToBase64(formData.imageGallery)
          : [];

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

      const response = await axios.post("/api/createRoom", data);
      resetFormData();
      setShowSuccessModal(true);

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/agent/roomproperty/roomproperty");
      }, 2000);
    } catch (error) {
      console.error("Error creating room:", error);
      setError(error.response?.data?.message || "Failed to create room");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <>
      <Button
        className="border-[#C14817] bg-[#C14817] px-6 text-white hover:border-2 hover:border-[#C14817] hover:bg-[#C14817]"
        onClick={handleSubmit}
        disabled={isCreating}
      >
        {isCreating ? "Creating..." : "Create"}
      </Button>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50" />
          <div className="relative z-50 w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-4 text-center">
              <div className="mb-4 flex justify-center">
                <svg
                  className="h-16 w-16 text-green-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="mb-2 text-2xl font-semibold text-gray-900">
                Room Created Successfully
              </h2>
              <p className="text-gray-600">
                Your room has been created. Redirecting to room list...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {error && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setError(null)}
          />
          <div className="relative z-50 w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
            <button
              className="absolute right-4 top-4 text-gray-600 hover:text-gray-800"
              onClick={() => setError(null)}
            >
              ✕
            </button>
            <div className="mb-4 text-center">
              <div className="mb-4 flex justify-center">
                <svg
                  className="h-16 w-16 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h2 className="mb-2 text-2xl font-semibold text-gray-900">
                Error
              </h2>
              <p className="text-gray-600">{error}</p>
            </div>
            <div className="mt-6 flex justify-center">
              <button
                className="rounded bg-[#C14817] px-4 py-2 font-openSans text-base font-medium text-white hover:border-2 hover:border-[#C14817]"
                onClick={() => setError(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateRoomWithModal;
