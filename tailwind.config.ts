import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        text: "text 5s ease infinite",
      },
      keyframes: {
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
      colors: {
        // MAGICK COLORS

        // used for project/agent cards
        "card-main": "#262730",
        // sidebar background
        "sidebar-main": "#18181D",

        "secondary-light": "#BBFFFF",
        "secondary-main": "#26D5D6",
        "secondary-dark": "#1C374A",
        "btn-gradient":
          "linear-gradient(284.97deg, #99FFF9 8.09%, #1BC5EB 141.88%)",
        "secondary-gradient":
          "linear-gradient(90deg, #BBFFFF 0%, #26D5D6 100%)",

        "secondary-highlight": "#1BC5EB",

        "primary-darker": "#390F3F",
        "primary-dark": "#690A6D",
        // 'primary-main': '#1BC5EB',
        "primary-main": "#9D12A4", // old purple
        "primary-light": "#E586EA",
        "primary-lighter": "#FFEEFC",
        "primary-gradient": "linear-gradient(90deg, #FFFFFF 0%, #FFEEFC 100%)",

        "gray-white": "#FFFFFF",
        gray: "#454545",
        "gray-neutral": "#E6E6E6",
        "gray-base": "#3A3841",
        "gray-dark": "#25242F",
        "gray-darker": "#1C1C1C",
        "gray-darkest": "#060412",

        "main-lightest": "#8882AF",
        "main-lighter": "#615C81",
        "main-light": "#554C80",
        "main-primary": "#463E77",
        "main-dark": "#342E58",
        "main-darker": "#292445",
        // 'main-darkest': '#1E1E1E',
        "main-darkest": "#211E37",
        "main-gradient": "linear-gradient(90deg, #463E77 0%, #201D37 100%)",
        // "main-darkest": "#101112",
        "main-shark": "#262730",
        "light-blue": "#BADDE4",

        // THEME COLORS
        "th-s-light": "var(--th-s-light)",
        "th-s-main": "var(--th-s-main)",
        "th-s-dark": "var(--th-s-dark)",
        "th-s-gradient": "var(--th-s-gradient)",

        "th-p-darker": "var(--th-p-darker)",
        "th-p-dark": "var(--th-p-dark)",
        "th-p-main": "var(--th-p-main)",
        "th-p-light": "var(--th-p-light)",
        "th-p-lighter": "var(--th-p-lighter)",
        "th-p-gradient": "var(--th-p-gradient)",

        "th-g-white": "var(--th-g-white)",
        "th-g-neutral": "var(--th-g-neutral)",
        "th-g-base": "var(--th-g-base)",
        "th-g-dark": "var(--th-g-dark)",
        "th-g-darker": "var(--th-g-darker)",
        "th-g-darkest": "var(--th-g-darkest)",

        "th-m-lightest": "var(--th-m-lightest)",
        "th-m-lighter": "var(--th-m-lighter)",
        "th-m-light": "var(--th-m-light)",
        "th-m-primary": "var(--th-m-primary)",
        "th-m-dark": "var(--th-m-dark)",
        "th-m-darker": "var(--th-m-darker)",
        "th-m-darkest": "var(--th-m-darkest)",
        "th-m-gradient": "var(--th-m-gradient)",
      },
    },
  },
  plugins: [require("daisyui")],
} satisfies Config;
