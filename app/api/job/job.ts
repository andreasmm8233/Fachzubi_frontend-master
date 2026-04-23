import urlcat from "urlcat";
import { request } from "../api";
import {
  GetAllSuggestion,
  Job,
  JobApplicationPayload,
  JobDetails,
  JobWithCount,
  getAllJobsType,
} from "./jobs.types";
import { transformJobDetail, transformJobsData } from "./helper";
import { ErrorResult, SuccessResult } from "../runtimeType";
import queryString from "query-string";

// Function to get all employers
export const getAllJobs = async (
  payload: getAllJobsType
): Promise<SuccessResult<JobWithCount> | ErrorResult> => {
  const queryStringResult = queryString.stringify(payload);
  const url = urlcat(`/job/?${queryStringResult}&isFrontend=true`, {});
  const response = await request({
    url,
    method: "get",
  });
  if (response.remote === "success") {
    response.data.data.data = transformJobsData(response.data.data.jobs);
    response.data.data.count = response?.data?.data?.count;
    return response;
  }
  return response;
};

export const getAllSuggestion = async (
  suggestion: string
): Promise<SuccessResult<GetAllSuggestion[]> | ErrorResult> => {
  const url = urlcat("/job/get-suggestion", {
    suggestion,
  });
  const response = await request({
    url,
    method: "get",
  });
  return response;
};

export const getJobDetailApi = async (
  payload: string
): Promise<SuccessResult<JobDetails> | ErrorResult> => {
  const response = await request({
    url: `/job/${payload}`,
    method: "get",
  });
  if (response.remote === "success") {
    response.data.data = transformJobDetail(response.data.data);
  }
  return response;
};

export const addApplicationApi = async (payload: JobApplicationPayload) => {
  const response = await request({
    url: `/job/job-application`,
    method: "post",
    data: payload,
  });
  return response;
};
