import supabase from "@/utils/supabaseClient";
import { connectionPool } from "@/utils/db";

export default async function handler(req, res) {
  const newUsers = req.body;

  try {
    // Insert ข้อมูลลงในตาราง users
    const { data, error } = await supabase.auth.signUp(newUsers);
    //await supabase.from("users").insert([newUsers]); // ใส่ข้อมูลที่ต้องการ
    if (error) {
      console.error("Error during sign up:", error);
      throw error;
    }
    if (!data || !data.user) {
      throw new Error("No user data returned from sign up");
    }
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
