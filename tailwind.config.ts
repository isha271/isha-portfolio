import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}","./components/**/*.{js,ts,jsx,tsx,mdx}","./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: {
    fontFamily: { display:["'Bebas Neue'","cursive"], body:["'DM Sans'","system-ui","sans-serif"], mono:["'IBM Plex Mono'","monospace"] },
    colors: { ink:"#0a0a0b",paper:"#f4f1eb",crimson:"#c0392b",gold:"#d4a017",slate:"#1c1c1e",mist:"#8a8a9a",wire:"#2a2a2e" },
    animation: { marquee:"marquee 30s linear infinite", float:"float 5s ease-in-out infinite", "fade-up":"fadeUp 0.8s ease forwards" },
    keyframes: {
      marquee:{"0%":{transform:"translateX(0)"},"100%":{transform:"translateX(-50%)"}},
      float:{"0%,100%":{transform:"translateY(0)"},"50%":{transform:"translateY(-10px)"}},
      fadeUp:{"0%":{opacity:"0",transform:"translateY(30px)"},"100%":{opacity:"1",transform:"translateY(0)"}}
    }
  }},
  plugins: [],
};
export default config;
