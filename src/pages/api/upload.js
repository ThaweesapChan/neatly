import supabase from "@/utils/supabaseClient";

export async function uploadFile(file) {
  const filePath = `picture/${Date.now()}_${file.name}`;

  // อัพโหลดไฟล์ไปที่ Supabase Storage
  const { data, error } = await supabase.storage
    .from("profile_picture")
    .upload(filePath, file);

  if (error) {
    console.error("Error uploading file:", error);
    return null;
  }
  // console.log("Upload Success:", data); 

   // 2) เรียก getPublicUrl() เพื่อดึง URL ของไฟล์ที่อัปโหลด
  const { data: urlData, error: urlError } = supabase.storage
    .from("profile_picture")
    .getPublicUrl(filePath);

  if (urlError) {
    console.error("Error generating public URL:", urlError);
    return null;
  }

  const publicURL = urlData.publicUrl;
  return publicURL;
}
