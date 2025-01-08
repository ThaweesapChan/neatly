import supabase from "@/utils/supabaseClient";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb", // กำหนดขนาดไฟล์ที่รองรับ
    },
  },
};

const fromBase64 = (base64Data) => {
  const [metadata, content] = base64Data.split(",");
  const buffer = Buffer.from(content, "base64");
  const mimeType = metadata.match(/:(.*?);/)[1]; // ดึง MIME type เช่น image/jpeg
  return { buffer, mimeType };
};

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Token is required" });
  }

  const { data: user, error: userError } = await supabase.auth.getUser(token);
  if (userError) {
    console.error("User Error:", userError);
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userId = user.user?.id;
  if (!userId) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  const {
    first_name,
    last_name,
    phone_number,
    date_of_birth,
    country,
    profile_picture, // รูปภาพใหม่ในรูปแบบ Base64
  } = req.body;

  try {
    if (profile_picture === null) {
      // 1. ดึงข้อมูลรูปภาพเก่าจาก Database
      const { data: oldData, error: oldDataError } = await supabase
        .from("users")
        .select("profile_picture_url")
        .eq("user_id", userId)
        .single();

      if (oldDataError) {
        console.error("Failed to retrieve old picture:", oldDataError);
        throw oldDataError;
      }

      const oldPictureURL = oldData.profile_picture_url;
      if (oldPictureURL) {
        // 2. ลบรูปภาพจาก Storage
        const oldPath = oldPictureURL.split(
          `/storage/v1/object/public/profile_images/`,
        )[1];
        if (oldPath) {
          const { error: removeError } = await supabase.storage
            .from("profile_images")
            .remove([oldPath]);

          if (removeError) {
            console.error("Failed to delete old profile picture:", removeError);
            throw removeError;
          }
        }
      }
    }

    // 3. อัปโหลดรูปภาพใหม่
    let profilePictureURL = null;
    if (profile_picture) {
      const { buffer, mimeType } = fromBase64(profile_picture);
      const fileName = `profile-${Date.now()}.jpg`;
      const filePath = `profile_images/${userId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("profile_images")
        .upload(filePath, buffer, { contentType: mimeType });

      if (uploadError) {
        console.error("Upload Error:", uploadError);
        throw uploadError;
      }

      const { data: publicUrlData } = supabase.storage
        .from("profile_images")
        .getPublicUrl(filePath);

      profilePictureURL = publicUrlData?.publicUrl;
    }

    // 4. อัปเดตข้อมูลในฐานข้อมูล
    const updateData = {
      first_name,
      last_name,
      phone_number,
      date_of_birth,
      country,
      profile_picture_url: profile_picture === null ? null : profilePictureURL, // ลบค่า profile_picture_url ถ้า profile_picture เป็น null
    };

    const { data: updatedUser, error: dbError } = await supabase
      .from("users")
      .update(updateData)
      .eq("user_id", userId)
      .select();

    if (dbError) {
      console.error("Database Error:", dbError);
      throw dbError;
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
