/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: "hsl(var(--foreground))",
            maxWidth: "none",
            a: {
              color: "hsl(var(--primary))",
              "&:hover": {
                color: "hsl(var(--primary-600))",
              },
              textDecoration: "underline",
            },
            h1: {
              color: "hsl(var(--foreground))",
              fontWeight: "800",
              fontSize: "1.875rem",
              lineHeight: "2.25rem",
              marginTop: "1.5rem",
              marginBottom: "1.5rem",
            },
            h2: {
              color: "hsl(var(--foreground))",
              fontWeight: "700",
              fontSize: "1.5rem",
              lineHeight: "2rem",
              marginTop: "1.25rem",
              marginBottom: "1.25rem",
            },
            h3: {
              color: "hsl(var(--foreground))",
              fontWeight: "600",
              fontSize: "1.25rem",
              lineHeight: "1.75rem",
              marginTop: "1rem",
              marginBottom: "1rem",
            },
            h4: {
              color: "hsl(var(--foreground))",
              fontWeight: "600",
              marginTop: "0.75rem",
              marginBottom: "0.75rem",
            },
            p: {
              marginTop: "1rem",
              marginBottom: "1rem",
              fontSize: "1rem",
              lineHeight: "1.75rem",
            },
            li: {
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
              fontSize: "1rem",
            },
            ul: {
              marginTop: "1.25rem",
              marginBottom: "1.25rem",
            },
            ol: {
              marginTop: "1.25rem",
              marginBottom: "1.25rem",
            },
            blockquote: {
              fontStyle: "italic",
              color: "hsl(var(--foreground))",
              borderLeftColor: "hsl(var(--primary-200))",
            },
            code: {
              color: "hsl(var(--foreground))",
              backgroundColor: "hsl(var(--muted))",
              padding: "0.25rem 0.4rem",
              borderRadius: "0.25rem",
              fontWeight: "400",
              fontSize: "0.875rem",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            pre: {
              backgroundColor: "hsl(var(--muted))",
              borderRadius: "0.375rem",
              padding: "1rem",
              overflow: "auto",
              marginTop: "1.5rem",
              marginBottom: "1.5rem",
            },
            hr: {
              borderColor: "hsl(var(--border))",
              marginTop: "2rem",
              marginBottom: "2rem",
            },
            strong: {
              color: "hsl(var(--foreground))",
              fontWeight: "600",
            },
            img: {
              marginTop: "1.5rem",
              marginBottom: "1.5rem",
              borderRadius: "0.375rem",
            },
          },
        },
        dark: {
          css: {
            color: "hsl(var(--foreground))",
            a: {
              color: "hsl(var(--primary))",
            },
            blockquote: {
              color: "hsl(var(--foreground))",
            },
            pre: {
              backgroundColor: "hsl(var(--accent))",
              color: "hsl(var(--accent-foreground))",
            },
            code: {
              backgroundColor: "hsl(var(--muted))",
              color: "hsl(var(--foreground))",
            },
          },
        },
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "hsl(var(--primary-50))",
          100: "hsl(var(--primary-100))",
          200: "hsl(var(--primary-200))",
          300: "hsl(var(--primary-300))",
          400: "hsl(var(--primary-400))",
          500: "hsl(var(--primary-500))",
          600: "hsl(var(--primary-600))",
          700: "hsl(var(--primary-700))",
          800: "hsl(var(--primary-800))",
          900: "hsl(var(--primary-900))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      animation: {
        "gradient-x": "gradient-x 10s ease infinite",
        "gradient-y": "gradient-y 10s ease infinite",
        "gradient-xy": "gradient-xy 10s ease infinite",
        "pulse-x": "pulse-x 1.5s ease-in-out infinite",
      },
      keyframes: {
        "gradient-y": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "center top",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "center center",
          },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "gradient-xy": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "pulse-x": {
          "0%, 100%": {
            transform: "translateX(0)",
          },
          "50%": {
            transform: "translateX(3px)",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
