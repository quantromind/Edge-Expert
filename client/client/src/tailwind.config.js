// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ['"Open Sans"', 'sans-serif'], // make Open Sans your default sans font
//       },
//     },
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", '"Open Sans"', "sans-serif"], // Inter as primary, Open Sans as fallback
        inter: ["Inter", "sans-serif"], // Specific Inter font family
        opensans: ['"Open Sans"', "sans-serif"], // Specific Open Sans font family
        display: ["Georgia", '"Times New Roman"', "Times", "serif"],
        serif: ["Georgia", '"Times New Roman"', "Times", "serif"],
      },
      fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },
      fontSize: {
        // Card title sizes - financesbazar.com style
        "card-title": ["1.25rem", { lineHeight: "1.3", fontWeight: "700" }],
        "card-subtitle": ["1rem", { lineHeight: "1.4", fontWeight: "600" }],
        "card-description": [
          "0.875rem",
          { lineHeight: "1.5", fontWeight: "400" },
        ],
        "card-link": ["0.875rem", { lineHeight: "1.4", fontWeight: "600" }],

        // Responsive headline sizes
        "display-lg": ["1.5rem", { lineHeight: "1.2" }],
        "display-md": ["1.25rem", { lineHeight: "1.3" }],
        "display-sm": ["1.125rem", { lineHeight: "1.4" }],
      },
      colors: {
        primary: "#2563eb",
        secondary: "#64748b",
        accent: "#dc2626",
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        destructive: "var(--destructive)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      spacing: {
        card: "320px",
        "card-sm": "280px",
      },
      borderRadius: {
        card: "12px",
        sm: "calc(var(--radius) - 4px)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
        xl: "calc(var(--radius) + 4px)",
      },
      boxShadow: {
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "card-hover":
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  plugins: [],
};
