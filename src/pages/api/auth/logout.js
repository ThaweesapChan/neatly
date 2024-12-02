import supabase from "@/utils/supabaseClient";

export default async function handler(req, res) {
  // Allow only POST requests for this endpoint
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Call Supabase is signOut method
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Supabase Logout Error:", error.message);
      return res
        .status(500)
        .json({ message: "Logout failed. Please try again." });
    }

    // Successful logout
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error("Unexpected Error:", err.message);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
}
