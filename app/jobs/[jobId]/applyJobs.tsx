"use client";

import {
  Box,
  Button,
  FormGroup,
  FormLabel,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TextEditor from "@/components/textEditor/textEditor";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { addApplicationApi } from "@/app/api/job/job";
import CustomLoader from "@/components/SpinLoader";
import "react-toastify/dist/ReactToastify.css";
import { getManageContentApi } from "@/app/api/manageContent/manageContent";
const ApplyJobs = (props: any) => {
  const [isLoading, setIsLoding] = useState<Boolean>(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name ist erforderlich"),
    email: Yup.string()
      .email("Ungültige E-Mail")
      .required("E-Mail ist erforderlich"),
    phoneNo: Yup.string(),
    aboutMe: Yup.string().required("aboutMe ist erforderlich"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNo: "",
      aboutMe: "",
      coverLetter:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoding(true);
      const response = await addApplicationApi({
        jobId: props.jobId,
        applicantName: values.name,
        email: values.email,
        phone: values.phoneNo,
        aboutMe: values.aboutMe,
        coverLetter: values.coverLetter,
      });
      if (response.remote === "success") {
        props.toast.info(
          "Herzlichen Glückwunsch! Deine Bewerbung wurde an den Arbeitgeber weitergeleitet."
        );
        props.handleClose();
      } else {
        props.toast.info("Angewandter Fehler");
      }
      setIsLoding(false);
    },
  });

  const manageContentHandler = async () => {
    const response = await getManageContentApi();
    if (response.remote === "success") {
      formik.setFieldValue("coverLetter", response.data.data.jobCoverLetter);
    }
  };
  useEffect(() => {
    manageContentHandler();
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
  return (
    <Box>
      {isLoading && <CustomLoader />}
      <Typography
        sx={{
          fontSize: "36px",
          fontWeight: "600",
          textAlign: "center",
          color: "#0096A4",
          "@media(max-width:992px)": {
            fontSize: "18px",
            marginTop: "24px",
          },
        }}
      >
        Jetzt bewerben
        <IconButton
          size="small"
          onClick={props.handleClose}
          sx={{
            position: "absolute",
            top: "15px",
            right: "15px",
            border: "1px solid #0096A4",
            color: "#0096A4",
          }}
        >
          <CloseIcon />
        </IconButton>
      </Typography>
      <Stack direction={"column"} spacing={2}>
        <FormGroup>
          <FormLabel
            sx={{
              color: "#0096A4",
            }}
          >
            Bitte ausfüllen
          </FormLabel>
          <TextField
            placeholder=" Dein Vorname/Nachname"
            variant="outlined"
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name && (
            <div style={{ color: "red" }}>{formik.errors.name}</div>
          )}
        </FormGroup>
        <FormGroup>
          <FormLabel
            sx={{
              color: "#0096A4",
            }}
          >
            Email (erforderlich)
          </FormLabel>
          <TextField
            placeholder="Deine Email"
            variant="outlined"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <div style={{ color: "red" }}>{formik.errors.email}</div>
          )}
        </FormGroup>
        <FormGroup>
          <FormLabel
            sx={{
              color: "#0096A4",
            }}
          >
            Telefonnummer(optional)
          </FormLabel>
          <TextField
            placeholder="Hier eingeben"
            type="number"
            variant="outlined"
            {...formik.getFieldProps("phoneNo")}
          />
          {formik.touched.phoneNo && formik.errors.phoneNo && (
            <div style={{ color: "red" }}>{formik.errors.phoneNo}</div>
          )}
        </FormGroup>
        <FormGroup>
          <FormLabel
            sx={{
              color: "#0096A4",
            }}
          >
            Über mich
          </FormLabel>
          <textarea
            style={{
              borderRadius: "10px",
              padding: "26.5px 14px",
              border: "1px solid #0096A4",
              resize: "none",
              height: "80px",
              fontFamily: `'Poppins', sans-serif`,
              outline: "none",
            }}
            {...formik.getFieldProps("aboutMe")}
            placeholder="Was sind deine Hobbies/Stärken/Interessen?"
          ></textarea>
          {formik.touched.aboutMe && formik.errors.aboutMe && (
            <div style={{ color: "red" }}>{formik.errors.aboutMe}</div>
          )}
        </FormGroup>
        <FormGroup>
          <FormLabel
            sx={{
              color: "#0096A4",
            }}
          >
            Motivationsschreiben
          </FormLabel>
          <TextEditor
            content={`${formik.values.coverLetter}`}
            setContent={(txt) => {
              formik.setFieldValue("coverLetter", txt);
            }}
          />
          {formik.touched.coverLetter && formik.errors.coverLetter && (
            <div style={{ color: "red" }}>{formik.errors.coverLetter}</div>
          )}
        </FormGroup>
        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            sx={{ fontWeight: "600", fontSize: "24px", px: 4 }}
            onClick={() => {
              formik.handleSubmit();
            }}
          >
            JETZT BEWERBEN
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};
export default ApplyJobs;
