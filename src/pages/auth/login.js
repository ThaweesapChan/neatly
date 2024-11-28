import { useState } from "react";
import supabase from "@/utils/supabaseClient";

export default function LoginPage() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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

  async function handleLogin() {
    setError(""); // รีเซ็ตข้อผิดพลาดก่อนหน้า
    let email = ""; // เก็บค่า email

    //validating user input for usernameOrEmail
    const userInputType = validateUsernameOrEmail(usernameOrEmail);

    if (userInputType === "invalid") {
      setError("Username or Email invalid");
      return;
    }

    if (userInputType === "username") {
      const username = usernameOrEmail;
      //get Email
      const { data, error } = await supabase
        .from("users")
        .select("email")
        .eq("username", username);

      if (error) {
        return res.status(500).json({ error: error.message });
      }
      email = data[0]["email"];
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
      setError(data.message || "Login failed");
      return;
    }

    // เก็บ JWT Token ไว้ใน Local Storage
    localStorage.setItem("token", data.token);
    alert("Login successful! Token saved to local storage.");
  }

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text" // เปลี่ยนจาก email เป็น text เพื่อรองรับ username
        placeholder="Username or Email"
        value={usernameOrEmail}
        onChange={(e) => setUsernameOrEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
