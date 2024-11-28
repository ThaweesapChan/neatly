import jwt from "jsonwebtoken";
import supabase from "@/utils/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  // ตรวจสอบว่าข้อมูลครบถ้วน
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // ใช้ Supabase ตรวจสอบข้อมูลผู้ใช้
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // สร้าง JWT Token
  const token = jwt.sign(
    { id: data.user.id, email: data.user.email }, // Payload
    process.env.JWT_SECRET, // Secret Key
    { expiresIn: "15m" }, // อายุของ Token
  );

  // ส่ง Token กลับไปหา Client
  res.status(200).json({ token });
}
