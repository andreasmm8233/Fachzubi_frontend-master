"use client";

import { SVG } from "@/components/icon";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import ApplyJobs from "./applyJobs";

import { useState } from "react";
import IModal from "@/components/modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { City } from "@/app/api/job/jobs.types";
const BottomBar = ({
  jobId,
  city,
  companyId,
}: {
  jobId?: string;
  city?: City;
  companyId?: string;
}) => {
  const [applyJobs, setApplyJobs] = useState<boolean>(false);
  const handleApplyJobs = () => {
    setApplyJobs(true);
  };
  const handleClose = () => {
    setApplyJobs(false);
  };
  return (
    <>
      <Box sx={{ background: "#0096A4", py: 2 }}>
        <Container maxWidth="md">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent={"space-between"}
          >
            {/* <Box>
              <Typography
                sx={{
                  fontSize: "20px",
                  color: "#fff",
                  fontWeight: 600,
                  "@media (max-width:992px)": {
                    fontSize: "18px",
                  },
                }}
              >
                {city?.name}
                <br /> {city?.address}
              </Typography>
              <Button
                LinkComponent="a"
                href={`${city?.directionLink}`}
                target="_blank"
                sx={{
                  color: "#fff",
                  fontSize: "20px",
                  border: "1px solid #fff",
                  px: 3,
                  "@media (max-width:992px)": {
                    fontSize: "15px",
                  },
                }}
              >
                <SVG.Direction style={{ marginRight: "10px" }} /> Sie sich die
                Richtung
              </Button>
            </Box> */}
            <Button
              onClick={() => handleApplyJobs()}
              variant="contained"
              sx={{
                px: 3,
                "@media (max-width:992px)": { width: "100%", fontSize: "23px" },
                "&:hover": {
                  background: "#F1841D !important",
                },
              }}
            >
              JETZT BEWERBEN
            </Button>
          </Stack>
        </Container>
      </Box>
      <IModal open={applyJobs} handleClose={handleClose}>
        <ApplyJobs handleClose={handleClose} jobId={jobId} toast={toast} />
      </IModal>
      <ToastContainer />
    </>
  );
};
export default BottomBar;
