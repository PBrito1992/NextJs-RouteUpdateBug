module.exports = {
  future: {
    purgeLayersByDefault: true,
    applyComplexClasses: true
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./routes/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}"
  ],
  safelist: {
    standard: ["outline-none"]
  },
  theme: {
    zIndex: {
      99: 999,
      999: 999,
      9999: 9999
    },
    extend: {
      scale: {
        "-1": "-1"
      },
      rotate: {
        150: "150deg"
      },
      backgroundImage: {
        "hero-image": "url('/img/hero-image.png')"
      },
      fontSize: {
        xsm: ".75rem",
        15: "0.9rem",
        13: "0.8rem",
        10: "0.65rem",
        "2xs": ".55rem"
      },
      colors: {
        brand: {
          DEFAULT: "#0092DB",
          black: "#0A1D28",
          gray: "#585858",
          green: "#43BCAC",
          light: "#E2EFF8",
          lightest: "#E5F4FB",
          orange: "#FF9F2D",
          "white-transparent": "rgba(255,255,255,0.5)",
          "gray-transparent": "rgba(34, 34, 34, 0.7)",
          "gray-dark": "var(--gray-dark)",
          "gray-light": "#D9E7F2",
          "gray-light-2": "#ECEEF4",
          "gray-lightest": "#EFF1F6",
          "small-text-gray": "#7D839B",
          "blue-transparent": "rgba(0, 100, 188, 0.6)",
          "blue-bg": "#EEF8FC",
          "blue-dark": "#0064BC",
          "blue-bg-light": "#EAF7FA",
          "blue-bg-light-2": "#CAEAF6",
          "blue-bg-light-3": "#ECF8FD",

          "transparent-01": "rgba(0, 146, 219, 0.1)",
          "transparent-05": "rgba(18, 22, 64, 0.5)",
          "transparent-08": "rgba(18, 22, 64, 0.8)",
          "blue-light": "var(--blue-light)",
          "blue-light-2": "#FAFAFA",
          background: "#F0F9FE",
          "hover-blue": "#0074AD",
          "hover-btn-secondary": "#DAF0F9",
          "active-blue": "#0092DB",
          notification: "#F66F22",
          "reply-bg": "#F7F7F7",

          "validation-bg": "rgba(150, 222, 116, 0.15)",
          "validation-text": "#41BC4D",
          "todo-bg": "rgba(55, 161, 176, 0.1)",
          "todo-text": "#37A1B0",
          "planning-bg": "rgba(245, 143, 0, 0.1)",
          "planning-text": "#F58F00",

          "purple-bg": "rgba(69, 93, 238, 0.1)",
          "purple-text": "rgba(69, 93, 238, 1)",
          "bordeaux-bg": "rgba(131, 33, 97, 0.1)",
          "bordeaux-text": "rgba(131, 33, 97, 1)",
          "beige-bg": "#F7F6F2",
          "beige-light": "#FBFBF8",
          "notification-bar": "#FEF1E5",

          "green-bg": "#E3F5E5",
          "green-text": "#3BAB46",
          "green-text-dark": "#07A78D",
          "yellow-bg": "#F7EAC9",
          "yellow-text": "#E6A500",
          "yellow-bg-light": "rgba(255, 160, 17, 0.1)",
          "red-bg": "#FCCFB5",
          "red-text": "#F66F22",
          significant: "#E8FBF7",

          sidebar: {
            surface: "#353D4C",
            "text-gray": "#B5BBBE",
            separator: "#34434C",
            // "bg-item-hover": "#082F43",
            "bg-item-hover": "#546078",
            // "bg-item-selected": "#07405E",
            "bg-item-selected": "#505C72"
          }
        },
        workplace: {
          surface: "#29303D",
          "surface-light": "#3F485A",
          "surface-hover": "#546078",
          "surface-darker": "#02040B",
          "surface-current": "#586AEA",
          "border-tooltip": "#414C61"
        }
      },
      backgroundImage: {
        "blue-gradient":
          "linear-gradient(90.02deg, #2F78A5, 20.81%, #6EBFC6 78.21%)"
      },
      boxShadow: {
        DEFAULT: "0px 6px 20px rgba(0, 0, 0, 0.04)",
        negative: "0px -6px 20px rgba(0, 0, 0, 0.04)",
        large: "0px 4px 30px rgba(67, 68, 78, 0.06)",
        xl: "0px 15px 30px rgba(82, 82, 82, 0.05)",
        "2xl": "0px 4px 30px rgba(67, 68, 78, 0.06)",
        "3xl": "0px 20px 60px rgba(0, 0, 0, 0.08)",
        inset: "inset 2px 0px 16px rgba(121, 121, 121, 0.14)"
      },
      fontFamily: {
        main: "Inter, sans-serif"
      },
      width: {
        "20vw": "20vw",
        300: "300px"
      },
      minWidth: {
        7: "1.75rem",
        36: "36px",
        40: "40px",
        60: "60px",
        70: "70px",
        100: "100px",
        120: "120px",
        140: "146px",
        200: "200px",
        250: "250px",
        275: "275px"
      },
      maxWidth: {
        80: "80px",
        110: "110px",
        150: "150px",
        175: "175px",
        200: "200px",
        250: "250px",
        300: "300px",
        360: "360px",
        500: "520px"
      },
      height: {
        "90vh": "90vh",
        150: "150px",
        300: "320px",
        400: "420px",
        500: "520px",
        "screen-minus-fixed-bars-sm": "calc(100vh - 64px)",
        "screen-minus-fixed-bars-md": "calc(100vh - 240px)",
        "screen-minus-fixed-bars-lg": "calc(100vh - 278px)",
        "compose-message-body-height": "calc(100% - 92px)"
      },
      minHeight: {
        40: "40px",
        100: "100px",
        150: "150px",
        200: "200px",
        250: "250px",
        400: "400px",
        "screen-minus-fixed-bars-smd": "calc(100vh - 180px)"
      },
      maxHeight: {
        80: "80px",
        500: "520px",
        "90vh": "90vh",
        "screen-minus-search-and-tabs": "calc(100vh - 214px)",
        "screen-minus-fixed-bars": "calc(100vh - 64px)",
        "full-height-minus-footer": "calc(100% - 300px)",
        "full-height-minus-footer-lg": "calc(100% - 170px)"
      },
      inset: {
        34: "8.5rem"
      }
    }
  },
  plugins: [require("tailwindcss-rtl")]
};
