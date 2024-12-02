import supabase from "@/utils/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const newUsers = { ...req.body }; // รับข้อมูลจาก request body

    try {
      // Insert ข้อมูลลงในตาราง users
      const { data, error } = await supabase.auth.signUp(newUsers);
      //await supabase.from("users").insert([newUsers]); // ใส่ข้อมูลที่ต้องการ
     //await supabase.auth.signUp(newUsers)
      if (error) {
        throw error;
      }
//เอาไอดีที่ได้มาใส่ด้วย
      res.status(200).json({ success: true, data }); // ส่ง response กลับ
    } catch (error) {
      res.status(400).json({ success: false, message: error.message }); // ส่ง error response กลับ
    }
  } else {
    res.status(405).json({ message: "Method not allowed" }); // ถ้าไม่ใช่ POST
  }
}