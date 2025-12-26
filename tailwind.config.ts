import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0B0B0B", // Jet Black
          50: "#F5F5F5",
          100: "#E5E5E5",
          200: "#CCCCCC",
          300: "#B3B3B3",
          400: "#999999",
          500: "#808080",
          600: "#666666",
          700: "#4D4D4D",
          800: "#333333",
          900: "#1A1A1A",
          950: "#0B0B0B",
        },
        secondary: {
          DEFAULT: "#F8F8F8", // Off-White
          50: "#FFFFFF",
          100: "#FEFEFE",
          200: "#FDFDFD",
          300: "#FCFCFC",
          400: "#FAFAFA",
          500: "#F8F8F8",
          600: "#E5E5E5",
          700: "#CCCCCC",
          800: "#B3B3B3",
          900: "#999999",
        },
        accent: {
          DEFAULT: "#C9A24D", // Gold
          50: "#FDF8EF",
          100: "#F9EECE",
          200: "#F4DD9D",
          300: "#EFCB6C",
          400: "#E9BA3B",
          500: "#C9A24D",
          600: "#B08D3E",
          700: "#97782F",
          800: "#7E6420",
          900: "#654F11",
        },
        gray: {
          DEFAULT: "#6B6B6B", // Medium Gray
          50: "#F9F9F9",
          100: "#F0F0F0",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#6B6B6B",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#1A1A1A",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Outfit", "sans-serif"],
      },
      fontSize: {
        // Hero
        "hero-desktop": ["64px", { lineHeight: "1.1", fontWeight: "700" }],
        "hero-mobile": ["36px", { lineHeight: "1.2", fontWeight: "700" }],
        // Section Headings
        "section-desktop": ["48px", { lineHeight: "1.2", fontWeight: "600" }],
        "section-mobile": ["28px", { lineHeight: "1.3", fontWeight: "600" }],
        // Subsection
        "subsection-desktop": ["32px", { lineHeight: "1.3", fontWeight: "600" }],
        "subsection-mobile": ["24px", { lineHeight: "1.4", fontWeight: "600" }],
        // Card Title
        "card-desktop": ["24px", { lineHeight: "1.4", fontWeight: "500" }],
        "card-mobile": ["20px", { lineHeight: "1.4", fontWeight: "500" }],
        // Body
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-lg-mobile": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        body: ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-mobile": ["14px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "1.5", fontWeight: "400" }],
        "body-sm-mobile": ["12px", { lineHeight: "1.5", fontWeight: "400" }],
        // Button
        button: ["16px", { lineHeight: "1.5", fontWeight: "500" }],
        "button-mobile": ["14px", { lineHeight: "1.5", fontWeight: "500" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.25rem",
        "4xl": "1.5rem",
      },
      boxShadow: {
        card: "0 2px 8px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.06)",
        "card-hover": "0 4px 12px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.12)",
        luxury: "0 10px 40px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.06)",
      },
      transitionDuration: {
        "250": "250ms",
        "350": "350ms",
        "400": "400ms",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        shimmer: "shimmer 1.5s infinite",
        bounce: "bounce 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        bounce: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
      },
      screens: {
        xs: "475px",
        "3xl": "1920px",
      },
    },
  },
  plugins: [],
};

export default config;
