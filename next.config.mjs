/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https", // โปรโตคอลที่ใช้งาน
        hostname: "tljwcwljvchdwzflopwn.supabase.co", // โฮสต์ของ Supabase
        pathname: "/storage/v1/object/public/**", // เส้นทางที่อนุญาต (ใช้ wildcard สำหรับ Supabase paths)
      },
    ],
  },
};

export default nextConfig;
