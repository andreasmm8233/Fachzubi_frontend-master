"use client";

import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Link as MuiLink,
  TextField,
  Typography,
} from "@mui/material";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import { getAllContents } from "@/app/api/content/landing.page";
import { ManageContentTypes } from "@/app/api/content/manageContent.Types";
import { sendContactQuery } from "@/app/api/contact/contact";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY_FORM = { companyName: "", email: "", phoneNo: "", description: "" };
type FormValues = typeof EMPTY_FORM;

const fieldSx = {
  "& .MuiOutlinedInput-root": { borderRadius: "8px", backgroundColor: "#fff" },
};

// Contact page; all texts are managed in admin (Manage Content → Contact Page)
export default function ContactPage() {
  const [content, setContent] = useState<Partial<ManageContentTypes>>({});
  const [contentLoading, setContentLoading] = useState(true);
  const [values, setValues] = useState<FormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  useEffect(() => {
    getAllContents().then((response) => {
      if (response.remote === "success") setContent(response.data.data);
      setContentLoading(false);
    });
  }, []);

  const setField = (key: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const next: Partial<FormValues> = {};
    if (!values.companyName.trim()) next.companyName = "Bitte geben Sie Ihr Unternehmen ein.";
    if (!EMAIL_REGEX.test(values.email.trim())) next.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
    if (!values.phoneNo.trim()) next.phoneNo = "Bitte geben Sie Ihre Telefonnummer ein.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    if (!validate()) return;
    setSending(true);
    const response = await sendContactQuery({
      companyName: values.companyName.trim(),
      email: values.email.trim(),
      phoneNo: values.phoneNo.trim(),
      description: values.description.trim(),
    });
    setSending(false);
    if (response.remote === "success") {
      setValues(EMPTY_FORM);
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  // Fallback texts appear only once loading is done, so nothing flashes
  const text = (value: string | undefined, fallback: string) =>
    value || (contentLoading ? "" : fallback);

  return (
    <Box sx={{ backgroundColor: "#f5f7fa", pb: 10 }}>
      {/* Header Section */}
      <Box sx={{ background: "linear-gradient(135deg, #0096A4 0%, #005c66 100%)", py: { xs: 6, md: 8 }, mb: 6 }}>
        <Container maxWidth="md">
          <Typography variant="h3" component="h1" align="center" sx={{ color: "#fff", fontWeight: 800, mb: 2, "& p": { m: 0 } }}>
            <span dangerouslySetInnerHTML={{ __html: text(content.contactHeading, "Kontakt") }} />
          </Typography>
          <Typography variant="h6" component="div" align="center" sx={{ color: "rgba(255,255,255,0.9)", fontWeight: 400, "& p": { m: 0 } }}>
            <span
              dangerouslySetInnerHTML={{
                __html: text(content.contactDescription, "Du hast Fragen? Schreib uns – wir melden uns schnellstmöglich bei dir."),
              }}
            />
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="flex-start">
          {/* Contact details: right of the form on desktop, above it on mobile */}
          <Grid item xs={12} md={5} sx={{ order: { xs: 1, md: 2 } }}>
            <Box
              sx={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                p: { xs: 3, md: 4 },
                textAlign: "center",
              }}
            >
              <PhoneInTalkOutlinedIcon sx={{ fontSize: 48, color: "#F1841D", mb: 1 }} />
              <Typography sx={{ fontWeight: 700, fontSize: "18px", color: "#1a202c", mb: 2 }}>
                {text(content.contactCardTitle, "Team kontaktieren")}
              </Typography>
              {content.contactPhone && (
                <MuiLink
                  href={`tel:${content.contactPhone.replace(/[^\d+]/g, "")}`}
                  underline="hover"
                  sx={{ display: "block", fontWeight: 800, fontSize: { xs: "22px", md: "26px" }, color: "#1a202c" }}
                >
                  {content.contactPhone}
                </MuiLink>
              )}
              {content.contactTiming && (
                <Typography sx={{ color: "#718096", fontSize: "15px", mt: 0.5 }}>{content.contactTiming}</Typography>
              )}
              {content.contactEmail && (
                <Box sx={{ borderTop: "1px solid #edf2f7", mt: 3, pt: 3 }}>
                  <MuiLink
                    href={`mailto:${content.contactEmail}`}
                    underline="hover"
                    sx={{ fontWeight: 600, fontSize: { xs: "18px", md: "22px" }, color: "#1a202c", wordBreak: "break-all" }}
                  >
                    {content.contactEmail}
                  </MuiLink>
                </Box>
              )}
            </Box>
          </Grid>

          {/* Contact form */}
          <Grid item xs={12} md={7} sx={{ order: { xs: 2, md: 1 } }}>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                p: { xs: 3, md: 4 },
                display: "flex",
                flexDirection: "column",
                gap: 2.5,
              }}
            >
              {status === "success" && (
                <Alert severity="success">Vielen Dank! Ihre Nachricht wurde gesendet. Wir melden uns schnellstmöglich bei Ihnen.</Alert>
              )}
              {status === "error" && (
                <Alert severity="error">Ihre Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.</Alert>
              )}
              <Box>
                <Typography component="label" htmlFor="contact-company" sx={{ display: "block", fontWeight: 600, mb: 0.75, color: "#2d3748" }}>
                  Unternehmen
                </Typography>
                <TextField id="contact-company" fullWidth value={values.companyName} onChange={setField("companyName")} error={Boolean(errors.companyName)} helperText={errors.companyName} sx={fieldSx} />
              </Box>
              <Box>
                <Typography component="label" htmlFor="contact-email" sx={{ display: "block", fontWeight: 600, mb: 0.75, color: "#2d3748" }}>
                  E-Mail
                </Typography>
                <TextField id="contact-email" type="email" fullWidth value={values.email} onChange={setField("email")} error={Boolean(errors.email)} helperText={errors.email} sx={fieldSx} />
              </Box>
              <Box>
                <Typography component="label" htmlFor="contact-phone" sx={{ display: "block", fontWeight: 600, mb: 0.75, color: "#2d3748" }}>
                  Telefonnummer
                </Typography>
                <TextField id="contact-phone" type="tel" fullWidth value={values.phoneNo} onChange={setField("phoneNo")} error={Boolean(errors.phoneNo)} helperText={errors.phoneNo} sx={fieldSx} />
              </Box>
              <Box>
                <Typography component="label" htmlFor="contact-description" sx={{ display: "block", fontWeight: 600, mb: 0.75, color: "#2d3748" }}>
                  Beschreibung <Box component="span" sx={{ color: "#a0aec0", fontWeight: 400 }}>(optional)</Box>
                </Typography>
                <TextField id="contact-description" fullWidth multiline minRows={4} value={values.description} onChange={setField("description")} sx={fieldSx} />
              </Box>
              <Typography
                component="div"
                sx={{ fontSize: "12px", color: "#718096", lineHeight: 1.6, "& p": { m: 0 }, "& a": { color: "#0096A4" } }}
                dangerouslySetInnerHTML={{
                  __html: text(
                    content.contactFormText,
                    "UniBonus benötigt die Kontaktinformationen, die Sie uns zur Verfügung stellen, um Sie bezüglich Ihrer Anfrage zu kontaktieren. Weitere Informationen finden Sie in unseren Datenschutzbestimmungen."
                  ),
                }}
              />
              <Box sx={{ textAlign: "right" }}>
                <Button
                  type="submit"
                  variant="contained"
                  disableElevation
                  disabled={sending}
                  sx={{
                    textTransform: "none",
                    fontSize: "16px",
                    fontWeight: 700,
                    px: 4,
                    py: 1.25,
                    borderRadius: "6px",
                    backgroundColor: "#F1841D",
                    "&:hover": { backgroundColor: "#d9720f" },
                  }}
                >
                  {sending ? <CircularProgress size={22} sx={{ color: "#fff" }} /> : "Absenden"}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
