"use client";

import {
  Autocomplete,
  Box,
  Container,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";

import { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import InfiniteScroll from "react-infinite-scroll-component";
import { RotatingLines } from "react-loader-spinner";
import SearchBar from "../jobs/searchbar";
import CompanyCardList from "./CardList";
import { TransformIndustry } from "../api/industries/industry.types";
import { getAllIndustries } from "../api/industries/industry";
import {
  getAllCompanyApi,
  getEmpSuggestionApi,
} from "../api/employer/employer";
import { useDebounce } from "@uidotdev/usehooks";
import { Companies } from "../api/employer/employer.types";
import CustomLoader from "@/components/SpinLoader";

const CompanyList = () => {
  const [isFillter, setIFilter] = useState("");
  const [industry, setIndustry] = useState({
    id: "",
    label: "",
  });
  const [isShort, setIShort] = useState("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [suggestion, setSuggestion] = useState<string[]>([]);
  const [slectedCity, setSelectedCity] = useState<string[]>([]);
  const [industries, setIndustries] = useState<TransformIndustry[]>([]);
  const [companyList, setCompanyList] = useState<Companies[]>([]);

  const [skip, setSkip] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const debounce = useDebounce(searchValue, 500);

  const handleChange = (event: SelectChangeEvent) => {
    setIFilter(event.target.value as string);
  };

  const handleGetAllIndustry = async () => {
    const response = await getAllIndustries();
    if (response.remote === "success") {
      setIndustries(response.data.data);
    }
  };

  const handleChangeShort = (event: SelectChangeEvent) => {
    setIShort(event.target.value as string);
  };

  const handleSuggestion = async (suggestionValue: string) => {
    const response = await getEmpSuggestionApi(suggestionValue);
    if (response.remote === "success") {
      const newSuggestion: string[] = [];
      response.data.data.forEach((item) => {
        if (!newSuggestion.includes(item.companyName)) {
          newSuggestion.push(item.companyName);
        }
        if (!newSuggestion.includes(item.industryName)) {
          newSuggestion.push(item.industryName);
        }
      });
      setSuggestion(newSuggestion);
    }
  };

  const handleGetAllCompany = async () => {
    setHasMore(true);
    setSkip(0);
    const payload = {
      searchValue: searchValue,
      isFillter,
      slectedCity,
      skip: 0,
    };
    const response = await getAllCompanyApi(payload);
    if (response.remote === "success") {
      setCompanyList(response.data.data);
      if (response.data.data.length == 0) {
        setHasMore(false);
      }
    }
  };

  const handleGetAllCompanyOnScroll = async () => {
    setSkip(skip + 10);
    const payload = {
      searchValue: searchValue,
      isFillter,
      slectedCity,
      skip: skip + 10,
    };
    const response = await getAllCompanyApi(payload);
    if (response.remote === "success") {
      if (response.data.data.length > 0) {
        setCompanyList([...companyList, ...response.data.data]);
      } else {
        setHasMore(false);
      }
    }
  };

  useEffect(() => {
    handleGetAllIndustry();
    handleSuggestion("");
    handleGetAllCompany();
  }, []);

  useEffect(() => {
    handleGetAllCompany();
  }, [slectedCity, isFillter]);

  useEffect(() => {
    handleSuggestion(searchValue);
  }, [debounce]);
  return (
    <Box sx={{ py: 3, pt: 10, "@media (max-width:992px)":{pt:3}  }}>
      <Container maxWidth="md">
        <SearchBar
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          suggestion={suggestion}
          handleGetAllJobs={handleGetAllCompany}
          setSelectedCity={setSelectedCity}
        />
        <Stack
          direction={"row"}
          spacing={2}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{ mt: 3, mb: 2 }}
        >
          <Autocomplete
            sx={{
              width: "250px",
              "@media (max-width:992px)": {
                width: "100%",
         
              },
              "& fieldset": {
                display: "none",
              },
              "&.MuiInputBase-root": {
                background: "#fff",
                borderRadius: "5px",
              },
              "& .MuiSelect-select": {
                paddingRight: "16px !important",
                padding: "10px",
              },
            }}
            disablePortal
            disableClearable={false}
            fullWidth
            id="combo-box-demo"
            value={industry}
            options={industries?.map((item) => {
              return { id: item.id, label: item.name };
            })}
            onChange={(e, value: any) => {
              if (value) {
                setIndustry(value);
                setIFilter(value.id);
              }
              if (!value) {
                setIndustry({ id: "", label: "" });
                setIFilter("");
              }
            }}
            renderInput={(params) => (
              <TextField {...params} label="Branche auswählen" />
            )}
          />
        </Stack>
        <InfiniteScroll
          style={{overflow:"hidden"}}
          dataLength={companyList.length}
          next={handleGetAllCompanyOnScroll}
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
          {companyList &&
            companyList.map((company: Companies, index) => (
              <CompanyCardList company={company} key={index} />
            ))}
        </InfiniteScroll>
        {!hasMore && (
          <>
            <Box sx={{ textAlign: "center", mt: 2 }}>Keine Daten mehr</Box>
          </>
        )}
      </Container>
    </Box>
  );
};
export default CompanyList;
