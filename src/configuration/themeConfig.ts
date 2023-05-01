import { createTheme } from "@nextui-org/react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  adjustFontFallback: true,
  display: "optional",
  fallback: [
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    '"Noto Sans"',
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    '"Noto Color Emoji"',
  ],
  preload: true,
  style: "normal",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export type Theme = "dark" | "light";

export const buildTheme = (themeMode: Theme = "dark") => {
  return createTheme({
    type: themeMode,
    theme: {
      fonts: { sans: poppins.style.fontFamily },
    },
  });
};
