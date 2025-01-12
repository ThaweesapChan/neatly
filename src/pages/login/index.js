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
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernamePattern = /^[a-zA-Z0-9_]+$/;
    if (emailPattern.test(input)) {
      return "email";
    } else if (usernamePattern.test(input)) {
      return "username";
    } else {
      return "invalid";
    }
  }

  async function handleLogin() {
    setError("");
    setLoading(true);
    let email = "";

    // ตรวจสอบ Input ของผู้ใช้
    const userInputType = validateUsernameOrEmail(usernameOrEmail);

    if (userInputType === "invalid") {
      setError("Invalid username or email. Please try again.");
      setLoading(false);
      return;
    }

    try {
      if (userInputType === "username") {
        const { data, error } = await supabase
          .from("users")
          .select("email")
          .eq("username", usernameOrEmail)
          .single();

        if (error || !data) {
          throw new Error("Username not found.");
        }

        email = data.email;
      } else {
        email = usernameOrEmail;
      }

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

      localStorage.setItem("token", data.token);

      const userResponse = await axios.get("/api/getUser", {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      const userData = userResponse.data.data;
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
    <div className="flex min-h-min flex-col">
      <Navbar />

      {/* Main Content Container */}
      <div className="flex flex-1 flex-col lg:flex-row lg:bg-[#F7F7FB]">
        {/* Image Section */}
        <div className="relative w-full md:h-[50vh] lg:h-screen lg:w-1/2">
          <img
            src="/asset/login3chair.jpeg"
            alt="Login Illustration"
            className="h-[375px] w-full object-cover object-[center_70%] md:h-full md:object-center"
          />
        </div>

        {/* Form Section */}
        <div className="flex-1 px-6 py-8 md:px-12 md:py-10 lg:flex lg:items-center lg:px-20 lg:py-0">
          <div className="w-full max-w-[452px] lg:mx-auto ">
            <h1 className="mb-10 font-notoSerif text-[40px] leading-[1.2] text-[#2F3337] md:text-[56px] lg:text-[72px] lg:leading-[87px]">
              Log In
            </h1>
            <div className="space-y-6 md:space-y-8">
              <div>
                <label className="mb-2 block font-medium text-[#2F3337] md:text-lg">
                  Username or Email
                </label>
                <input
                  type="text"
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  placeholder="Enter your username or email"
                  className="w-full rounded border border-[#D7D7D7] p-3 text-[#2F3337] placeholder:text-[#9AA1B9] md:text-lg"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-[#2F3337] md:text-lg">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded border border-[#D7D7D7] p-3 text-[#2F3337] placeholder:text-[#9AA1B9]  md:text-lg"
                />
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full rounded bg-[#C14817] p-3 font-semibold text-white  md:text-lg"
              >
                {loading ? "Logging in..." : "Log In"}
              </button>

              <p className="text-[#646D89] md:text-lg">
                Don&apos;t have an account yet?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-[#C14817] hover:underline"
                >
                  Register
                </Link>
              </p>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
