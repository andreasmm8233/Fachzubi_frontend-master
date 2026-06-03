import { request } from "../api";
import { ErrorResult, SuccessResult } from "../runtimeType";
import { Job, JobWithCount } from "./jobs.types";
import { transformJobsData } from "./helper";

// Fetch jobs filtered by city ID
export const getJobsByCityApi = async (
  cityId: string
): Promise<SuccessResult<JobWithCount> | ErrorResult> => {
  const response = await request({
    url: `/job/?filter=DSC&isFillter=&pageNo=1&recordPerPage=&searchValue=&slectedCity=${cityId}&isFrontend=true`,
    method: "get",
  });
  if (response.remote === "success") {
    const rawData = response.data.data;
    // Backend may return jobs in .jobs array or directly as an array
    const jobsArray = rawData?.jobs ?? rawData?.data ?? (Array.isArray(rawData) ? rawData : []);
    const transformedJobs = transformJobsData(jobsArray);
    response.data.data = {
      data: transformedJobs,
      count: rawData?.count ?? transformedJobs.length,
    };
    return response;
  }
  return response;
};
