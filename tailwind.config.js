/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // ระบุไฟล์ที่ Tailwind จะทำงานด้วย
  ],
  theme: {
    extend: {
      colors: {
        green: {
          100: "#E5EFEC",
          200: "#C1D9D2",
          300: "#9DC2B8",
          400: "#7AAC9F",
          500: "#568586",
          600: "#3D6C68",
          700: "#2E524F",
          800: "#1F3835",
          900: "#11201C",
        },
        orange: {
          100: "#FCE8DE",
          200: "#F9C9B7",
          300: "#F6AA90",
          400: "#F18B68",
          500: "#EC6B40",
          600: "#E24528",
          700: "#B83521",
          800: "#8E261B",
          900: "#641815",
        },
        gray: {
          800: "#3A3C57",
          900: "#1F213F",
        },
        utility: {
          white: "#FFFFFF",
          black: "#000000",
          red: "#E53E3E",
          bg: "#F9FAFB",
        },
      },
      fontFamily: {
        headline: ["Poppins", "sans-serif"],
        body: ["Roboto", "sans-serif"],
        openSans: ["Open Sans", "sans-serif"],
        notoSerif: ["Noto Serif", "serif"],
        inter: ["Inter", "sans-serif"],
        ibmPlexSansThai: ["IBM Plex Sans Thai", "sans-serif"],
      },
      boxShadow: {
        custom: "4px 4px 16px 0 rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};
