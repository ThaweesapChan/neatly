/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https", // โปรโตคอลของ URL
        hostname: "example.com", // โฮสต์ของ URL
        port: "", // กำหนดพอร์ต (ถ้ามี) หรือปล่อยว่างไว้
        pathname: "/images/**", // กำหนดเส้นทางที่อนุญาต (ใช้ ** เป็น wildcard)
      },
    ],
  },
};

export default nextConfig;
