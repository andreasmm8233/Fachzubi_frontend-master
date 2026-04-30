/* eslint-disable react/no-unescaped-entities */
"use client";

import { SVG } from "@/components/icon";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import ImageSlider from "@/components/slider.component";
import JobCard from "@/components/Jobcard";
import { useEffect, useState } from "react";
import IModal from "@/components/modal";
import Appoinment from "../../jobs/[jobId]/appoinment";
import { useParams, useRouter } from "next/navigation";
import { CompanyDetail } from "@/app/api/employer/employer.types";
import {
  getCompanyDetailApi,
  getJobsByCompanyIdApi,
} from "@/app/api/employer/employer";
import { ToastContainer, toast } from "react-toastify";
import CustomLoader from "@/components/SpinLoader";
import "react-toastify/dist/ReactToastify.css";
import { Job } from "@/app/api/job/jobs.types";
import InfiniteScroll from "react-infinite-scroll-component";
import Link from "next/link";
import { RotatingLines } from "react-loader-spinner";
const Details = () => {
  const router = useRouter();
  const { companyId } = useParams();
  const [appoinment, setAppoinment] = useState<boolean>(false);
  const [companyDetail, setCompanyDetail] = useState<CompanyDetail>();
  const [jobList, setJobList] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [skip, setSkip] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const handleAppoiment = () => {
    setAppoinment(true);
  };
  const handleClose = () => {
    setAppoinment(false);
  };

  useEffect(() => {
    async function getCompanyDetailHandler() {
      setIsLoading(true);
      try {
        const response = await getCompanyDetailApi(companyId as string);
        if (response.remote === "success") {
          setCompanyDetail(response.data.data);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }
    getCompanyDetailHandler();
  }, []);

  const getJobsHandler = async () => {
    const response = await getJobsByCompanyIdApi(companyId as string, skip);
    if (response.remote === "success") {
      setJobList(response.data.data);
      if (response.data.data.length == 0) {
        setHasMore(false);
      }
    }
  };
  useEffect(() => {
    getJobsHandler();
  }, []);

  const handleGetJobsOnScroll = async () => {
    setSkip(skip + 10);
    const response = await getJobsByCompanyIdApi(
      companyId as string,
      skip + 10
    );
    if (response.remote === "success") {
      if (response.data.data.length > 0) {
        setJobList([...jobList, ...response.data.data]);
      } else {
        setHasMore(false);
      }
    }
  };

  return (
    <>
      {isLoading && (
        <RotatingLines
          visible={true}
          width="37"
          strokeWidth="3"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          strokeColor="#0096A4"
        />
      )}
      <Box
        display={"flex"}
        flexDirection={"column"}
        sx={{ minHeight: "calc(100vh - 80px)" }}
      >
        <Box sx={{ pt: 3, flex: 1 }}>
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
                  minHeight: "518px",
                  pb: 4,
                }}
              >
                <Stack
                  direction={{ xs: "column", lg: "row" }}
                  spacing={2}
                  alignItems={{ xs: "flex-start", lg: "center" }}
                  sx={{ p: 2, borderBottom: "1px solid rgba(0, 0, 0, 0.40)" }}
                >
                  <Box sx={{ pr: 3 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        color: "#0A969E",
                        lineHeight: "24px",
                        mb: 1,
                        fontWeight: 500,
                      }}
                    >
                      {companyDetail?.companyName}
                    </Typography>
                    <Typography sx={{ fontSize: "20px", color: "#646464" }}>
                      {companyDetail?.address}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      flex: 1,
                      justifyContent: "flex-end",
                      display: "flex",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Stack
                      direction={{ xs: "column", lg: "row" }}
                      spacing={2}
                      alignItems={{ xs: "flex-start", lg: "center" }}
                    >
                      <Box sx={{ fontSize: "20px", color: "#F1841D" }}>
                        <Stack direction={"row"} spacing={2} sx={{ mb: 1.5 }}>
                          <SVG.Softwere style={{ color: "#F1841D" }} />{" "}
                          <span>{companyDetail?.industryName}</span>
                        </Stack>
                        <Stack direction={"row"} spacing={1}>
                          <SVG.user />{" "}
                          <span>{companyDetail?.contactPerson}</span>
                        </Stack>
                      </Box>
                      <Avatar
                        alt="Remy Sharp"
                        src={
                          (process.env
                            .NEXT_PUBLIC_BACKEND_IMAGE_URL as string) +
                          companyDetail?.companyLogo
                        }
                        variant="rounded"
                        sx={{
                          width: 150,
                          height: "auto",

                          "&.MuiAvatar-root": {
                            border: "1px solid #0A969E",
                            borderRadius: "20px",
                            padding: "10px",
                          },

                          "& img": { objectFit: "contain" },
                          "@media (max-width:992px)": {
                            width: "100%",
                          },
                        }}
                      />
                    </Stack>
                  </Box>
                </Stack>
                <CardContent
                  sx={{
                    "& .MuiTypography-h6": {
                      fontSize: "24px",
                      color: "#0A969E",
                      fontWeight: "500",
                      margin: "24px 0px 0px",
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
                  <Typography variant="body1">
                    {companyDetail?.companyDescription && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: companyDetail?.companyDescription ?? "",
                        }}
                      />
                    )}
                  </Typography>

                  <Typography variant="h6">Webseite</Typography>
                  {companyDetail?.website && (
                    <Typography variant="body1">
                      <Link
                        href={companyDetail?.website as string}
                        target="_blank"
                      >
                        {companyDetail?.website}
                      </Link>
                    </Typography>
                  )}
                  <Typography variant="h6">Telefonnummer</Typography>
                  <Typography variant="body1">
                    <a href={`tel:${companyDetail?.phoneNo}`} target="_blank">
                      {companyDetail?.phoneNo}
                    </a>
                  </Typography>

                  <Typography variant="h6">Email</Typography>
                  <Typography variant="body1">
                    <a
                      href={`mailto:${
                        companyDetail?.email ? companyDetail?.email : ""
                      }`}
                      target="_blank"
                    >
                      {companyDetail?.email ? companyDetail.email : ""}
                    </a>
                  </Typography>

                  <Box sx={{ color: "#000", width: "100%", mt: 3 }}>
                    <ImageSlider images={companyDetail?.companyImages} />
                  </Box>
                  {companyDetail &&
                    companyDetail.videoLink.map((data, index) => {
                      if (data) {
                        return (
                          <Box
                            sx={{
                              mt: 3,
                              textAlign: "center",
                              "@media (max-width:992px)": {
                                "& iframe": {
                                  width: "100%",
                                },
                              },
                            }}
                            key={index}
                          >
                            <iframe
                              width="516"
                              height="268"
                              src={data}
                              allowFullScreen
                              style={{ border: "0px", borderRadius: "20px" }}
                            ></iframe>
                          </Box>
                        );
                      }
                    })}
                  {jobList.length !== 0 && (
                    <Typography
                      variant="h6"
                      sx={{ color: "#F1841D !important", pb: 3 }}
                    >
                      Arbeitsplätze
                    </Typography>
                  )}
                  <InfiniteScroll
                    style={{ padding: "20px", margin: "-20px" }}
                    dataLength={jobList.length}
                    next={handleGetJobsOnScroll}
                    hasMore={hasMore}
                    loader={
                      <h4>
                        <Box sx={{ textAlign: "center", mt: 2 }}>
                          <RotatingLines
                            visible={true}
                            width="37"
                            strokeWidth="3"
                            animationDuration="0.75"
                            ariaLabel="rotating-lines-loading"
                            strokeColor="#0096A4"
                          />
                        </Box>
                      </h4>
                    }
                  >
                    {jobList &&
                      jobList.map((item, index) => (
                        <JobCard
                          key={index}
                          url={`/jobs/${item.id}`}
                          item={item}
                        />
                      ))}
                  </InfiniteScroll>
                </CardContent>
              </Card>
            </Box>
          </Container>
        </Box>
        <Box sx={{ background: "#0096A4", py: 1, textAlign: "center" }}>
          <Button
            onClick={() => handleAppoiment()}
            sx={{
              color: "#fff",
              fontSize: "20px",
              border: "1px solid #fff",
              px: 3,
            }}
          >
            TERMIN
          </Button>
        </Box>
      </Box>
      <IModal open={appoinment} handleClose={handleClose}>
        <Appoinment
          handleClose={handleClose}
          companyId={companyId}
          toast={toast}
        />
      </IModal>
      <ToastContainer />
    </>
  );
};
export default Details;
