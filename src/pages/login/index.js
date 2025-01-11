import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/router";
import supabase from "@/utils/supabaseClient";
import Navbar from "@/component/navbar";
import Link from "next/link";
import axios from "axios";

export default function LoginPage() {
  const { setIsLoggedIn } = useAuth();
  const router = useRouter();
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
      console.log("Login successful!");

      // ดึงข้อมูลมาเช็ค role
      const userResponse = await axios.get("/api/getUser", {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      const userData = userResponse.data.data;

      console.log("Login successful!");

      // อัพเดตสถานะของ customer ว่า login เข้ามาแล้ว
      setIsLoggedIn(true);

      // ทำการ redirect ตาม role
      if (userData.role === "agent") {
        router.push("/agent/customer-booking");
      } else {
        router.push("/");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false); // ยกเลิกสถานะโหลด..
    }
  }

  return (
    <div className="flex w-full flex-col">
      <Navbar />
      {/* รูปภาพ */}
      <div className="flex flex-col md:flex-row md:items-start md:gap-20 md:bg-[#F7F7FB]">
        <img
          src="/asset/login3chair_mobile.jpeg"
          className="h-fit w-full md:hidden" // รูปภาพสำหรับ Mobile
          alt="Login Illustration for Mobile"
        />
        <img
          src="/asset/login3chair.jpeg"
          className="md:full hidden md:block md:h-screen md:w-1/2" // รูปภาพสำหรับ Desktop
          alt="Login Illustration for Desktop"
        />

        {/* กลุ่มเนื้อหาหลังรูปภาพ */}
        <div className="md: flex flex-col gap-10 p-10 md:ml-16 md:mt-48 md:w-[452px] md:gap-10 md:p-0">
          <h1 className="h-14 w-80 font-notoSerif text-5xl font-medium text-green-800 md:text-7xl">
            Log In
          </h1>
          <div className="flex flex-col gap-10 md:mt-10">
            <div>
              <label
                htmlFor="usernameOrEmail"
                className="mb-1 block font-inter font-medium text-gray-900"
              >
                Username or Email
              </label>
              <input
                className="w-full rounded border border-gray-300 p-4 font-inter text-gray-900 placeholder-gray-400"
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
                className="mb-1 block font-inter font-medium text-gray-900"
              >
                Password
              </label>
              <input
                className="w-full rounded border border-gray-300 p-4 text-gray-900 placeholder-gray-400"
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
              Don&apos;t have an account yet?{" "}
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
    </div>
  );
}
