"use client";

import MainFooter from "@/components/footer";
import { Box, Container } from "@mui/material";


const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box>
      <Container>{children}</Container>
      <MainFooter />
    </Box>
  );
};
export default MainLayout;
