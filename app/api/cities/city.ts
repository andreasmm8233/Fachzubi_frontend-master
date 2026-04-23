import { request } from "../api";
import { ErrorResult, SuccessResult } from "../runtimeType";
import { transformCities } from "./helper";
import {
    City,
    TransformCity,
    TransformCityForFilters,
    getAllCitiesType,
  } from "./city.types";
export const getCity = async (): Promise<
  SuccessResult<TransformCity[]> | ErrorResult
> => {
  const response = await request({
    url: "/cities/get-city-frontend",
    method: "get",
  });
  if (response.remote === "success") {
    response.data.data = transformCities(response.data.data);
    return response;
  }
  return response;
};