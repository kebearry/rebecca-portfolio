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
        primary: "#9e7a68", // Earthy Brown
        secondary: "#F8B7C4", // Soft Pink
        highlight: "#6FCF97", // Soft Green
        hotpink: "#FF69B4", //Hot Pink,
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
