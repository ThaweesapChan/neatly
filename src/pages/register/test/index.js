import React, { useState } from "react";
import { uploadFile } from "@/pages/api/upload.js";

function UploadPage() {
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      const url = await uploadFile(file); // อัพโหลดไฟล์และรับ URL
      if (url) {
        setSelectedImage(url); // อัพเดทค่าของ imageURL
        console.log("File uploaded successfully, URL:", url); // ตรวจสอบลิงก์ที่ได้รับ
      } else {
        console.error("Failed to upload file.");
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {selectedImage && <img src={selectedImage} alt="Uploaded image" />}
    </div>
  );
}

export default UploadPage;
