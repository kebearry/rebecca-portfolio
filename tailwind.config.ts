import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        ripple: "rippleEffect 1s ease-out forwards",
      },
      keyframes: {
        rippleEffect: {
          "0%": {
            backgroundSize: "300% 300%",
            backgroundPosition: "center",
          },
          "100%": {
            backgroundSize: "0% 0%",
            backgroundPosition: "center",
          },
        },
      },
      colors: {
        primary: "#F5F0EB", // Light Beige/Off-White
        secondary: "#E8D5D1", // Soft Pink/Beige
        highlight: "#D4B5A0", // Warm Beige
        accent: "#8B6F47", // Dark Brown for text
        lightpink: "#F2E8E5", // Very Light Pink
        mutedpink: "#F9E4E7", //Muted Pink
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
