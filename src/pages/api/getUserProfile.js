import supabase from "@/utils/supabaseClient";

export default async function getUserProfile(req, res) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token not found. Please log in." });
    }

    // ดึงข้อมูล user จาก Supabase auth
    const { data: userData, error: authError } =
      await supabase.auth.getUser(token);

    if (authError || !userData?.user) {
      return res.status(401).json({ error: "Invalid or expired token." });
    }

    // ดึง user_id และ email จาก auth user
    const { id: userId, email } = userData.user;

    // ดึงข้อมูลเพิ่มเติมจากตาราง users
    const { data: userProfile, error: profileError } = await supabase
      .from("users")
      .select(
        "first_name, last_name, phone_number, date_of_birth, country, profile_picture_url",
      )
      .eq("user_id", userId)
      .single();

    if (profileError) {
      return res.status(404).json({ error: "User profile not found." });
    }

    const result = {
      email,
      ...userProfile,
    };

    return res.status(200).json(result);
  } catch (error) {
    console.error("API Error:", error.message);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}
