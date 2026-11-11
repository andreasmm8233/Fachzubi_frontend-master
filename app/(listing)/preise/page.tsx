"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Container, Grid, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Link from "next/link";
import { getAllContents } from "@/app/api/content/landing.page";
import { getPricingPlans, PricingPlan } from "@/app/api/pricing/pricing";

const DURATION_LABEL = { month: "Monat", year: "Jahr" };

const ORANGE = "#F1841D";
const TEAL = "#0096A4";

// 13.5 -> { whole: "13", cents: "50" }; 0 -> { whole: "0", cents: "" }
const splitPrice = (price: number) => {
  const [whole, cents = ""] = price.toFixed(2).split(".");
  return {
    whole: Number(whole).toLocaleString("de-DE"),
    cents: cents === "00" ? "" : cents,
  };
};

// Pricing page; heading, description and plans are managed in admin
// (Manage Content → Pricing Page)
export default function PricingPage() {
  const [texts, setTexts] = useState({ heading: "", description: "" });
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAllContents(), getPricingPlans()]).then(([content, pricing]) => {
      if (content.remote === "success") {
        setTexts({
          heading: content.data.data.pricingHeading ?? "",
          description: content.data.data.pricingDescription ?? "",
        });
      }
      if (pricing.remote === "success") setPlans(pricing.data.data);
      setLoading(false);
    });
  }, []);

  // Fallback texts appear only once loading is done, so nothing flashes
  const heading = texts.heading || (loading ? "" : "Preise");
  const description =
    texts.description || (loading ? "" : "Wähle den Plan, der am besten zu deinem Unternehmen passt.");

  return (
    <Box sx={{ backgroundColor: "#f5f7fa", pb: 10 }}>
      {/* Header Section */}
      <Box sx={{ background: "linear-gradient(135deg, #0096A4 0%, #005c66 100%)", py: { xs: 6, md: 8 }, mb: 6 }}>
        <Container maxWidth="md">
          <Typography variant="h3" component="h1" align="center" sx={{ color: "#fff", fontWeight: 800, mb: 2, "& p": { m: 0 } }}>
            <span dangerouslySetInnerHTML={{ __html: heading }} />
          </Typography>
          <Typography variant="h6" component="div" align="center" sx={{ color: "rgba(255,255,255,0.9)", fontWeight: 400, "& p": { m: 0 } }}>
            <span dangerouslySetInnerHTML={{ __html: description }} />
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
            <CircularProgress sx={{ color: "#0096A4" }} />
          </Box>
        ) : plans.length === 0 ? (
          <Typography align="center" sx={{ color: "#718096", py: 6 }}>
            Aktuell sind keine Preise verfügbar. Bitte kontaktieren Sie uns für ein individuelles Angebot.
          </Typography>
        ) : (
          <Grid container spacing={3} justifyContent="center" alignItems="stretch" sx={{ pt: 3 }}>
            {plans.map((plan) => (
              <Grid item xs={12} sm={6} md={4} key={plan._id}>
                <PlanCard plan={plan} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

// One plan; a highlighted plan is an orange card with a badge on top
function PlanCard({ plan }: { plan: PricingPlan }) {
  const hi = Boolean(plan.highlighted);
  const { whole, cents } = splitPrice(plan.price);
  const textColor = hi ? "#fff" : "#2d3748";
  const mutedColor = hi ? "rgba(255,255,255,0.9)" : "#4a5568";
  const lineColor = hi ? "rgba(255,255,255,0.35)" : "#edf2f7";

  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: hi ? ORANGE : "#fff",
        color: textColor,
        borderRadius: "12px",
        border: hi ? `1px solid ${ORANGE}` : "1px solid #e2e8f0",
        boxShadow: hi ? "0 12px 30px rgba(241,132,29,0.3)" : "0 4px 20px rgba(0,0,0,0.06)",
        p: { xs: 3, md: 3.5 },
      }}
    >
      {hi && (
        <Box
          sx={{
            position: "absolute",
            bottom: "100%",
            left: 16,
            backgroundColor: "#1a202c",
            color: "#fff",
            fontSize: "12px",
            fontWeight: 600,
            px: 1.5,
            py: 0.5,
            borderRadius: "6px 6px 0 0",
            whiteSpace: "nowrap",
          }}
        >
          {plan.badgeText || "Unsere Empfehlung"}
        </Box>
      )}

      <Typography sx={{ fontWeight: 800, fontSize: "26px", color: hi ? "#fff" : TEAL }}>{plan.name}</Typography>
      {plan.description && (
        <Typography sx={{ color: mutedColor, fontSize: "14px", mt: 1.5, minHeight: { md: 42 }, whiteSpace: "pre-line" }}>
          {plan.description}
        </Typography>
      )}

      {/* Price: big whole number, small cents next to it */}
      <Box sx={{ display: "flex", alignItems: "flex-start", mt: 3 }}>
        <Typography sx={{ fontWeight: 800, fontSize: { xs: "48px", md: "56px" }, lineHeight: 1, color: textColor }}>
          {whole}
        </Typography>
        <Box sx={{ ml: 0.5, mt: "6px" }}>
          <Typography sx={{ fontWeight: 700, fontSize: "18px", lineHeight: 1.1, color: textColor }}>
            {cents && `,${cents} `}€
            <Box component="span" sx={{ fontWeight: 400, fontSize: "14px", color: mutedColor }}>
              {" "}/ {DURATION_LABEL[plan.duration]}
            </Box>
          </Typography>
          {plan.priceNote && (
            <Box
              sx={{
                display: "inline-block",
                mt: 0.75,
                px: 1,
                py: 0.25,
                fontSize: "12px",
                fontWeight: 600,
                borderRadius: "4px",
                backgroundColor: hi ? "rgba(255,255,255,0.2)" : "rgba(0,150,164,0.1)",
                color: hi ? "#fff" : TEAL,
              }}
            >
              {plan.priceNote}
            </Box>
          )}
        </Box>
      </Box>

      <Button
        LinkComponent={Link}
        href="/kontakt"
        variant="outlined"
        disableElevation
        sx={{
          mt: 3,
          // same selector as the theme's outlined-button override, so these win
          "&.MuiButton-outlined": {
            textTransform: "none",
            fontSize: "14px",
            fontWeight: 600,
            py: 1,
            px: 2,
            borderRadius: "999px",
            borderColor: hi ? "#fff" : ORANGE,
            color: ORANGE,
            backgroundColor: hi ? "#fff" : "transparent",
            // always one line; very long texts end with "…"
            display: "block",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            "&:hover": {
              borderColor: hi ? "#fff" : ORANGE,
              backgroundColor: hi ? "rgba(255,255,255,0.9)" : "rgba(241,132,29,0.08)",
            },
          },
        }}
      >
        {plan.buttonText || `Jetzt ${plan.name}-Tarif starten`}
      </Button>

      {/* Features; a line starting with # is a section heading */}
      {plan.features.length > 0 && (
        <Box sx={{ borderTop: `1px solid ${lineColor}`, mt: 3, pt: 2.5, flex: 1 }}>
          {plan.features.map((feature, i) =>
            feature.startsWith("#") ? (
              <Typography
                key={i}
                sx={{
                  fontWeight: 700,
                  fontSize: "15px",
                  color: textColor,
                  mt: i === 0 ? 0 : 2.5,
                  mb: 1.5,
                  pt: i === 0 ? 0 : 2.5,
                  borderTop: i === 0 ? "none" : `1px solid ${lineColor}`,
                }}
              >
                {feature.replace(/^#+\s*/, "")}
              </Typography>
            ) : (
              <Box key={i} sx={{ display: "flex", alignItems: "flex-start", gap: 1.25, mb: 1.25 }}>
                <CheckCircleOutlineIcon sx={{ color: hi ? "#fff" : TEAL, fontSize: 20, mt: "1px" }} />
                <Typography sx={{ fontSize: "14px", color: textColor }}>{feature}</Typography>
              </Box>
            )
          )}
        </Box>
      )}
    </Box>
  );
}
