"use client";
import { SVG } from "@/components/icon";

import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  IconButton,
  InputBase,
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getCity } from "../api/cities/city";
import { TransformCity } from "../api/cities/city.types";
import CustomLoader from "@/components/SpinLoader";
import "react-toastify/dist/ReactToastify.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      marginTop: "10px",
    },
  },
};
const SearchBar = ({
  searchValue,
  setSearchValue,
  suggestion,
  setSelectedCity,
  setPageNo,
  handleGetAllJobs,
  pageNo,
}: {
  searchValue?: string;
  setSearchValue?: (data: string) => void;
  suggestion?: string[];
  setSelectedCity?: (data: string[]) => void;
  setPageNo?: (data: number) => void;
  handleGetAllJobs?: () => Promise<void>;
  pageNo?: number;
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [location, setLocation] = useState<string[]>([]);
  const [cities, setCities] = useState<TransformCity[]>([]);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getCities() {
      const cities = await getCity();
      if (cities.remote === "success") {
        setCities(cities.data.data);
      }
    }
    getCities();
  }, []);
  /* trigger when search in focus */
  const handleFocus = () => {
    setShow(!show);
    if (searchTerm === "") {
      setSearchTerm("");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (setSearchValue) {
      setSearchValue(value);
    }
    const fetchedSuggestions: any = suggestion?.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
    if (fetchedSuggestions) {
      setSuggestions(fetchedSuggestions);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    if (suggestion && setSearchValue) {
      setSearchValue(suggestion);
    }
    setSuggestions([]);
  };

  const handleChangeLocation = (event: SelectChangeEvent<typeof location>) => {
    const {
      target: { value },
    } = event;
    setLocation(value as string[]);
    if (setSelectedCity) {
      setSelectedCity(value as string[]);
    }
  };

  useEffect(() => {
    if (setSelectedCity) {
      setSelectedCity(location);
    }
  }, [location]);

  return (
    <>
      {isLoading && <CustomLoader />}
      <Box
        sx={{
          background: "#fff",
          borderRadius: "10px",
          padding: "10px",
          display: "flex",
          alignItems: "center",
          "@media (max-width:992px)": { flexDirection: "column" },
        }}
      >
        <Stack
          direction={"row"}
          spacing={1}
          alignItems={"center"}
          sx={{
            "@media (max-width:992px)": {
              width: "100%",
              borderBottom: "1px solid #ccc",
            },
          }}
        >
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SVG.Search />
          </IconButton>
          <InputBase
            sx={{
              width: "300px",
              "@media (max-width:992px)": { width: "100%" },
            }}
            type="text"
            value={searchTerm}
            placeholder={"Suchbegriff, Stelle oder Unternehmen"}
            onFocus={handleFocus}
            onBlur={() => {
              setShow(!show);
            }}
            onChange={handleInputChange}
            inputProps={{ "aria-label": "search google maps" }}
          />
        </Stack>
        <Divider
          sx={{
            height: 28,
            m: 0.5,
            "@media (max-width:992px)": { display: "none" },
          }}
          orientation="vertical"
        />
        <Stack
          direction={"row"}
          spacing={1}
          alignItems={"center"}
          sx={{
            "@media (max-width:992px)": {
              width: "100%",
              borderBottom: "1px solid #ccc",
              mb: 2,
            },
          }}
        >
          <IconButton>
            <SVG.Location />
          </IconButton>
          <Autocomplete
            clearIcon={false}
            sx={{
              width: "350px",
              "@media (max-width:992px)": { width: "100%" },
              "& fieldset": {
                display: "none",
              },
              "& .MuiInputBase-root": {
                border: "0px !important",
                borderRadius: "0px",
              },
              "& .MuiChip-root": {
                background: "#F1841D",
                color: "#fff",
                "& .MuiChip-deleteIcon": {
                  color: "rgba(255, 255, 255, 0.7)",
                },
              },
            }}
            multiple
            disableCloseOnSelect
            limitTags={2}
            id="tags-standard"
            options={cities.map((item) => ({
              label: item.name,
              address: item.address,
              startTime: item.startTime,
              endTime: item.endTime,
              id: item.id,
            }))}
            renderTags={(value, getTagProps) => {
              const numTags = value.length;
              const limitTags = 2;

              return (
                <>
                  {value.slice(0, limitTags).map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      key={index}
                      label={option.label}
                    />
                  ))}

                  {numTags > limitTags && ` +${numTags - limitTags}`}
                </>
              );
            }}
            getOptionLabel={(option) => option.label}
            value={location.map((value) => {
              const newLocation = cities.find((city) => {
                return city.id === value;
              });
              return {
                label: newLocation?.name || "",
                id: value,
                address: newLocation?.address || "",
                startTime: newLocation?.startTime || "",
                endTime: newLocation?.endTime || "",
              };
            })}
            onChange={(event, newValue) => {
              if (newValue) {
                const selectedCities = newValue.map((item) => item.id || "");

                // Remove both occurrences of duplicated elements
                const filteredCities = selectedCities.filter(
                  (city, index, self) => {
                    return (
                      self.indexOf(city) === index &&
                      self.lastIndexOf(city) === index
                    );
                  }
                );

                setLocation(filteredCities);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                placeholder="Standort/Region auswahlen"
              />
            )}
            renderOption={(props, option, { selected }) => (
              <MenuItem {...props}>
                <Checkbox
                  checked={location.includes(option?.id || "")}
                  sx={{ color: "#F1841D", padding: "0px", mr: 2, zIndex: 100 }}
                />
                <ListItemText
                  primary={option?.label}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "block" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {option?.address ? option?.address : ""}
                      </Typography>
                      {option?.startTime !== "Invalid Date" &&
                      option?.endTime !== "Invalid Date"
                        ? option?.startTime + " till " + option?.endTime
                        : ""}
                    </React.Fragment>
                  }
                />
              </MenuItem>
            )}
          />
        </Stack>
        <Button
          variant="contained"
          disabled={isLoading}
          sx={{
            width: "180px",
            ml: 1,
            "@media (max-width:992px)": {
              width: "100%",
              borderBottom: "1px solid #ccc",
            },
          }}
          onClick={async () => {
            if (setPageNo && pageNo && pageNo !== 1) {
              setPageNo(1);
            } else {
              if (handleGetAllJobs) {
                setIsLoading(true);
                await handleGetAllJobs();
                setIsLoading(false);
              }
            }
          }}
        >
          Suchen
        </Button>
      </Box>
      {searchValue ? (
        <>
          {" "}
          {suggestions.length > 0 && (
            <List
              component={Paper}
              sx={{
                width: "300px",
                mt: 1,
                borderRadius: "10px",
                position: "absolute",
                zIndex: 10,
              }}
            >
              {suggestions.map((suggestion, index) => (
                <ListItemButton
                  disableRipple={true}
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </ListItemButton>
              ))}
            </List>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};
export default SearchBar;
