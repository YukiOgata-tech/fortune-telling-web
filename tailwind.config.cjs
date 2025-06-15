/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // 必要に応じてプローズのスタイルを上書きできます
      typography: {
        DEFAULT: {
          css: {
            // 例えば、h2 の文字色をカスタムにしたい場合など
            "h2": {
              color: "#E5E7EB", // text-gray-200
            },
            "a": {
              color: "#60A5FA", // text-blue-400
            },
          },
        },
        invert: {
          css: {
            // prose-invert 用のオーバーライド例
            "color": "#F3F4F6",      // text-gray-100 全体を明るく
            "a": {
              color: "#93C5FD",      // text-blue-300 リンクを淡く
            },
            "blockquote": {
              borderLeftColor: "#4B5563", // text-gray-600
            },
            // ...必要に応じて追加
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
