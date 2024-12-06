/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
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
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate") // เพิ่ม tailwindcss-animate plugin
  ],
};