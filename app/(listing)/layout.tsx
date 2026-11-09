"use client";

import MainFooter from "@/components/footer";
import { Box } from "@mui/material";

// Companies/jobs listing pages: full-width banners, footer pinned to the
// bottom of the viewport (below the 90px header).
const ListingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 90px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ flex: 1 }}>{children}</Box>
      <MainFooter />
    </Box>
  );
};
export default ListingLayout;
