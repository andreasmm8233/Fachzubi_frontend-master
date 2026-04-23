/* eslint-disable react/no-unescaped-entities */
"use client";

import { getManageContentApi } from "@/app/api/manageContent/manageContent";
import { ManageContent } from "@/app/api/manageContent/manageContent.type";
import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CustomLoader from "@/components/SpinLoader";
import "react-toastify/dist/ReactToastify.css";

const TermsConditions = () => {
  const [manageContent, setManageContent] = useState<ManageContent>();
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  useEffect(() => {
    async function manageContentHandler() {
      setIsLoading(true);
      try {
        const response = await getManageContentApi();
        if (response.remote === "success") {
          setManageContent(response.data.data);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }
    manageContentHandler();
  }, []);
  return (
    <Box sx={{ py: 3, pt: 5, minHeight: "79vh" }}>
      {isLoading && <CustomLoader />}
      <Typography
        variant="h3"
        sx={{
          color: "#0096A4",
          pb: 3,
          "@media(max-width:992px)": {
            fontSize: "24px",
          },
        }}
      >
        Terms & Bedingungen
      </Typography>
      <Stack
        direction={"column"}
        spacing={2}
        sx={{
          "& .MuiTypography-root": {
            fontSize: "20px",
            lineHeight: "normal",
            letterSpacing: "1px",
            fontWeight: "400",
            marginBottom: "19px",
            wordBreak: "break-all",
          },
        }}
      >
        <Typography
          sx={{
            "& ul": { listStyle: "none", wordBreak: "break-all" },
            "@media(max-width:992px)": {
              "& h3": {
                fontSize: "18px",
              },
            },
          }}
        >
          {manageContent?.privacyPolicy && (
            <div
              dangerouslySetInnerHTML={{
                __html: manageContent.termsConditions ?? "",
              }}
            />
          )}
        </Typography>
      </Stack>
    </Box>
  );
};
export default TermsConditions;
