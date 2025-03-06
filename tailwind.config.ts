import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#c3bdb8', // Main taupe color
          light: '#d1ccc8',   // Lighter taupe
          dark: '#a59e99',    // Darker taupe
        },
        secondary: {
          DEFAULT: '#f5f5f5', // Light gray
          light: '#ffffff',   // White
          dark: '#e0e0e0',    // Darker gray
        },
        background: '#FFFFFF', // White
        foreground: '#000000', // Black text
        accent: '#c3bdb8',    // Same as primary for consistency
        text: {
          primary: '#000000', // Black
          secondary: '#4a4a4a', // Dark gray
          light: '#767676',   // Light gray
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
