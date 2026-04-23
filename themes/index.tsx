"use client";
import { useMemo } from "react";
import { ThemeOptions, createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "./typography";
import ComponentsOverrides from "./overrides";

interface ThemeCustomizationProps {
  children: React.ReactNode;
}

export default function ThemeCustomization({
  children,
}: ThemeCustomizationProps) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const themeTypography = Typography(` 'Poppins', sans-serif`);
  const contrastText = "#fff";
  const themeOptions: ThemeOptions = useMemo(
    () => ({
      breakpoints: {
        values: {
          xs: 0,
          sm: 768,
          md: 1024,
          lg: 1266,
          xl: 1536,
        },
      },

      palette: {
        background: {
          default: "#ffffff",
        },
        // text: {
        //   primary: "#0096A4",
        // },
        primary: {
          main: "#F1841D",
          light: "#FDFBF4",
          gray: "#4B5563",
          darker: "#223C25",

          contrastText,
        },
        secondary: {
          main: "#A87B6F",
          light: "#E9CFC1",
          dark: "#B8BABE",
          contrastText,
        },
        info: {
          main: "#FDFBF4",
        },
      },

      typography: themeTypography,
    }),
    [themeTypography]
  );

  const themes = createTheme(themeOptions);
  themes.components = ComponentsOverrides();

  return <ThemeProvider theme={themes}>{children}</ThemeProvider>;
}
