/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 1.2s linear infinite',
      },
      // 必要に応じてプローズのスタイルを上書きできます
      typography: {
        DEFAULT: {
          css: {
            "h2": {
              color: "#E5E7EB",
            },
            "a": {
              color: "#60A5FA",
            },
          },
        },
        invert: {
          css: {
            "color": "#F3F4F6",      // text-gray-100 全体を明るく
            "a": {
              color: "#93C5FD",      // text-blue-300 リンクを淡く
            },
            "blockquote": {
              borderLeftColor: "#4B5563", // text-gray-600
            },
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
