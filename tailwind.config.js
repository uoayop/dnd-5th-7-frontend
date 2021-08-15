/* eslint-disable prettier/prettier */
/** @format */
const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./public/index.html", "./src/**/*.{vue,js,jsx,ts,tsx}"], // 사용되지 않는 클래스 제거
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      bold: ["Pretendard-Bold"],
      medium: ["Pretendard-Medium"],
      semibold: ["Pretendard-SemiBold", "Pretendard-bold"],
      regular: ["Pretendard-Regular"],
      ExtraBold: ["Pretendard-ExtraBold", "Pretendard-Bold"],
    },
    fontSize: {
      "4xl": [
        "36px",
        {
          letterSpacing: " -0.02em",
          lineHeight: "44px",
        },
      ],
      22: ["22px"],
      18: ["18px"],
      16: ["16px"],
      14: [
        "14px",
        {
          lineHeight: "20px",
        },
      ],
      13: [
        "13px",
        {
          lineHeight: "18px",
        },
      ],
      12: [
        "12px",
        {
          lineHeight: "14.4px",
        },
      ],
    },
    screens: {
      md: "607px",
    },
    colors: {
      gray500: "#2D2D2D",
      gray400: "#6c6c6c",
      gray300: "#949494",
      gray200: "#d2d2d2",
      gray100: "#eaeaea",
      gray: "#c4c4c4",
      grayscale: "#9F9F9F",
      orange: "#fa7449",
      yellow: " #FFD74A",
      green: "#71D76F",
      blue: "#5E72FF",
      pink: "#F0A7E7",
      yellow_deep: "#AC9648",
      black: "#000000",
      black_dim: "rgba(0, 0, 0, 0.6)",
      bg: "#f9f9f9",
      white: colors.white,
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      blackdim: "rgba(0, 0, 0, 0.6)",
    }),
    textColor: (theme) => ({
      ...theme("colors"),
    }),
    borderColor: (theme) => ({
      ...theme("colors"),
    }),
    boxShadow: {
      custom: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      layout: "0px 2px 5px rgba(0, 0, 0, 0.2)",
    },
    extend: {
      spacing: {
        504: "504px",
        396: "396px",
        360: "360px",
        352: "352px",
        320: "320px",
        300: "300px",
        280: "280px",
        256: "256px",
        240: "240px",
        218: "218px",
        208: "208px",
        200: "200px",
        154: "154px",
        152: "152px",
        140: "140px",
        122: "122px",
        120: "122px",
        88: "88px",
        84: "84px",
        800: "80px",
        76: "76px",
        80: "80px",
        6.4: "64px",
        52: "52px",
        56: "56px",
        3.6: "36px",
        28: "28px",
        25: "25px",
        20: "20px",
        16: "16px",
        1.4: "14px",
        1.2: "12px",
        1.1: "11px",
        10: "10px",
        0.9: "9px",
        0.8: "8px",
        0.7: "7px",
        0.6: "6px",
        0.4: "4px",
        0.3: "3px",
      },
    },
  },
  variants: {},
  plugins: [],
};
