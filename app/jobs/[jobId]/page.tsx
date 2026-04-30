/* eslint-disable react/no-unescaped-entities */
"use client";

import { SVG } from "@/components/icon";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import BottomBar from "./bottombar";
import ImageSlider from "@/components/slider.component";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { JobDetails } from "@/app/api/job/jobs.types";
import { getJobDetailApi } from "@/app/api/job/job";
import CustomLoader from "@/components/SpinLoader";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Image from "next/image";
import IMAGES from "@/public/images";

const Details = () => {
  const router = useRouter();
  const [jobDetail, setJobDetail] = useState<JobDetails>();
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const { jobId } = useParams();

  useEffect(() => {
    async function getJobDetailHandler(id: string) {
      setIsLoading(true);
      try {
        const response = await getJobDetailApi(id);

        if (response.remote === "success") {
          setJobDetail(response.data.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.log({ error });
        setIsLoading(false);
      }
    }
    getJobDetailHandler(jobId as string);
  }, []);

  return (
    <>
      {isLoading && <CustomLoader />}
      <Box sx={{ pt: 3, minHeight: "calc(100vh - 80px)" }}>
        <Container maxWidth="md">
          <Stack
            direction={"row"}
            spacing={2}
            alignItems={"center"}
            sx={{ mb: 2, cursor: "pointer", display: "inline-block" }}
            onClick={() => router.back()}
          >
            <IconButton>
              <SVG.BackArrow />
            </IconButton>
            <span>Zurück</span>
          </Stack>
          <Box>
            <Card
              sx={{
                boxShadow: " 0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                borderRadius: "10px 10px 0px 0px",
                background: "#FDFEFF",
              }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                alignItems={{ xs: "flex-start", sm: "center" }}
                sx={{ p: 4, borderBottom: "1px solid rgba(0, 0, 0, 0.40)" }}
              >
                <Box>
                  <Stack
                    direction={"row"}
                    spacing={2}
                    sx={{ mb: 1 }}
                    divider={
                      <Divider
                        flexItem
                        orientation="vertical"
                        sx={{ borderColor: "#ccc" }}
                      />
                    }
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        color: "#0A969E",
                        lineHeight: "24px",
                        mb: 1,
                        fontWeight: 500,
                        "@media (max-width: 480px)": {
                          fontSize: "20px",
                        },
                      }}
                    >
                      {jobDetail?.jobTitle}
                    </Typography>

                    <Typography
                      variant="h5"
                      sx={{
                        color: "#0A969E",
                        lineHeight: "24px",
                        mb: 1,
                        fontWeight: 500,
                        "@media (max-width: 480px)": {
                          fontSize: "20px",
                        },
                      }}
                    >
                      {jobDetail?.jobTypeName ? jobDetail?.jobTypeName : ""}
                    </Typography>
                  </Stack>
                  <Stack
                    direction={"column"}
                    spacing={2}
                    component={"ul"}
                    fontWeight={"500"}
                    useFlexGap
                    sx={{
                      "@media (max-width: 480px)": {
                        flexDirection: "column", // Change direction to column for mobile view
                        fontSize: "12px",
                      },
                    }}
                  >
                    <Stack
                      direction={"row"}
                      spacing={1}
                      alignItems={"center"}
                      component={"li"}
                      sx={{ color: "#0096A4", fontSize: "20px" }}
                    >
                      <SVG.Location
                        style={{ color: "#F1841D" }}
                        sx={{
                          "@media (max-width: 480px)": {
                            wight: "15px", // Change direction to column for mobile view
                            height: "15px",
                          },
                        }}
                      />{" "}
                      {/* {jobDetail?.allCity?.map((item) => (
                        <Tooltip title={item.address} key={item._id}>
                          {item.directionLink ? (
                            <Link href={item.directionLink} passHref>
                              <Typography
                                component="span"
                                variant="body1"
                                className="custom-link"
                              >
                                {item.name}
                              </Typography>
                            </Link>
                          ) : (
                            <Typography component="span" variant="body1">
                              {item.name}
                            </Typography>
                          )}
                        </Tooltip>
                      ))} */}
                      {jobDetail?.allCity?.map((item) => (
                        <Tooltip title={item.address} key={item._id}>
                          {item.directionLink ? (
                            <Link
                              href={item.directionLink}
                              passHref
                              target="_blank"
                            >
                              <Chip
                                component="span"
                                label={item.name}
                                clickable
                                className="custom-link"
                              />
                            </Link>
                          ) : (
                            <Chip component="span" label={item.name} />
                          )}
                        </Tooltip>
                      ))}
                    </Stack>
                    {/* <Stack
                      direction={"row"}
                      spacing={2}
                      alignItems={"center"}
                      component={"li"}
                      sx={{ color: "#0096A4", fontSize: "20px" }}
                    >
                      <SVG.Calender /> <span>{jobDetail?.createdAt}</span>
                    </Stack> */}

                    <Stack
                      direction={"row"}
                      spacing={2}
                      alignItems={"center"}
                      component={"li"}
                      sx={{ color: "#0096A4", fontSize: "20px", "@media (max-width:600px)":{
                        fontSize:"15px",
                      } }}
                    >
                      <SVG.Softwere style={{ color: "#F1841D" }} />{" "}
                      <span>{jobDetail?.industryName}</span>
                    </Stack>
                    <Stack
                      direction={"row"}
                      spacing={2}
                      alignItems={"center"}
                      component={"li"}
                      sx={{ color: "#0096A4", fontSize: "20px", "@media (max-width:600px)":{
                        fontSize:"15px",
                      } }}
                    >
                      <SVG.company style={{ color: "#F1841D" }} />{" "}
                      <span>{jobDetail?.company?.companyName}</span>
                    </Stack>
                    <Stack
                      direction={"row"}
                      spacing={2}
                      alignItems={"center"}
                      component={"li"}
                      sx={{ color: "#0096A4", fontSize: "20px", "@media (max-width:600px)":{
                        fontSize:"15px",
                      } }}
                    >
                       <SVG.phone style={{ color: "#F1841D" }} />{" "}
                      <a href={`tel:${jobDetail?.phoneNo}`} target="_blank">
                       
                        <span>{jobDetail?.phoneNo || ""}</span>
                      </a>
                    </Stack>
                    <Stack
                      direction={"row"}
                      spacing={2}
                      alignItems={"center"}
                      component={"li"}
                      sx={{ color: "#0096A4", fontSize: "20px", "@media (max-width:600px)":{
                        fontSize:"15px",
                      } }}
                    >  
                    <SVG.email style={{ color: "#F1841D" }} />{" "}
                      <a href={`mailto:${jobDetail?.email}`} target="_blank">
                      
                       {jobDetail?.email}
                      </a>
                    </Stack>
                  </Stack>
                </Box>

                <Box
                  sx={{ flex: 1, justifyContent: "flex-end", display: "flex" }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={
                      (process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL as string) +
                      jobDetail?.company?.companyLogo
                    }
                    variant="rounded"
                    sx={{
                      width: 180,
                      height: "auto",
                      "&.MuiAvatar-root": {
                        border: "1px solid #0A969E",
                        borderRadius: "20px",
                      },
                      "& img": { objectFit: "contain" },
                      "@media (max-width:992px)": {
                        width: "100%",
                      },
                    }}
                  />
                </Box>
              </Stack>
              <CardContent
                sx={{
                  p: 4,
                  "& .MuiTypography-h6": {
                    fontSize: "24px",
                    color: "#0A969E",
                    fontWeight: "500",
                  },
                  "& .MuiTypography-body1": {
                    fontSize: "20px",
                    fontWeight: "400",
                  },
                  "& ul": {
                    paddingLeft: "20px",
                    fontSize: "20px",
                  },
                }}
              >
                <Typography variant="h6">Über das Unternehmen</Typography>
                <Typography variant="body1" component={"div"}>
                  {jobDetail?.company.companyDescription && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: jobDetail?.company.companyDescription ?? "",
                      }}
                    />
                  )}
                </Typography>
                <Box sx={{ color: "#000", width: "100%", mt: 3 }}>
                  {jobDetail?.jobImages ? (
                    <>
                      <ImageSlider images={jobDetail?.jobImages} />
                    </>
                  ) : (
                    <></>
                  )}
                </Box>
                {jobDetail?.videoLink?.map((data, index) => {
                  if (data) {
                    let embedUrl = data;
                    if (data.includes("youtube.com/watch?v=")) {
                      embedUrl = data.replace("watch?v=", "embed/");
                      embedUrl = embedUrl.split("&")[0];
                    } else if (data.includes("youtu.be/")) {
                      embedUrl = data.replace("youtu.be/", "youtube.com/embed/");
                      embedUrl = embedUrl.split("?")[0];
                    }

                    return (
                      <Box
                        sx={{
                          mt: 3,
                          textAlign: "center",
                          "@media (max-width:992px)": {
                            "& iframe": { width: "100%" },
                          },
                        }}
                        key={index}
                      >
                        <iframe
                          width="516"
                          height="268"
                          src={embedUrl}
                          allowFullScreen
                          style={{ border: "0px", borderRadius: "20px" }}
                        ></iframe>
                      </Box>
                    );
                  }
                })}
                <Typography variant="h6" sx={{ mt: 3 }}>
                  Berufsbezeichnung
                </Typography>
                <Typography variant="body1">{jobDetail?.jobTitle}</Typography>
                <Typography variant="h6" sx={{ mt: 3 }}>
                  Über Job
                </Typography>
                <Typography variant="body1">
                  {jobDetail?.jobDescription && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: jobDetail?.jobDescription ?? "",
                      }}
                    />
                  )}
                </Typography>
                <Typography variant="h6" sx={{ mt: 3 }}>
                  Adresse
                </Typography>
                <Typography variant="body1">{jobDetail?.address}</Typography>
                <Typography>
                  {jobDetail?.startDate ? (
                    <>
                      <Typography variant="h6" sx={{ mt: 3 }}>
                        Datum: {jobDetail?.startDate}
                      </Typography>
                     
                    </>
                  ) : (
                    <></>
                  )}
                </Typography>
                <Stack
                  direction={"row"}
                  spacing={2}
                  justifyContent={"space-between"}
                >
                  <List
                    sx={{
                      paddingLeft: "0px !important",
                      width: "100%",
                      display: "flex",
                      flexWrap: "wrap",
                    }}
                  >
                    {jobDetail &&
                      jobDetail?.attachments.map((item, index) => (
                        <ListItem
                          disablePadding
                          key={index}
                          component={"a"}
                          sx={{
                            display: "inline-flex",
                            width: "auto",
                            marginRight: "15px",
                          }}
                          href={
                            process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL +
                            item.filePath
                          }
                          target="_blank"
                        >
                          <ListItemIcon
                            sx={{
                              color: "#0A969E",
                              minWidth: "auto",
                              marginRight: "10px",
                            }}
                          >
                            <SVG.File />
                          </ListItemIcon>

                          <ListItemText
                            primary={item.fileName ?? `Doc ${index + 1}`}
                            sx={{ color: "#000", fontSize: "14px" }}
                          />
                        </ListItem>
                      ))}
                  </List>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>
      <BottomBar
        jobId={jobDetail?.id}
        city={jobDetail?.city}
        companyId={jobDetail?.company.id}
      />
    </>
  );
};
export default Details;
