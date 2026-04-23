"use client";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { SVG } from "./icon";
import IModal from "./modal";
import { useEffect, useState } from "react";
import ApplyJobs from "@/app/jobs/[jobId]/applyJobs";
import Appointment from "../app/jobs/[jobId]/appoinment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import IMAGES from "@/public/images";

const JobCard = (props: any) => {
  const [applyJobs, setApplyJobs] = useState<boolean>(false);
  const [appointment, setAppointment] = useState<boolean>(false);
  const handleClose = () => {
    setApplyJobs(false);
    setAppointment(false);
  };
  return (
    <Card
      sx={{
        boxShadow: "0px 4px 24px 0px rgba(0, 0, 0, 0.10)",
        background: "#FDFBFF",
        borderRadius: "10px",
        width: "100%",
        mb: 2,
      }}
    >
      <CardContent sx={{ "&:last-child": { pb: 2 } }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent={"space-between"}
        >
          <Box>
            <Typography
              component={Link}
              href={props.url}
              variant="h5"
              sx={{
                color: "#0A969E",
                lineHeight: "24px",
                mb: 1,
                display: "block",
              }}
            >
              {props?.item?.jobTitle}
            </Typography>
            <Stack direction={"column"} spacing={2} component={"ul"}>
              {props.item.companyId ? (
                <>
                  <Stack
                    direction={"row"}
                    spacing={2}
                    alignItems={"center"}
                    component={"li"}
                    sx={{ color: "#646464", fontSize: "16px" }}
                  >
                    <Image
                      src={IMAGES.company}
                      alt={""}
                      height={25}
                      width={25}
                    />

                    <Link href={`/company-list/${props.item.companyId || ""}`}>
                      <span>{props.item.company}</span>
                    </Link>
                  </Stack>
                </>
              ) : (
                <>
                  {" "}
                  <Stack
                    direction={"row"}
                    spacing={2}
                    alignItems={"center"}
                    component={"li"}
                    sx={{ color: "#646464", fontSize: "16px" }}
                  >
                    <Image
                      src={IMAGES.company}
                      alt={""}
                      height={25}
                      width={25}
                    />
                    <span>{props.item.company}</span>
                  </Stack>
                </>
              )}
              <Stack
                direction={"row"}
                spacing={2}
                alignItems={"center"}
                component={"li"}
                sx={{ color: "#646464", fontSize: "16px" }}
              >
               
                <SVG.Location style={{ color: "#F1841D" }} />{" "}
             
               
                {props?.item?.city && props.item.city.length > 0 && (
                  <>
                    {Array.isArray(props.item.city[0]) ? (
                      // Case when props.item.city is an array of arrays
                      <>
                        {props.item.city[0].map(
                          (city: string, index: number) => (
                            <span key={index}>
                              {index === 0 ? city : ""}
                              {index === 1 && props.item.city[0].length > 1
                                ? ` and ${props.item.city[0].length - 1} more`
                                : ""}
                            </span>
                          )
                        )}
                      </>
                    ) : (
                      // Case when props.item.city is an array of strings
                      <>
                        {props.item.city.map((city: string, index: number) => (
                          <span key={index}>
                            {index === 0 ? city : ""}
                            {index === 1 && props.item.city.length > 1
                              ? ` and ${props.item.city.length - 1} more`
                              : ""}
                          </span>
                        ))}
                      </>
                    )}
                  </>
                )}
              </Stack>
              <Stack
                direction={"row"}
                spacing={2}
                alignItems={"center"}
                component={"li"}
                sx={{ color: "#646464", fontSize: "16px" }}
              >
                <SVG.Softwere style={{ color: "#F1841D" }} />{" "}
                <span>{props?.item?.industryName}</span>
              </Stack>
            </Stack>
          </Box>
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={2}
            sx={{
              "@media (max-width: 992px)": {
                width: "100%",
                justifyContent: "space-between",
              },
            }}
          >
            <Tooltip title={"Direktbewerbung"}>
              <IconButton
                disableRipple={true}
                sx={{ padding: "0px" }}
                onClick={() => setApplyJobs(true)}
              >
                <SVG.message />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Termin vereinbaren"}>
              <IconButton
                disableRipple={true}
                sx={{ padding: "0px" }}
                onClick={() => setAppointment(true)}
              >
                <SVG.Edit />
              </IconButton>
            </Tooltip>
            <Avatar
              component={Link}
              href={props.url}
              alt="Remy Sharp"
              src={
                process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL +
                props.item.companyLogo
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
      <IModal open={applyJobs} handleClose={handleClose}>
        <ApplyJobs
          handleClose={handleClose}
          jobId={props.item.id}
          toast={toast}
        />
      </IModal>
      <IModal open={appointment} handleClose={handleClose}>
        <Appointment
          handleClose={handleClose}
          companyId={props.item.companyId}
          toast={toast}
        />
      </IModal>
      <ToastContainer />
    </Card>
  );
};
export default JobCard;
