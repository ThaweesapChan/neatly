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

  console.log("Upload Success:", data); // ตรวจสอบข้อมูลที่ได้รับหลังอัพโหลด

  if (!data || !data.path) {
    console.error("No path returned from upload.");
    return null;
  }

  console.log("File path:", data.path); // ตรวจสอบ path ที่ได้จากการอัพโหลด

  // สร้าง Public URL ของไฟล์
  const { publicURL, error: urlError } = supabase.storage
    .from("profile_picture")
    .getPublicUrl(data.path);
  console.log("สร้าง Public URL ของไฟล์"); // ตรวจสอบ path ที่ได้จากการอัพโหลด

  // ตรวจสอบ URL ที่ได้
  if (urlError) {
    console.error("Error getting public URL:", urlError);
    return null;
  }
  console.log("สร้าง Public URL ของไฟล์"); // ตรวจสอบ path ที่ได้จากการอัพโหลด

  if (!publicURL) {
    console.error("Public URL is undefined.");
    return null;
  }
  console.log("สร้าง Public URL ของไฟล์"); // ตรวจสอบ path ที่ได้จากการอัพโหลด

  console.log("Public URL:", publicURL);

  // ตรวจสอบว่า publicURL ถูกต้องหรือไม่
  const testImage = new Image();
  testImage.src = publicURL;
  console.log("สร้าง Public URL ของไฟล์"); // ตรวจสอบ path ที่ได้จากการอัพโหลด

  testImage.onload = () => {
    console.log("Image is accessible at:", publicURL);
  };
  console.log("สร้าง Public URL ของไฟล์"); // ตรวจสอบ path ที่ได้จากการอัพโหลด

  testImage.onerror = () => {
    console.error("Error: Image is not accessible at the public URL.");
  };
  console.log("สร้าง Public URL ของไฟล์"); // ตรวจสอบ path ที่ได้จากการอัพโหลด

  return publicURL;
}
