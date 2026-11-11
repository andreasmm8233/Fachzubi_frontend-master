"use client";

import { Box, Container, Stack } from "@mui/material";
import Link from "next/link";

const MainFooter = () => {
  return (
    <>
      <Box sx={{ background: "#0096A4", py: 2.25 }}>
        <Container>
          <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={2}
            useFlexGap
            justifyContent={{ xs: "flex-start", lg: "space-between" }}
            sx={{ fontSize: "16px", fontWeight: 600, color: "#fff" }}
          >
            <Box>UniBonus | Alle Rechte vorbehalten.</Box>
            <Stack direction={"row"} spacing={2}>
              <Link href="/datenschutz-agb">Datenschutz</Link>
              <Link href="/impressum">Impressum</Link>
              <Link href="/preise">Preise</Link>
              <Link href="/kontakt">Kontakt</Link>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
};
export default MainFooter;
