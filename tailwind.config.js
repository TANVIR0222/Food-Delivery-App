/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "360px",
        md: "410px",
        lg: "680px",
      },
      fontFamily: {
        // Inter
        "inter-light": ["InterLight"],
        "inter-regular": ["InterRegular"],
        "inter-medium": ["InterMedium"],
        "inter-semibold": ["InterSemiBold"],
        "inter-bold": ["InterBold"],
        "inter-black": ["InterBlack"],

        // Edu
        "edu-regular": ["EduRegular"],
        "edu-medium": ["EduMedium"],
        "edu-semibold": ["EduSemiBold"],
        "edu-bold": ["EduBold"],
      },

      colors: {
        // Primary Colors
        primary: "#1C79BE",
        secondary: "#58C1F0",
        primary_bg: "#FEFEFE",

        // Base

        white: "#FFFFFF",
        black: "#000000",

        // Text Colors
        title: "#303030",
        description: "#505050",
        description2: "#757575",
        description3: "#404040",
        red: "#CA3535",

        // Neutral / Gray
        gray: "#ACACAC",
        stroke: "#EDF1F3",
        text_gray_header: "#6C7278",

        // (Optional fallback old naming kept clean)
        text_gray: "#757575",
        heading_black: "#303030",
        heading_black_top: "#373232",

        //border
        primary_border: "#A2A2A2",
        primary_black: "#000000",
      },
    },
  },
  plugins: [],
};
