"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { getAllContents } from "@/app/api/content/landing.page";
const Home = () => {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [bottomBarText, setBottomBarText] = useState("");
  const [content, setContent] = useState("");
  const [loading, setIsLoading] = useState(true);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name ist erforderlich"),
    email: Yup.string()
      .email("Ungültige E-Mail")
      .required("E-Mail ist erforderlich"),
    phoneNo: Yup.string(),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNo: "",
      aboutMe: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      localStorage.setItem("UserData", JSON.stringify(values));
      toast.info("Gerettet...");
    },
  });

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
    let userData: any = localStorage.getItem("UserData");
    if (userData) {
      userData = JSON.parse(userData);
      formik.setFieldValue("name", userData.name);
      formik.setFieldValue("email", userData.email);
      formik.setFieldValue("phoneNo", userData.phoneNo);
      if (userData.aboutMe) {
        formik.setFieldValue("aboutMe", userData.aboutMe);
      }
    }
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
                    F
                    <Box component={"span"} sx={{ color: "#0096A4" }}>
                      a
                    </Box>
                    ch
                    <Box component={"span"} sx={{ color: "#0096A4" }}>
                      zubi
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
            <CardContent sx={{ "&:last-child": { pb: 2 } }}>
              <Stack direction={"column"} spacing={2}>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="VORNAME/NACHNAME (erforderlich)"
                  fullWidth
                  type="text"
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name && (
                  <div style={{ color: "red" }}>{formik.errors.name}</div>
                )}
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="E-MAIL (erforderlich)"
                  fullWidth
                  type="email"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email && (
                  <div style={{ color: "red" }}>{formik.errors.email}</div>
                )}
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="Telefonnummer"
                  fullWidth
                  type="number"
                  {...formik.getFieldProps("phoneNo")}
                />
                {formik.touched.phoneNo && formik.errors.phoneNo && (
                  <div style={{ color: "red" }}>{formik.errors.phoneNo}</div>
                )}
                <textarea
                  style={{
                    borderRadius: "10px",
                    padding: "26.5px 14px",
                    border: "1px solid #0096A4",
                    resize: "none",
                    height: "150px",
                    fontFamily: `'Poppins', sans-serif`,
                    outline: "none",
                  }}
                  {...formik.getFieldProps("aboutMe")}
                  placeholder="Über mich (freiwilliges Feld)"
                ></textarea>
                <Button
                  variant="contained"
                  sx={{ fontSize: "32px", fontWeight: "700" }}
                  onClick={() => {
                    formik.handleSubmit();
                  }}
                >
                  Speichern
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <ToastContainer />
    </Box>
  );
};
export default Home;
