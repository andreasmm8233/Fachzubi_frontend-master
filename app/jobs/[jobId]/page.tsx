/* eslint-disable react/no-unescaped-entities */
"use client";

import { SVG } from "@/components/icon";
import {
  Avatar,
  Box,
  Card,
  CardContent,
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
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import BusinessIcon from "@mui/icons-material/Business";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

const chipSx = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  px: 1.25,
  py: 0.5,
  borderRadius: "8px",
  background: "#E6F5F4",
  color: "#0096A4",
  fontSize: { xs: "14px", sm: "16px" },
  fontWeight: 700,
  lineHeight: 1.5,
  textDecoration: "none",
};
const chipIconSx = { fontSize: "18px", color: "#0096A4" };
const contactSx = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  color: "#444444",
  fontSize: { xs: "14px", sm: "16px" },
  fontWeight: 500,
  textDecoration: "none",
  wordBreak: "break-all" as const,
};
const contactIconSx = { fontSize: "18px", color: "#F1841D" };

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
          const data = response.data.data;
          if (data && (data as any).isCity) {
            router.replace(`/jobs/${(data as any)._id}/${encodeURIComponent((data as any).cityName)}`);
            return;
          }
          setJobDetail(data);
        }
        setIsLoading(false);
      } catch (error) {
        console.log({ error });
        setIsLoading(false);
      }
    }
    getJobDetailHandler(jobId as string);
  }, []);

  const cityNames = (jobDetail?.allCity ?? [])
    .map((item) => item.name)
    .filter(Boolean)
    .join(", ");
  const zipCity = [jobDetail?.zipCode, cityNames].filter(Boolean).join(" ");
  const fullAddress = [jobDetail?.address, zipCity].filter(Boolean).join(", ");
  const directionLink = jobDetail?.allCity?.find(
    (item) => item.directionLink
  )?.directionLink;

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
                boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.06)",
                borderRadius: "20px",
                background: "#FFFFFF",
              }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 2, sm: 3 }}
                alignItems="flex-start"
                sx={{ p: { xs: 3, sm: 5 }, pb: { xs: 1, sm: 2 } }}
              >
                <Avatar
                  alt={jobDetail?.company?.companyName}
                  src={
                    (process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL as string) +
                    jobDetail?.company?.companyLogo
                  }
                  variant="rounded"
                  sx={{
                    width: { xs: 110, sm: 150 },
                    height: { xs: 110, sm: 150 },
                    flexShrink: 0,
                    p: 1.5,
                    background: "#FFFFFF",
                    border: "1px solid #EEEEEE",
                    borderRadius: "20px",
                    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.06)",
                    "& img": { objectFit: "contain" },
                  }}
                />

                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    component="h1"
                    sx={{
                      color: "#1A1A1A",
                      fontWeight: 800,
                      fontSize: { xs: "24px", sm: "32px" },
                      lineHeight: 1.25,
                      mb: 1.5,
                      wordBreak: "break-word",
                    }}
                  >
                    {jobDetail?.jobTitle}
                  </Typography>

                  <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1}>
                    {jobDetail?.jobTypeName?.map((type) => (
                      <Box key={type} sx={chipSx}>
                        <AccessTimeFilledIcon sx={chipIconSx} />
                        {type}
                      </Box>
                    ))}
                    {jobDetail?.industryName && (
                      <Box sx={chipSx}>
                        <WorkIcon sx={chipIconSx} />
                        {jobDetail.industryName}
                      </Box>
                    )}
                  </Stack>

                  {fullAddress && (
                    <Box sx={{ mt: 1 }}>
                      <Box
                        {...(directionLink
                          ? { component: "a", href: directionLink, target: "_blank" }
                          : {})}
                        sx={{ ...chipSx, color: "#1A1A1A" }}
                      >
                        <LocationOnIcon sx={{ ...chipIconSx, color: "#1A1A1A" }} />
                        {fullAddress}
                      </Box>
                    </Box>
                  )}

                  <Stack spacing={0.75} sx={{ mt: 2 }}>
                    {jobDetail?.company?.companyName && (
                      <Box sx={contactSx}>
                        <BusinessIcon sx={contactIconSx} />
                        {jobDetail.company.companyName}
                      </Box>
                    )}
                    {jobDetail?.phoneNo && (
                      <Box component="a" href={`tel:${jobDetail.phoneNo}`} sx={contactSx}>
                        <PhoneIcon sx={contactIconSx} />
                        {jobDetail.phoneNo}
                      </Box>
                    )}
                    {jobDetail?.email && (
                      <Box component="a" href={`mailto:${jobDetail.email}`} sx={contactSx}>
                        <EmailIcon sx={contactIconSx} />
                        {jobDetail.email}
                      </Box>
                    )}
                  </Stack>
                </Box>
              </Stack>
              <CardContent
                sx={{
                  p: { xs: 3, sm: 5 },
                  pt: { xs: 2, sm: 3 },
                  color: "#444444",
                  fontSize: "16px",
                  lineHeight: 1.9,
                  // Uniform text styles, also for HTML coming from the editor
                  "& .MuiTypography-h6, & h1, & h2, & h3, & h4, & h5, & h6": {
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#1A1A1A",
                    lineHeight: 1.5,
                    mt: 3,
                    mb: 1,
                  },
                  "& .MuiTypography-body1, & p, & span, & li": {
                    fontSize: "16px",
                    lineHeight: 1.9,
                  },
                  "& p": { m: 0 },
                  "& strong, & b": { color: "#1A1A1A", fontWeight: 700 },
                  "& ul, & ol": { paddingLeft: "26px", my: 1 },
                  "& li": { mb: 0.5 },
                  "& a": { color: "#0096A4" },
                }}
              >
                <Typography variant="h6" sx={{ mt: "0 !important" }}>
                  Über das Unternehmen
                </Typography>
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
