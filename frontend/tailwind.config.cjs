/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#050816",
        surface: "#0B1020",
        primary: "#2563eb",
        primaryForeground: "#f9fafb",
        accent: "#22c55e",
        danger: "#ef4444",
        warning: "#f97316",
        muted: "#6b7280",
        border: "#1f2933"
      },
      borderRadius: {
        sm: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        full: "9999px"
      }
    }
  },
  plugins: []
};
