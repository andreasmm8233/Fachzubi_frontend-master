"use client";

import { Box, Container, Stack } from "@mui/material";
import Link from "next/link";
import React from "react";

const FOOTER_LINKS = [
  { label: "Preise", href: "/preise" },
  { label: "Datenschutz", href: "/datenschutz-agb" },
  { label: "Impressum", href: "/impressum" },
  { label: "Kontakt", href: "/kontakt" },
];

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
            <Stack direction={"row"} spacing={1.5} flexWrap="wrap" useFlexGap>
              {FOOTER_LINKS.map((link, index) => (
                <React.Fragment key={link.href}>
                  {index > 0 && <Box component="span">|</Box>}
                  <Link href={link.href}>{link.label}</Link>
                </React.Fragment>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
};
export default MainFooter;
