import supabase from "@/utils/supabaseClient";

export default async function handler(req, res) {
  // Allow only POST requests for this endpoint
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  // ตรวจสอบว่า email และ password มีการส่งค่ามาหรือไม่
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // ตรวจสอบผู้ใช้ใน Supabase
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // จัดการข้อผิดพลาดในการยืนยันตัวตน
    if (error) {
      console.error("Supabase Error:", error.message);
      return res
        .status(401)
        .json({ message: "Invalid email or password. Please try again." }); // แจ้งว่าอีเมลหรือรหัสผ่านไม่ถูกต้อง
    }

    // ตรวจสอบว่ามี session ของผู้ใช้ส่งกลับมาหรือไม่
    if (!data.session) {
      return res.status(401).json({ message: "Authentication failed." }); // แจ้งว่าการยืนยันตัวตนล้มเหลว
    }

    // ดึงค่า access token และ refresh token จาก session
    const { access_token: token, refresh_token: refreshToken } = data.session;

    // ส่ง token กลับไปยัง client
    res.status(200).json({
      message: "Login successful", // แจ้งว่าล็อกอินสำเร็จ
      token,
      refreshToken,
    });
  } catch (err) {
    // จัดการข้อผิดพลาดที่ไม่คาดคิดจากฝั่งเซิร์ฟเวอร์
    console.error("Unexpected Error:", err.message);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
}
