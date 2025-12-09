import type { Config } from "tailwindcss";
export default {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "test-gradient": "linear-gradient(to right, red, blue)",
      },
    },
  },
  plugins: [],
}satisfies Config;