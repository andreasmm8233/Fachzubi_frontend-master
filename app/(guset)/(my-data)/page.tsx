"use client";

import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { keyframes } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { getAllContents } from "@/app/api/content/landing.page";
import { getCity } from "@/app/api/cities/city";
import { TransformCity } from "@/app/api/cities/city.types";
import { useRouter } from "next/navigation";

const ORANGE = "#F1841D";
const TEAL = "#0096A4";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-14px); }
`;

// Soft blurred colour circle in the background (decoration only)
const blobSx = (color: string) => ({
  position: "absolute",
  borderRadius: "50%",
  background: color,
  filter: "blur(60px)",
  pointerEvents: "none",
  zIndex: 0,
});

const Home = () => {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [bottomBarText, setBottomBarText] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [searchSubtitle, setSearchSubtitle] = useState("");
  const [loading, setIsLoading] = useState(true);
  const [cities, setCities] = useState<TransformCity[]>([]);
  const [selectedCity, setSelectedCity] = useState<TransformCity | null>(null);
  const [cityError, setCityError] = useState(false);

  const router = useRouter();
  const handleSearch = () => {
    if (!selectedCity) {
      setCityError(true);
      return;
    }
    // Companies listing with this city preselected.
    router.push(`/unternehmen?city=${encodeURIComponent(selectedCity.id)}`);
  };

  const handleGetAllContent = async () => {
    setIsLoading(true);
    const response = await getAllContents();
    if (response.remote === "success") {
      setHeading(response.data.data.heading);
      setSubHeading(response.data.data.subHeading);
      setBottomBarText(response.data.data.bottomBarText);
      setSearchTitle(response.data.data.searchTitle ?? "");
      setSearchSubtitle(response.data.data.searchSubtitle ?? "");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const loadCities = async () => {
      const response = await getCity();
      if (response.remote === "success") {
        setCities(
          [...response.data.data].sort((a, b) =>
            a.name.localeCompare(b.name, "de", { sensitivity: "base" })
          )
        );
      }
    };
    loadCities();
  }, []);

  useEffect(() => {
    handleGetAllContent();
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        py: { xs: 5, md: 9, lg: 13 },
      }}
    >
      {/* Background decoration */}
      <Box sx={{ ...blobSx("rgba(0,150,164,0.22)"), width: { xs: 220, md: 380 }, height: { xs: 220, md: 380 }, top: "8%", right: 0 }} />
      <Box sx={{ ...blobSx("rgba(241,132,29,0.18)"), width: { xs: 180, md: 300 }, height: { xs: 180, md: 300 }, bottom: "6%", left: 0 }} />

      <Grid container spacing={{ xs: 5, lg: 8 }} alignItems="center" sx={{ position: "relative", zIndex: 1 }}>
        {/* Texts (managed in admin → Manage Content → Landing Page) */}
        <Grid item xs={12} lg={6}>
          <Box sx={{ animation: `${fadeUp} 0.7s ease-out both` }}>
            {(heading || !loading) && (
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2,
                  py: 0.75,
                  mb: 3,
                  borderRadius: "999px",
                  backgroundColor: "rgba(0,150,164,0.08)",
                  border: "1px solid rgba(0,150,164,0.18)",
                  color: TEAL,
                  fontSize: { xs: "10px", sm: "11px" },
                  fontWeight: 700,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  "& p": { m: 0 },
                }}
              >
                <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: ORANGE, flexShrink: 0 }} />
                {heading ? <div dangerouslySetInnerHTML={{ __html: heading }} /> : "Willkommen"}
              </Box>
            )}

            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontSize: { xs: "26px", sm: "34px", lg: "43px" },
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: "#1a202c",
                "& br": { display: "none" },
                "& p": { m: 0 },
              }}
            >
              {subHeading ? (
                <div dangerouslySetInnerHTML={{ __html: subHeading }} />
              ) : loading ? null : (
                <>
                  Finde deinen Traumjob mit{" "}
                  <Box component={"span"} sx={{ color: ORANGE }}>
                    Uni
                    <Box component={"span"} sx={{ color: TEAL }}>
                      Bonus
                    </Box>
                  </Box>
                </>
              )}
            </Typography>

            {/* Accent bar in the brand colours */}
            <Box
              sx={{
                width: 72,
                height: 5,
                borderRadius: "999px",
                background: `linear-gradient(90deg, ${ORANGE}, ${TEAL})`,
                my: { xs: 3, md: 3.5 },
              }}
            />

            <Typography
              component="div"
              sx={{
                fontSize: { xs: "13px", md: "15px" },
                lineHeight: 1.75,
                color: "#5a6475",
                fontWeight: 400,
                maxWidth: 580,
                "& p": { m: 0 },
              }}
            >
              {bottomBarText ? (
                <div dangerouslySetInnerHTML={{ __html: bottomBarText }} />
              ) : loading ? null : (
                <>
                  Tauchen Sie ein in eine Welt voller beruflicher Möglichkeiten
                  und spannender Karrierechancen. Entdecken Sie renommierte
                  Unternehmen aus Ihrer Region mit attraktiven Praktikums-,
                  Studien-, Fachkräftestellen und Ausbildungsangeboten. Los gent
                  s! 🚀
                </>
              )}
            </Typography>
          </Box>
        </Grid>

        {/* City search */}
        <Grid item xs={12} lg={6}>
          <Box
            sx={{
              position: "relative",
              maxWidth: 520,
              mx: "auto",
              animation: `${fadeUp} 0.7s ease-out 0.15s both`,
            }}
          >
            {/* Dotted pattern peeking out behind the card */}
            <Box
              sx={{
                position: "absolute",
                top: -24,
                right: -24,
                width: 140,
                height: 140,
                backgroundImage: `radial-gradient(${TEAL} 1.5px, transparent 1.5px)`,
                backgroundSize: "16px 16px",
                opacity: 0.25,
                display: { xs: "none", sm: "block" },
              }}
            />
            <Card
              elevation={0}
              sx={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "24px",
                backgroundColor: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(0,150,164,0.12)",
                boxShadow: "0 30px 60px -20px rgba(0,80,90,0.28)",
                // gradient strip on top
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 6,
                  background: `linear-gradient(90deg, ${TEAL}, ${ORANGE})`,
                },
              }}
            >
              <CardContent sx={{ p: { xs: 3, sm: 5 }, "&:last-child": { pb: { xs: 3, sm: 5 } } }}>
                <Stack direction={"column"} spacing={3.5}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        flexShrink: 0,
                        borderRadius: "16px",
                        background: `linear-gradient(135deg, ${TEAL} 0%, #005c66 100%)`,
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 10px 20px -6px rgba(0,150,164,0.55)",
                        animation: `${float} 4s ease-in-out infinite`,
                      }}
                    >
                      <LocationOnIcon sx={{ fontSize: "32px" }} />
                    </Box>
                    <Box>
                      <Typography
                        component="div"
                        sx={{ fontSize: { xs: "19px", sm: "22px" }, fontWeight: 700, color: "#1a202c", lineHeight: 1.3, "& p": { m: 0 } }}
                      >
                        {searchTitle ? (
                          <div dangerouslySetInnerHTML={{ __html: searchTitle }} />
                        ) : loading ? null : (
                          "Clever informieren in deiner UniStadt!"
                        )}
                      </Typography>
                      <Typography
                        component="div"
                        sx={{ fontSize: "14px", color: "#718096", mt: 0.5, "& p": { m: 0 } }}
                      >
                        {searchSubtitle ? (
                          <div dangerouslySetInnerHTML={{ __html: searchSubtitle }} />
                        ) : loading ? null : (
                          "Wähle deine Stadt und entdecke die Unternehmen dort."
                        )}
                      </Typography>
                    </Box>
                  </Stack>

                  <Autocomplete
                    options={cities}
                    value={selectedCity}
                    onChange={(_, city) => {
                      setSelectedCity(city);
                      setCityError(false);
                    }}
                    getOptionLabel={(city) => city.name}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    noOptionsText="Keine Stadt gefunden"
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Stadt auswählen (A–Z)"
                        error={cityError}
                        helperText={cityError ? "Bitte wähle eine Stadt aus" : ""}
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <>
                              <InputAdornment position="start">
                                <SearchIcon sx={{ color: TEAL }} />
                              </InputAdornment>
                              {params.InputProps.startAdornment}
                            </>
                          ),
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            minHeight: "58px",
                            fontSize: "16px",
                            borderRadius: "14px",
                            backgroundColor: "#f7fafc",
                            transition: "background-color 0.2s, box-shadow 0.2s",
                            "& fieldset": { borderColor: "#e2e8f0" },
                            "&:hover fieldset": { borderColor: TEAL },
                            "&.Mui-focused": {
                              backgroundColor: "#fff",
                              boxShadow: "0 0 0 4px rgba(0,150,164,0.12)",
                            },
                            "&.Mui-focused fieldset": { borderColor: TEAL, borderWidth: "1px" },
                          },
                        }}
                      />
                    )}
                  />

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleSearch}
                    endIcon={<ArrowForwardIcon sx={{ fontSize: "26px !important" }} />}
                    sx={{
                      // same selector as the theme override, so these win
                      "&.MuiButton-contained": {
                        minHeight: "58px",
                        fontSize: { xs: "17px", sm: "19px" },
                        fontWeight: 700,
                        letterSpacing: "1px",
                        borderRadius: "14px",
                        textTransform: "uppercase",
                        background: `linear-gradient(135deg, ${ORANGE} 0%, #e46f05 100%)`,
                        boxShadow: "0 12px 24px -8px rgba(241,132,29,0.6)",
                        transition: "transform 0.2s, box-shadow 0.2s",
                        "& .MuiButton-endIcon": { transition: "transform 0.2s" },
                        "&:hover": {
                          background: `linear-gradient(135deg, ${TEAL} 0%, #007a86 100%)`,
                          boxShadow: "0 14px 28px -8px rgba(0,150,164,0.6)",
                          transform: "translateY(-2px)",
                          "& .MuiButton-endIcon": { transform: "translateX(4px)" },
                        },
                      },
                    }}
                  >
                    Suche starten
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Home;
