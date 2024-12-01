import { useState } from "react";
import supabase from "@/utils/supabaseClient";
import Navbar from "@/component/navbar";
import Link from "next/link";

export default function LoginPage() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function validateUsernameOrEmail(input) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // ตรวจสอบว่าเป็น Email
    const usernamePattern = /^[a-zA-Z0-9_]+$/; // ตรวจสอบว่าเป็น Username

    if (emailPattern.test(input)) {
      return "email"; // Input เป็น Email
    } else if (usernamePattern.test(input)) {
      return "username"; // Input เป็น Username
    } else {
      return "invalid"; // Input ไม่ผ่านการตรวจสอบ
    }
  }

  // ฟังก์ชันจัดการเมื่อผู้ใช้กด Login
  async function handleLogin() {
    setError(""); // รีเซ็ตข้อผิดพลาดก่อนหน้า
    setLoading(true); // แสดงสถานะกำลังโหลด
    let email = ""; // เก็บค่า email

    // ตรวจสอบ Input ของผู้ใช้
    const userInputType = validateUsernameOrEmail(usernameOrEmail);

    if (userInputType === "invalid") {
      setError("Invalid username or email. Please try again.");
      setLoading(false);
      return;
    }

    try {
      if (userInputType === "username") {
        const username = usernameOrEmail;
        // ค้นหา Email จาก Username
        const { data, error } = await supabase
          .from("users")
          .select("email")
          .eq("username", username)
          .single();

        if (error || !data) {
          throw new Error("Username not found.");
        }

        email = data.email;
      } else {
        email = usernameOrEmail;
      }

      // ส่งคำขอไปที่ API เพื่อเข้าสู่ระบบ
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      // เก็บ JWT Token ไว้ใน Local Storage
      localStorage.setItem("token", data.token);
      alert("Login successful! Token saved to local storage.");
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false); // ยกเลิกสถานะโหลด
    }
  }

  return (
    <div className="flex flex-col">
      <Navbar />
      <img
        src="/asset/login3chair_mobile.jpeg"
        className="h-fit w-full"
        alt="Login Illustration"
      />

      {/* กลุ่มเนื้อหาหลังรูปภาพ */}
      <div className="flex flex-col gap-14 p-10">
        <h1 className="h-14 w-80 font-notoSerif text-5xl font-medium text-green-800">
          Log In
        </h1>
        <div className="flex flex-col gap-10">
          <div>
            <label
              htmlFor="usernameOrEmail"
              className="mb-1 block font-medium font-inter text-gray-900"
            >
              Username or Email
            </label>
            <input
              className="w-full rounded border border-gray-300 p-4 text-gray-400"
              id="usernameOrEmail"
              type="text"
              placeholder="Enter your username or email"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-1 block font-medium font-inter text-gray-900"
            >
              Password
            </label>
            <input
              className="w-full rounded border border-gray-300 p-4 text-gray-400"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="rounded bg-orange-600 p-4 font-openSans text-base font-semibold text-white"
            onClick={handleLogin}
            disabled={loading} // ปิดการใช้งานปุ่มเมื่อกำลังโหลด
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
          {/* ข้อความพร้อมลิงก์ไปยังหน้าลงทะเบียน */}
          <p className="-mt-4 font-inter text-base font-normal text-gray-700">
            Don't have an account yet?{" "}
            <Link
              href="/register"
              className="font-openSans text-base font-semibold text-orange-500 hover:underline"
            >
              Register
            </Link>
          </p>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </div>
  );
}
