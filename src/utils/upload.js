import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

export const cloudinaryUpload = async (files) => {
  const fileUrl = [];

  for (let file of files.avatar) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "users_profile",
      type: "true",
    });
    fileUrl.push({
      url: result.secure_url,
      publicId: result.public_id,
    });
    await fs.unlink(file.path);
  }

  return fileUrl;
};


// import cloudinary from "cloudinary";
// // // ตั้งค่า Cloudinary//
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// }); // ฟังก์ชันการอัปโหลดไฟล์ไปที่ Cloudinary//
// export const cloudinaryUpload = async (files) => {
//   if (!files || !files.avatar) return null;
//   const avatar = files.avatar[0]; // ดึงไฟล์ avatar//
//   const result = await cloudinary.v2.uploader.upload(avatar.path, {
//     folder: "avatars", // ระบุ folder ที่จะเก็บไฟล์ใน Cloudinary
//     resource_type: "image",
//   });
//   return result.secure_url; // ส่งกลับ URL ของภาพที่อัปโหลด
// };
