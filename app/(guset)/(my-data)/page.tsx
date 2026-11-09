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
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { getAllContents } from "@/app/api/content/landing.page";
import { getCity } from "@/app/api/cities/city";
import { TransformCity } from "@/app/api/cities/city.types";
import { useRouter } from "next/navigation";

const Home = () => {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [bottomBarText, setBottomBarText] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [searchSubtitle, setSearchSubtitle] = useState("");
  const [content, setContent] = useState("");
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
        padding: "106px 0px 166px",
        "@media (max-width:992px)": { padding: "30px 0px 25px" },
      }}
    >
      <Grid container spacing={{ xs: 4, lg: 6 }} alignItems="center">
        <Grid item xs={12} lg={6}>
          <>
            <Typography
              sx={{
                fontSize: "36px",
                color: "#4E4D4D",
                fontWeight: "600",
                mb: 2,

                "@media (max-width: 480px)": {
                  fontSize: "20px !important",
                },
              }}
            >
              {heading ? (
                <>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: heading ?? "",
                    }}
                  />
                </>
              ) : loading ? null : (
                "WILLKOMMEN"
              )}
            </Typography>
            <Typography
              variant="h2"
              sx={{
                "@media (max-width: 480px)": {
                  fontSize: "25px",
                },
              }}
            >
              {subHeading ? (
                <Box sx={{
                  "& br":{
                    display:"none"
                  }
                }}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: subHeading ?? "",
                    }}
                  />
                </Box>
              ) : loading ? null : (
                <>
                  Finde deinen Traumjob mit{" "}
                  <Box component={"span"} sx={{ color: "#F1841D" }}>
                    Uni
                    <Box component={"span"} sx={{ color: "#0096A4" }}>
                      Bonus
                    </Box>
                  </Box>
                </>
              )}
              {}
            </Typography>
            <Typography
              sx={{
                fontSize: "36px",
                color: "rgba(0, 0, 0, 0.50)",
                lineHeight: "40px",
                fontWeight: 300,
                "@media (max-width:480px)": {
                  fontSize: "25px",
                },
              }}
            >
              {bottomBarText ? (
                <>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: bottomBarText ?? "",
                    }}
                  />
                </>
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
          </>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card
            elevation={0}
            sx={{
              maxWidth: 520,
              mx: "auto",
              boxShadow: "0px 8px 32px 0px rgba(0, 0, 0, 0.10)",
              borderRadius: "16px",
              borderTop: "6px solid #0096A4",
            }}
          >
            <CardContent sx={{ p: { xs: 3, sm: 4 }, "&:last-child": { pb: { xs: 3, sm: 4 } } }}>
              <Stack direction={"column"} spacing={3}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      flexShrink: 0,
                      borderRadius: "12px",
                      backgroundColor: "rgba(0,150,164,0.1)",
                      color: "#0096A4",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <LocationOnIcon sx={{ fontSize: "30px" }} />
                  </Box>
                  <Box>
                    {/* Texts are managed in admin (Manage Content → Landing Page) */}
                    <Typography
                      component="div"
                      sx={{ fontSize: { xs: "20px", sm: "22px" }, fontWeight: 700, color: "#2d3748", lineHeight: 1.3, "& p": { m: 0 } }}
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
                              <SearchIcon sx={{ color: "#0096A4" }} />
                            </InputAdornment>
                            {params.InputProps.startAdornment}
                          </>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          minHeight: "58px",
                          fontSize: "16px",
                          borderRadius: "10px",
                        },
                      }}
                    />
                  )}
                />
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleSearch}
                  endIcon={<ArrowForwardIcon sx={{ fontSize: "32px !important" }} />}
                  sx={{
                    minHeight: "60px",
                    fontSize: "22px",
                    fontWeight: "700",
                    letterSpacing: "1px",
                    borderRadius: "10px",
                    textTransform: "uppercase",
                    boxShadow: "0 6px 16px rgba(241,132,29,0.35)",
                    "@media (max-width: 480px)": { fontSize: "18px" },
                  }}
                >
                  Suche starten
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Home;
