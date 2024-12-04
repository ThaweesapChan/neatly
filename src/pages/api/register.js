import supabase from "@/utils/supabaseClient";
import { connectionPool } from "@/utils/db";
import multer from "multer";
import { cloudinaryUpload } from "@/utils/upload";

export const config = {
  api: {
    bodyParser: false, // ปิด bodyParser เพื่อให้ multer จัดการ request body เอง
  },
}

export default async function handler(req, res) {
  // ตั้งค่า multer สำหรับการอัปโหลดไฟล์
  const multerUpload = multer({ dest: "public/files" });

    try {
      // Insert ข้อมูลลงในตาราง users
      const { data, error } = await supabase.auth.signUp(newUsers);
      //await supabase.from("users").insert([newUsers]); // ใส่ข้อมูลที่ต้องการ
      //await supabase.auth.signUp(newUsers)
      if (error) {
        console.error("Error during sign up:", error);
        throw error;
      }
      if (!data || !data.user) {
        throw new Error("No user data returned from sign up");
      }
      //เอาไอดีที่ได้มาใส่ด้วย
      const supabaseId = data.user.id;

      const {
        username,
        role = "customer",
        profile_picture_url,
        first_name,
        last_name,
        country,
        date_of_birth,
        phone_number,
      } = newUsers;

      const query = `
      INSERT INTO users (user_id, username, role, profile_picture_url, first_name, last_name, country, date_of_birth, phone_number )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`;

      const values = [
        supabaseId,
        username,
        role,
        profile_picture_url,
        first_name,
        last_name,
        country,
        date_of_birth,
        phone_number,
      ];

      const result = await connectionPool.query(query, values);
      const user = result.rows[0];

      res.status(200).json({ success: true, data, user }); // ส่ง response กลับ
    } catch (error) {
      res.status(400).json({ success: false, message: error.message }); // ส่ง error response กลับ
    }
  } 

  // ใช้ multer เพื่อจัดการการอัปโหลด
  multerUpload.fields([{ name: "avatar", maxCount: 1 }])(
    req,
    res,
    async (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }

      try {
        // สร้าง user object จากข้อมูลใน req.body
        const newUser = req.body; // คุณต้องปรับตามโครงสร้างของข้อมูลใน request body

        // ลงทะเบียนผู้ใช้ใน Supabase
        const { data, error } = await supabase.auth.signUp(newUser);

        if (error) {
          throw error;
        }

        // อัปโหลดไฟล์ avatar ไปยัง Cloudinary
        const avatarUrl = await cloudinaryUpload(req.files["avatar"][0]);

        // อัปเดต URL ของ avatar ในฐานข้อมูล
        const { data: updatedData, error: updateError } = await supabase
          .from("users")
          .update({ avatar: avatarUrl })
          .eq("id", data.user.id);

        if (updateError) {
          throw updateError;
        }

        res.status(200).json({ success: true, data: updatedData });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
    },
  );
