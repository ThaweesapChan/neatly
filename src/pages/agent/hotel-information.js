import React, { useState } from "react";
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
      <div className="flex flex-row bg-yellow-400">
        <Sidebar />
        <div className="flex h-screen w-screen flex-col bg-gray-800">
          <NavHotelInformation
            hotel_name={hotelName}
            hotel_description={hotelDescription}
            hotelLogo={hotelLogo}
          />
          <div className="h-auto p-4 bg-green-500 m-14">
            <form className="space-y-4">
              <div>
                <label htmlFor="hotelName" className="block font-medium text-white">
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
                <label htmlFor="hotelDescription" className="block font-medium text-white">
                  Hotel Description*
                </label>
                <textarea
                  id="hotelDescription"
                  value={hotelDescription}
                  onChange={(e) => setHotelDescription(e.target.value)}
                  className="w-full rounded border p-2"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="flex flex-col items-start gap-6">
                <h1 className="font-inter text-xl font-semibold leading-6 text-gray-600">
                  Profile Picture
                </h1>

                <label
                  className={`w-[50%] cursor-pointer ${selectedImage ? "" : "bg-gray-600 bg-opacity-15"}`}
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
                        className="absolute right-2 top-2 rounded-full bg-white p-2 text-black"
                      >
                        &times;
                      </button>
                    </div>
                  ) : (
                    <div className="flex aspect-[3/2] h-full w-full flex-col items-center justify-center">
                      <div className="text-5xl text-orange-600">+</div>
                      <h1 className="text-orange-600">Upload photo</h1>
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