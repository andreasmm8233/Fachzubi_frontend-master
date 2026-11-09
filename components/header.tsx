"use client";

import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import Image from "next/image";
import IMAGES from "@/public/images";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { SVG } from "./icon";
import QrScanner from "./QrScanner";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
// const navItems = ["My Data", "Jobs", "Companies"];
const navItems = [
  { id: 1, name: "STARTSEITE", url: "/" },
  { id: 6, name: "Unternehmen", url: "/unternehmen" },
  { id: 7, name: "Jobs", url: "/stellen" },
  /* {
    id: 2,
    name: "Arbeitsplätze",
    url: "/jobs",
  },
  { id: 3, name: "Firmen", url: "/company-list" }, */
  { id: 4, name: "Datenschutz", url: "terms-and-conditions" },
  { id: 5, name: "Impressum", url: "/privacy-policy" },
];
const Header = (props: Props) => {
  const [hightLightPath, setHightLightPath] = useState("");
  const pathname = usePathname();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const router = useRouter();
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        variant="h6"
        component="div"
        sx={{
          my: 2,
          px: 2,
          cursor: "pointer",
          "& svg": {
            width: "272px",
            height: "36px",
          },
          "@media (max-width: 480px)": {
            "& svg": {
              width: "auto",
              height: "auto",
            },
          },
        }}
        onClick={() => {
          router.push("/");
        }}
      >
        <Image alt="UniBonus" src={IMAGES.Logo} width={176} height={60} />
      </Typography>

      <Divider />
      <List>
        {navItems.map((item) => {
          return (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                LinkComponent={Link}
                href={item.url}
                sx={{
                  color:
                    pathname === item.url
                      ? "#0096A4"
                      : pathname?.includes(`${item.url}`)
                        ? "#000"
                        : null,
                }}
              >
                <ListItemText
                  primary={item.name}
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: "16px",
                      fontWeight: "600",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
        {/* QR Scan button in mobile drawer */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={(e) => {
              e.stopPropagation();
              setQrOpen(true);
            }}
            sx={{ color: "#0096A4" }}
          >
            <QrCodeScannerIcon sx={{ mr: 1 }} />
            <ListItemText
              primary="QR scannen"
              sx={{
                "& .MuiTypography-root": {
                  fontSize: "16px",
                  fontWeight: "600",
                },
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  useEffect(() => {
    if (pathname.startsWith("/unternehmen")) {
      setHightLightPath("/unternehmen");
    } else if (pathname.startsWith("/stellen")) {
      setHightLightPath("/stellen");
    } else if (pathname.includes("/jobs")) {
      setHightLightPath("/jobs");
    } else if (pathname.includes("/company-list")) {
      setHightLightPath("/company-list");
    } else {
      setHightLightPath("/");
    }
  }, [pathname]);

  return (
    <>
      <AppBar
        elevation={0}
        component="nav"
        sx={{
          backgroundColor: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid #edf2f7",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          color: "#2d3748",
          "&.MuiPaper-root": { paddingRight: "0px !important" },
        }}
      >
        <Container>
          {/* 90px tall: the page content is offset by the same amount */}
          <Toolbar sx={{ padding: "0px !important", minHeight: "90px !important" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 1, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{ flexGrow: 1, display: "flex", alignItems: "center", cursor: "pointer" }}
              onClick={() => {
                router.push("/");
              }}
            >
              <Image alt="UniBonus" src={IMAGES.Logo} width={176} height={60} priority />
            </Box>
            <Stack
              direction={"row"}
              spacing={1}
              sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}
            >
              {navItems.map((item) => {
                if (item.name === "Datenschutz" || item.name === "Impressum") {
                  return null;
                }
                const active = item.url === hightLightPath;
                return (
                  <Button
                    LinkComponent={Link}
                    href={item.url}
                    key={item.id}
                    sx={{
                      textTransform: "none",
                      fontSize: "15px",
                      fontWeight: 600,
                      px: 2,
                      py: 0.75,
                      minWidth: 0,
                      borderRadius: "6px",
                      color: active ? "#0096A4" : "#4a5568",
                      backgroundColor: active ? "rgba(0,150,164,0.1)" : "transparent",
                      "&:hover": {
                        backgroundColor: "rgba(0,150,164,0.08)",
                        color: "#0096A4",
                      },
                    }}
                  >
                    {item.name}
                  </Button>
                );
              })}
              {/* QR Scan button - desktop */}
              <Tooltip title="QR-Code scannen">
                <Button
                  variant="contained"
                  disableElevation
                  onClick={() => setQrOpen(true)}
                  startIcon={<QrCodeScannerIcon sx={{ fontSize: "18px !important" }} />}
                  sx={{
                    textTransform: "none",
                    fontSize: "15px",
                    fontWeight: 600,
                    px: 2,
                    py: 0.75,
                    ml: "8px !important",
                    borderRadius: "6px",
                    "&.MuiButton-contained": {
                      backgroundColor: "#F1841D",
                      color: "#fff",
                      "&:hover": { backgroundColor: "#d9720f", color: "#fff" },
                    },
                  }}
                >
                  QR scannen
                </Button>
              </Tooltip>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      {/* QR Scanner Modal */}
      <QrScanner open={qrOpen} onClose={() => setQrOpen(false)} />
    </>
  );
};
export default Header;
