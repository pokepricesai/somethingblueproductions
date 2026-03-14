import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core brand palette
        "indigo-dye":     "#1B3A5C",
        "indigo-light":   "#2A5280",
        "indigo-muted":   "#3D6080",
        "baby-blue":      "#A8CAEC",
        "baby-blue-dark": "#7AAED8",
        "burnt-sienna":   "#C8572A",
        "sienna-light":   "#D4704A",
        "midnight-ocean": "#0D1B2A",
        "dutch-white":    "#E8DDB5",
        eggshell:         "#F5F0E8",
        cream:            "#FAF8F2",
        stone:            "#DDD5C0",
        taupe:            "#9E9282",
        charcoal:         "#2C2820",
        "soft-black":     "#1A1410",
      },
      fontFamily: {
        display: ["Stay Humble", "cursive"],
        heading: ["Carose", "system-ui", "sans-serif"],
        body:    ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.68rem", { lineHeight: "1.4", letterSpacing: "0.22em" }],
        xs:    ["0.8rem",  { lineHeight: "1.5" }],
        sm:    ["0.875rem",{ lineHeight: "1.6" }],
        base:  ["1rem",    { lineHeight: "1.7" }],
        lg:    ["1.15rem", { lineHeight: "1.6" }],
        xl:    ["1.4rem",  { lineHeight: "1.4" }],
        "2xl": ["1.75rem", { lineHeight: "1.3" }],
        "3xl": ["2.25rem", { lineHeight: "1.2" }],
        "4xl": ["3rem",    { lineHeight: "1.1" }],
        "5xl": ["4rem",    { lineHeight: "1.05" }],
        "6xl": ["5.5rem",  { lineHeight: "1" }],
      },
      letterSpacing: {
        tight:   "-0.01em",
        normal:  "0em",
        wide:    "0.08em",
        wider:   "0.15em",
        widest:  "0.22em",
        ultra:   "0.3em",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
        "section": "clamp(4rem, 8vw, 7rem)",
      },
      maxWidth: {
        narrow:  "860px",
        content: "1100px",
        wide:    "1300px",
        full:    "1500px",
      },
      borderRadius: {
        none: "0px",
        sm:   "2px",
        md:   "4px",
        lg:   "8px",
      },
      boxShadow: {
        sm:  "0 1px 3px rgba(13, 27, 42, 0.08)",
        md:  "0 4px 16px rgba(13, 27, 42, 0.12)",
        lg:  "0 8px 32px rgba(13, 27, 42, 0.16)",
        xl:  "0 16px 64px rgba(13, 27, 42, 0.2)",
      },
      transitionTimingFunction: {
        "ease-out-smooth": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
      transitionDuration: {
        fast: "200ms",
        base: "300ms",
        slow: "600ms",
      },
      aspectRatio: {
        portrait:  "3/4",
        landscape: "4/3",
        wide:      "16/10",
        square:    "1/1",
        hero:      "16/9",
      },
    },
  },
  plugins: [],
};

export default config;
