import React, { useState, useEffect } from "react";
import Sidebar from "@/component/sidebar";
import NavHotelInformation from "@/components/room-information-nav";

function HotelInformationPage() {
  const [hotelName, setHotelName] = useState("");
  const [hotelDescription, setHotelDescription] = useState("");
  const [hotelLogo, setHotelLogo] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setHotelLogo(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    setSelectedImage(null);
    setHotelLogo(null);
  };

  return (
    <>
      <div className="flex flex-row">
        <Sidebar />

        <div className="flex h-screen w-screen flex-col bg-gray-100">
          <NavHotelInformation
            hotel_name={hotelName}
            hotel_description={hotelDescription}
            hotelLogo={hotelLogo}
          />
          <div className="m-14 h-auto rounded-lg border-2 px-10 py-8">
            <form className="space-y-4">
              <div>
                <label htmlFor="hotelName" className="block font-medium">
                  Hotel Name*
                </label>
                <input
                  type="text"
                  id="hotelName"
                  value={hotelName}
                  onChange={(e) => setHotelName(e.target.value)}
                  className="w-full rounded border p-2"
                  required
                />
              </div>

              <div>
                <label htmlFor="hotelDescription" className="block font-medium">
                  Hotel Description*
                </label>
                <textarea
                  id="hotelDescription"
                  value={hotelDescription}
                  onChange={(e) => setHotelDescription(e.target.value)}
                  className="w-full rounded border p-2"
                  rows="14"
                  required
                ></textarea>
              </div>

              <div className="flex flex-col items-start ">
                <label htmlFor="hotelName" className="block font-medium">
                  Hotel logo*
                </label>

                <label
                  className={`w-1/4 cursor-pointer ${
                    selectedImage ? "" : "border border-gray-300 bg-white"
                  }`}
                >
                  {selectedImage ? (
                    <div className="relative flex h-full w-full items-center justify-center">
                      <img
                        src={selectedImage}
                        alt="Selected Profile"
                        className="h-auto w-full rounded-md"
                      />
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="absolute right-2 top-2 rounded-full bg-white p-1 text-black"
                      >
                        &times;
                      </button>
                    </div>
                  ) : (
                    <div className="flex aspect-[3/2] h-full w-full flex-col items-center justify-center">
                      <div className="text-3xl text-orange-600">+</div>
                      <h1 className="text-sm text-orange-600">Upload photo</h1>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default HotelInformationPage;
