/* eslint-disable react/no-unescaped-entities */
"use client";

import { SVG } from "@/components/icon";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { Companies } from "../api/employer/employer.types";
import { useState } from "react";
import IModal from "@/components/modal";
import Appointment from "../../app/jobs/[jobId]/appoinment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CompanyCardList = ({ company }: { company: Companies }) => {
  const [appointment, setAppointment] = useState<boolean>(false);
  const handleClose = () => {
    setAppointment(false);
  };
  return (
    <>
      <Card
        elevation={0}
        sx={{
          boxShadow: "0px 4px 24px 0px rgba(0, 0, 0, 0.10)",
          background: "#FDFBFF",
          borderRadius: "10px",
          width: "100%",
          mb: 2,
        }}
      >
        <CardContent sx={{ "&:last-child": { pb: 2 } }}>
          <Stack direction={{xs:"column", sm:"row"}} spacing={2} alignItems={{xs:"flex-start", sm:"center"}}>
            <Box sx={{ pr: 3 }}>
              <Typography
                component={Link}
                href={`company-list/${company.id}`}
                variant="h5"
                sx={{ color: "#0A969E", lineHeight: "24px", mb: 1 }}
              >
                {company.companyName}
              </Typography>
              <Typography sx={{ fontSize: "20px", py: 0.5 }}>
                {company.industryName}
              </Typography>
              <Stack direction={"row"} spacing={2} component={"ul"}>
                <Stack
                  direction={"row"}
                  spacing={1}
                  alignItems={"center"}
                  component={"li"}
                  sx={{ color: "#646464", fontSize: "16px", cursor: "pointer" }}
                  onClick={() => {
                    setAppointment(true);
                  }}
                >
                  <SVG.EditIcon style={{ color: "#F1841D" }} />{" "}
                  <span>Termin</span>
                </Stack>
              </Stack>
            </Box>
            <Stack
              direction={"row"}
              alignItems={"center"}
              spacing={2}
              justifyContent={"flex-end"}
              flex={1}
              component={Link}
              href={`company-list/${company.id}`}
            >
              <Avatar
                alt="Remy Sharp"
                src={
                  process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL +
                  company.companyLogo
                }
                variant="rounded"
                sx={{
                  width: 100,
                  height: "auto",
                  border: "1px solid #0A969E",
                  "& img": { objectFit: "contain" },
                }}
              />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
      <IModal open={appointment} handleClose={handleClose}>
        <Appointment
          handleClose={handleClose}
          companyId={company.id}
          toast={toast}
        />
      </IModal>
      <ToastContainer />
    </>
  );
};
export default CompanyCardList;
