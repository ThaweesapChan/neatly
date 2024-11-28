// pages/api/getUsers.js
import supabase from "@/utils/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { data, error } = await supabase.from("users").select("*");


    console.log("นี่คือ", data);
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}

