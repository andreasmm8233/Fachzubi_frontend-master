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
import SearchBar from "./searchbar";
import { useEffect, useState, useRef } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { RotatingLines } from "react-loader-spinner";
import JobCard from "@/components/Jobcard";
import { getAllJobs, getAllSuggestion } from "../api/job/job";
import { Job } from "../api/job/jobs.types";
import { useDebounce } from "@uidotdev/usehooks";
import { getAllIndustries } from "../api/industries/industry";
import { TransformIndustry } from "../api/industries/industry.types";
import { DashBoardData } from "../api/employer/employer.types";
import { dashBoardDataApi } from "../api/employer/employer";
const Jobs = () => {
  const [isFillter, setIFilter] = useState(""); //for industry
  const [industry, setIndustry] = useState({
    id: "",
    label: "",
  });
  const [isShort, setIShort] = useState("DSC");
  const [jobList, setJobList] = useState<Job[]>([]);
  const [pageNo, setPageNo] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [suggestion, setSuggestion] = useState<string[]>([]);
  const [slectedCity, setSelectedCity] = useState<string[]>([]);
  const [industries, setIndustries] = useState<TransformIndustry[]>([]);
  const [dashBoard, setDashBoard] = useState<DashBoardData>();
  const debounce = useDebounce(searchValue, 500);
  const [isLoading, setIsLoading] = useState(true);
  const [moreData, setMoreData] = useState(true);
  const targetRef = useRef(null);
  const moreDataRef = useRef(moreData);

  const handleGetAllIndustry = async () => {
    const response = await getAllIndustries();
    if (response.remote === "success") {
      setIndustries(response.data.data);
    }
  };

  const handleGetDashBoardData = async () => {
    const response = await dashBoardDataApi();
    if (response.remote === "success") {
      setDashBoard(response.data.data);
    }
  };

  const handleChangeShort = (event: SelectChangeEvent) => {
    setIShort(event.target.value as string);
  };
  const handleSuggestion = async (suggestionValue: string) => {
    const response = await getAllSuggestion(suggestionValue);
    if (response.remote === "success") {
      const newSuggestion: string[] = [];
      response.data.data.forEach((item) => {
        if (!newSuggestion.includes(item.company)) {
          newSuggestion.push(item.company);
        }
        if (!newSuggestion.includes(item.jobTitle)) {
          newSuggestion.push(item.jobTitle);
        }
      });
      setSuggestion(newSuggestion);
    }
  };

  const handleGetAllJobs = async (pageNo?: number) => {
    setIsLoading(true);
    const payload = {
      searchValue: searchValue,
      isFillter,
      slectedCity,
      pageNo: pageNo ? pageNo : 1,
      filter: isShort,
      recordPerPage: "",
    };

    const response = await getAllJobs(payload);

    if (response.remote === "success") {
      setJobList(response.data.data.data);
      if (response.data.data.count === pageNo) {
        moreDataRef.current = false;
      } else {
        moreDataRef.current = true;
      }

      setIsLoading(false);
    }
  };

  const handleIntersection = (entries: any) => {
    const target = entries[0];
    if (target.isIntersecting && moreDataRef.current) {
      setPageNo((prevPage) => prevPage + 1);
    }
  };
  useEffect(() => {
    moreDataRef.current = moreData;
  }, [moreData]);
  useEffect(() => {
    handleSuggestion(searchValue);
  }, [debounce]);

  useEffect(() => {
    handleGetAllIndustry();
    handleSuggestion("");
    handleGetDashBoardData();
  }, []);

  useEffect(() => {
    if (dashBoard?.jobs === jobList.length) {
      setMoreData(false);
    }
  }, [dashBoard?.jobs, jobList.length]);
  useEffect(() => {
    if (pageNo) {
      handleGetAllJobs(pageNo);
    }
  }, [pageNo]);
  useEffect(() => {
    let timeoutId: any = "";

    // Wrap the observer setup in a setTimeout
    timeoutId = setTimeout(() => {
      if (moreDataRef.current) {
        const observer = new IntersectionObserver(handleIntersection, {
          root: null,
          rootMargin: "0px",
          threshold: 0.1,
        });

        if (targetRef.current) {
          observer.observe(targetRef.current);
        }

        return () => {
          observer.disconnect();
        };
      }
    }, 3000); // 2000 milliseconds = 2 seconds

    // Clear the timeout on component unmount
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    handleGetAllJobs();
  }, [isFillter, slectedCity, isShort]);
  return (
    <div>
      <Box sx={{ py: 3, pt: 10, "@media (max-width:992px)":{pt:3} }}>
        <Container maxWidth="md">
          <SearchBar
            pageNo={pageNo}
            handleGetAllJobs={handleGetAllJobs}
            setPageNo={setPageNo}
            setSearchValue={setSearchValue}
            searchValue={searchValue}
            suggestion={suggestion}
            setSelectedCity={setSelectedCity}
          />
          <Stack
            direction={{xs:"column", lg:"row"}}
            spacing={2}
            alignItems={"center"}
            justifyContent={{xs:"center", lg:"space-between"}}
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
                "& .MuiAutocomplete-inputRoot .MuiAutocomplete-input":{
                  padding:"1.5px 4px 7.5px 0px !important"
                }
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
                  setIndustry({
                    id: "",
                    label: "",
                  });
                  setIFilter("");
                }
              }}
              renderInput={(params) => (
                <TextField {...params} label="Branche auswählen" />
              )}
            />
            <Box
              sx={{
                color: "#0096A4",
                fontsize: "16px",
                fontWeight: 400,
                "@media (max-width: 480px)": {
                  fontSize: "12px",
                },
              }}
            >
              {jobList.length} Jobs gefunden
            </Box>
            <Select
              sx={{
                width: "150px",
                "@media (max-width:992px)": {
                  width: "100%",
           
                },
                "& fieldset": {},
                "&.MuiInputBase-root": {
                  background: "#fff",
                  borderRadius: "5px",
                },
                "& .MuiSelect-select": {
                  paddingRight: "16px !important",
                  padding: "10px",
                },
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={isShort}
              defaultValue="Industry"
              onChange={handleChangeShort}
              displayEmpty
              IconComponent={() => (
                <KeyboardArrowDownIcon sx={{ marginRight: "10px" }} />
              )}
            >
              <MenuItem value={""} disabled>
                Sortiere nach
              </MenuItem>
              <MenuItem value={"ASC"}>Älteste</MenuItem>
              <MenuItem value={"DSC"}>Neueste</MenuItem>
            </Select>
          </Stack>
          <>
           
            {jobList.length != 0 && (
              <div>
                {jobList.map((item, index) => (
                  <JobCard key={index} url={`/jobs/${item.id}`} item={item} />
                ))}
              </div>
            )}
            {dashBoard?.jobs === jobList.length ? (
              <>
                <div className="loader" key={0}>
                  <Box sx={{ textAlign: "center", mt: 2 }}>Keine Jobs mehr</Box>
                </div>
              </>
            ) : (
              <>
                {isLoading ? (
                  <div className="loader" key={0}>
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
                  </div>
                ) : (
                  <></>
                )}
              </>
            )}
          </>
        </Container>
      </Box>
      <div ref={targetRef} style={{ height: "10px" }} />
    </div>
  );
};
export default Jobs;
