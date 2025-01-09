import Navbar from "@/component/navbar";
import { useState, useEffect } from "react";
import { X, Plus } from "lucide-react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    date_of_birth: "",
    country: "",
    profile_picture: null,
    profilePictureChanged: false, // ใช้สำหรับตรวจสอบว่าเปลี่ยนรูปหรือไม่
  });
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState([]);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/getUserProfile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userData = response.data;

      setFormData({
        ...formData,
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        phone_number: userData.phone_number || "",
        email: userData.email || "",
        date_of_birth: userData.date_of_birth || "",
        country: userData.country || "",
        profile_picture: userData.profile_picture_url || null, // ดึง URL รูปภาพจาก backend
      });
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error("Session expired. Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 3000); // Redirect after 3 seconds
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profile_picture: { preview: reader.result, file }, // ใช้ทั้ง preview และ file
          profilePictureChanged: true,
        }));
      };
      reader.onerror = () => {
        console.error("Error reading file");
        toast.error("Failed to load the selected file.");
      };
      reader.readAsDataURL(file);
    } else {
      console.warn("No file selected.");
    }
  };

  const handleProfilePictureRemove = () => {
    setFormData({
      ...formData,
      profile_picture: null, // รีเซ็ตเป็น null
      profilePictureChanged: true, // ตั้งค่าว่าเปลี่ยนแปลง
    });
  };

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

    let profilePictureData = null;
    if (formData.profilePictureChanged) {
      if (formData.profile_picture?.file) {
        try {
          profilePictureData = await toBase64(formData.profile_picture.file);
        } catch (error) {
          console.error("Error converting file to Base64:", error);
          toast.error("Failed to process profile picture.");
        }
      } else {
        console.error("No profile picture file provided.");
      }
    }

    const updatedData = {
      ...formData,
      profile_picture: profilePictureData, // ส่งรูปภาพที่อัปเดต
    };

    try {
      const token = localStorage.getItem("token");
      await axios.put("/api/updateUserProfile", updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsSubmitting(true);
      toast.success("Profile updated successfully!");
      setTimeout(() => {
        router.push("/");
      }, 3000); // Redirect after 3 seconds
    } catch (error) {
      console.error("Failed to update profile", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    // โหลดรายชื่อประเทศจาก API
    const fetchCountries = async () => {
      const response = await fetch("https://restcountries.com/v2/all");
      const data = await response.json();
      const sortedCountries = data
        .map((country) => ({
          name: country.name,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
      setCountry(sortedCountries);
    };
    fetchCountries();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="md:bg-[#F7F7FB]">
      <Navbar />
      <hr />
      <div className="mx-auto max-w-screen-xl rounded-md p-6">
        <div className="flex items-center justify-between">
          <h1 className="mb-6 font-notoSerif text-5xl font-medium text-green-700 md:text-7xl">
            Profile
          </h1>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="text-semibold mt-6 hidden w-1/5 rounded-sm bg-orange-600 px-6 py-3 font-openSans text-white hover:bg-orange-500 md:inline-block"
          >
            {isSubmitting ? "Updating..." : "Update Profile"}
          </button>
        </div>

        <h1 className="mb-6 font-inter text-xl font-semibold text-[#9AA1B9] md:my-10">
          Basic Information
        </h1>
        <form onSubmit={handleSubmit}>
          {/* First Name and Last Name */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-16">
            <div>
              <label className="mb-1 block font-inter text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
                className="w-full rounded-md border border-gray-300 p-2 pl-3"
              />
            </div>
            <div>
              <label className="mb-1 block font-inter text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
                className="w-full rounded-md border border-gray-300 p-2 pl-3"
              />
            </div>
          </div>

          {/* Phone and Email */}
          <div className="mt-2 grid grid-cols-1 gap-4 md:mt-8 md:grid-cols-2 md:gap-16">
            <div>
              <label className="mb-1 block font-inter text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={(e) =>
                  setFormData({ ...formData, phone_number: e.target.value })
                }
                className="w-full rounded-md border border-gray-300 p-2 pl-3"
              />
            </div>

            <div>
              <label className="mb-1 block font-inter text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full rounded-md border border-gray-300 p-2 pl-3"
              />
            </div>
          </div>

          {/* Date of Birth and Country */}
          <div className="grid grid-cols-1 gap-4 md:mt-8 md:grid-cols-2 md:gap-16">
            <div className="mt-4 md:mt-1">
              <label className="mb-1 block font-inter text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={(e) =>
                  setFormData({ ...formData, date_of_birth: e.target.value })
                }
                className="w-full rounded-md border border-gray-300 p-2 pl-3"
              />
            </div>

            <div className="md:mt-1">
              <label
                htmlFor="country"
                className="mb-1 block font-inter font-normal text-gray-900"
              >
                Country
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                className="block w-full rounded-[4px] border border-gray-300 pl-3 font-inter shadow-sm focus:border-black sm:text-sm"
                style={{
                  height: "44px",
                  fontSize: "16px",
                  fontWeight: 400,
                  borderRadius: "4px",
                  borderWidth: "1px",
                }}
              >
                <option value="" disabled>
                  Select your country
                </option>
                {country.map((country, index) => (
                  <option key={index} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <hr className="mt-10 rounded-md border md:mt-12" />

          {/* Profile Picture */}
          <div className="mt-8">
            <h1 className="mb-4 font-inter text-xl font-semibold text-[#9AA1B9] md:my-10">
              Profile Picture
            </h1>
            <div className="flex items-start">
              <div className="relative h-40 w-40 overflow-hidden rounded-md">
                {formData.profile_picture ? (
                  <>
                    <img
                      src={
                        typeof formData.profile_picture === "string"
                          ? formData.profile_picture // ใช้ URL จาก backend
                          : formData.profile_picture.preview // ใช้ preview จาก input
                      }
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-orange-500 shadow hover:bg-gray-100"
                      onClick={handleProfilePictureRemove}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  <label className="relative flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-gray-400 bg-gray-100 transition hover:bg-gray-200">
                    <Plus className="h-6 w-6 text-orange-500" />
                    <span className="mt-2 text-sm text-orange-500">
                      Upload photo
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfilePictureChange}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full rounded-md bg-orange-600 px-6 py-2 text-white hover:bg-orange-500 md:hidden"
          >
            {isSubmitting ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
