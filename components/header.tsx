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
  {
    id: 1,
    name: "Meine Daten",
    url: "/",
  },
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
        {/* <Image alt="" src={SVG.logo} width={272} height={36} /> */}
        <SVG.logo />
      </Typography>

      <Divider />
      <List>
        {navItems.map((item) => {
          return (
            <>
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
            </>
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
    if (pathname.includes("/jobs")) {
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
          background: "#FFF8F8",
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          color: "#000",
          padding: "15px 0px",
          "&.MuiPaper-root": { paddingRight: "0px !important" },
        }}
      >
        <Container>
          <Toolbar sx={{ padding: "0px !important" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
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
              {/* <Image alt="" src={SVG.logo} width={272} height={36} /> */}
              <SVG.logo />
            </Typography>
            <Stack
              direction={"row"}
              spacing={2}
              sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}
            >
              {navItems.map((item) => {
                if (item.name === "Datenschutz" || item.name === "Impressum") {
                  return;
                }
                return (
                  <>
                    <Button
                      LinkComponent={Link}
                      href={item.url}
                      key={item.id}
                      variant="outlined"
                      sx={{
                        "&.MuiButton-outlined": {
                          background:
                            item.url === hightLightPath ? "#0096A4" : null,
                          color: item.url === hightLightPath ? "#fff" : null,
                          "&:hover": {
                            color: "#0096A4",
                          },
                        },
                      }}
                    >
                      {item.name}
                    </Button>
                  </>
                );
              })}
              {/* QR Scan button - desktop */}
              <Tooltip title="QR-Code scannen">
                <Button
                  variant="outlined"
                  onClick={() => setQrOpen(true)}
                  startIcon={<QrCodeScannerIcon />}
                  sx={{
                    color: "#0096A4",
                    borderColor: "#0096A4",
                    textTransform: "none",
                    "&:hover": {
                      background: "#0096A4",
                      color: "#fff",
                      borderColor: "#0096A4",
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
