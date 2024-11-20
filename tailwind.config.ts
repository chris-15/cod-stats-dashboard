import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens:{
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        "secondary-bg": "#16181c",
        'gold': '#FFD033',
        'silver': '#C0C0C0',
        'bronze': '#CD853F',
        'bo6-theme': '#ff9900',
        'sidebar-active-mw3': '#b0ff34',
        'sidebar-active-bo6': '#ff9900',
        'sidebar-hover-mw3': '#b0ff34',
        'sidebar-hover-bo6': '#ff9900',
      },
    },
  },
  plugins: [],
};
export default config;
