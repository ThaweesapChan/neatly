import React from "react";
import axios from "axios";

const LogoutPage = () => {
  const handleLogout = async () => {
    try {
      // เรียก API สำหรับ logout
      await axios.post("/api/auth/logout");

      // ลบข้อมูล token ออกจาก localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // เปลี่ยนเส้นทางไปยังหน้า Login
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout Error:", err.message);
      // ใช้งาน alert ในฝั่ง Client เท่านั้น
      if (typeof window !== "undefined") {
        alert("Failed to log out. Please try again.");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="rounded bg-white p-6 text-center shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Logout Page</h1>
        <p className="mb-6">Click the button below to log out.</p>
        <button
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default LogoutPage;
