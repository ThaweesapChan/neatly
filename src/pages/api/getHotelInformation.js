import supabase from "@/utils/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // ดึงข้อมูลจากตาราง hotel_information
    const { data, error } = await supabase
      .from("hotel_information")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error fetching hotel information:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    res.status(200).json({ data });
  } catch (error) {
    console.error("Error fetching hotel information:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}