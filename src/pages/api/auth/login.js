import jwt from "jsonwebtoken";
import supabase from "@/utils/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  // ตรวจสอบว่า email และ password มีค่า
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // ตรวจสอบผู้ใช้ใน Supabase
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Supabase Error:", error.message);
    return res.status(401).json({ message: error.message });
  }

  // ตรวจสอบ JWT_SECRET
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  // สร้าง Access Token
  const token = jwt.sign(
    { id: data.user.id, email: data.user.email }, // Payload
    process.env.JWT_SECRET, // Secret Key
    { expiresIn: "15m" }, // อายุของ Access Token
  );

  // สร้าง Refresh Token
  const refreshToken = jwt.sign(
    { id: data.user.id }, // Payload
    process.env.JWT_SECRET,
    { expiresIn: "7d" }, // อายุของ Refresh Token
  );

  // ส่ง Token กลับไปหา Client
  res.status(200).json({ token, refreshToken });
}
