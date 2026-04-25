"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { RotatingLines } from "react-loader-spinner";
import JobCard from "@/components/Jobcard";
import { Job } from "@/app/api/job/jobs.types";
import { getJobsByCityApi } from "@/app/api/job/jobByCity";
import { SVG } from "@/components/icon";

const CityJobs = () => {
  const router = useRouter();
  const params = useParams();
  const cityId = params.jobId as string;
  const cityName = decodeURIComponent(params.cityName as string);

  const [jobList, setJobList] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      const response = await getJobsByCityApi(cityId);
      if (response.remote === "success") {
        setJobList(response.data.data.data);
      }
      setIsLoading(false);
    };
    fetchJobs();
  }, [cityId]);

  return (
    <div>
      <Box sx={{ py: 3, pt: 10, "@media (max-width:992px)": { pt: 3 } }}>
        <Container maxWidth="md">
          {/* Header */}
          <Stack
            direction={"row"}
            spacing={2}
            alignItems={"center"}
            sx={{ mb: 3, cursor: "pointer", display: "inline-flex" }}
            onClick={() => router.push("/jobs")}
          >
            <IconButton>
              <SVG.BackArrow />
            </IconButton>
            <span>Zurück</span>
          </Stack>

          <Typography
            variant="h4"
            sx={{
              color: "#0096A4",
              fontWeight: 600,
              mb: 3,
              fontSize: { xs: "22px", sm: "28px" },
            }}
          >
            Jobs in {cityName}
          </Typography>

          {/* Job Count */}
          <Box
            sx={{
              color: "#0096A4",
              fontSize: "16px",
              fontWeight: 400,
              mb: 2,
              "@media (max-width: 480px)": {
                fontSize: "12px",
              },
            }}
          >
            {jobList.length} Jobs gefunden
          </Box>

          {/* Job List */}
          {jobList.length > 0 && (
            <div>
              {jobList.map((item, index) => (
                <JobCard key={index} url={`/jobs/${item.id}`} item={item} />
              ))}
            </div>
          )}

          {/* Loading */}
          {isLoading && (
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
          )}

          {/* No jobs found */}
          {!isLoading && jobList.length === 0 && (
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Typography sx={{ color: "#646464", fontSize: "18px" }}>
                Keine Jobs in {cityName} gefunden
              </Typography>
            </Box>
          )}
        </Container>
      </Box>
    </div>
  );
};

export default CityJobs;
