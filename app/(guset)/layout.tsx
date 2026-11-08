"use client";

import MainFooter from "@/components/footer";
import { Box, Container } from "@mui/material";


const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // Fill the viewport below the 90px header so the footer stays at the
    // bottom even when the page content is short.
    <Box
      sx={{
        minHeight: "calc(100vh - 90px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container sx={{ flex: 1 }}>{children}</Container>
      <MainFooter />
    </Box>
  );
};
export default MainLayout;
