"use client";

import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllContents } from "@/app/api/content/landing.page";
import { getCity } from "@/app/api/cities/city";
import { TransformCity } from "@/app/api/cities/city.types";

const slugifyCity = (name: string) =>
  name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const Home = () => {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [bottomBarText, setBottomBarText] = useState("");
  const [content, setContent] = useState("");
  const [loading, setIsLoading] = useState(true);
  const router = useRouter();
  const [cities, setCities] = useState<TransformCity[]>([]);
  const [selectedCity, setSelectedCity] = useState<TransformCity | null>(null);
  const [cityError, setCityError] = useState(false);

  const handleSearch = () => {
    if (!selectedCity) {
      setCityError(true);
      return;
    }
    router.push(
      `/jobs/${encodeURIComponent(selectedCity.id)}/${slugifyCity(selectedCity.name)}`
    );
  };

  const handleGetAllContent = async () => {
    setIsLoading(true);
    const response = await getAllContents();
    if (response.remote === "success") {
      setHeading(response.data.data.heading);
      setSubHeading(response.data.data.subHeading);
      setBottomBarText(response.data.data.bottomBarText);
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
      <Grid container spacing={2}>
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
              ) : (
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
              ) : (
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
              ) : (
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
              boxShadow: "0px 4px 24px 0px rgba(0, 0, 0, 0.10)",
              borderRadius: "20px",
            }}
          >
            <CardContent sx={{ p: { xs: 2, sm: 3 }, "&:last-child": { pb: { xs: 2, sm: 3 } } }}>
              <Stack direction={"column"} spacing={2}>
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
                      placeholder="STADT AUSWÄHLEN (A–Z)"
                      error={cityError}
                      helperText={cityError ? "Bitte wähle eine Stadt aus" : ""}
                    />
                  )}
                />
                <Button
                  variant="contained"
                  onClick={handleSearch}
                  endIcon={<ArrowForwardIcon sx={{ fontSize: "40px !important" }} />}
                  sx={{
                    fontSize: "28px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    "@media (max-width: 480px)": { fontSize: "22px" },
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
