import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ThemeCustomization from "@/themes";
import Header from "@/components/header";
import { Box } from "@mui/material";

export const metadata: Metadata = {
  title: "UniBonus",
  description: "Clever informieren in deiner UniStadt!",
  openGraph: {
    title: "UniBonus",
    description: "Clever informieren in deiner UniStadt!",
    siteName: "UniBonus",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ThemeCustomization>
          <Header />
          <Box component={"main"} sx={{ paddingTop: "90px" }}>
            {children}
          </Box>
        </ThemeCustomization>
      </body>
    </html>
  );
}
