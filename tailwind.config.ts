import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: [
    "./app/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [typography],
} satisfies Config;
