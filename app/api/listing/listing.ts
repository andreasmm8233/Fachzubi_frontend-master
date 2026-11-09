// Public company/job listing endpoints used by the /unternehmen and /stellen
// pages (same calls as the public companies/jobs pages in the admin app).
import urlcat from "urlcat";
import { request } from "../api";
import { ErrorResult, SuccessResult } from "../runtimeType";

export interface ListingQuery {
  searchValue?: string;
  pageNo?: number;
  filter?: string;
  recordPerPage?: string;
  letter?: string;
  slectedCity?: string;
}

const toQueryParams = (payload: ListingQuery) => {
  const { searchValue, pageNo, filter, recordPerPage, letter, slectedCity } = payload;
  const queryParams: Record<string, string | number> = {};
  if (searchValue) queryParams.searchValue = searchValue;
  if (pageNo) queryParams.pageNo = pageNo;
  if (filter) queryParams.filter = filter;
  if (recordPerPage) queryParams.recordPerPage = recordPerPage;
  if (letter) queryParams.letter = letter;
  if (slectedCity) queryParams.slectedCity = slectedCity;
  return queryParams;
};

export const getAllPublicEmployers = async (
  payload: ListingQuery
): Promise<SuccessResult<any> | ErrorResult> => {
  return request({
    url: urlcat("/employer/get-all-emp-frontend", toQueryParams(payload)),
    method: "GET",
  });
};

export const getPublicCompanyDetail = async (
  companyId: string
): Promise<SuccessResult<any> | ErrorResult> => {
  return request({
    url: `/employer/company-Detail/${companyId}`,
    method: "GET",
  });
};

const transformJobsData = (rawJobs: any[]) =>
  rawJobs.map((rawJob: any) => {
    const createdAtDate = new Date(rawJob.createdAt);
    return {
      id: rawJob._id,
      company: rawJob.company,
      companyLogo: rawJob.companyLogo,
      companyId: rawJob.companyId,
      jobTitle: rawJob.jobTitle,
      startDate: rawJob.startDate
        ? new Date(rawJob.startDate).toLocaleDateString()
        : "",
      email: rawJob.email,
      count: rawJob.count ? rawJob.count.applicationCount : "0",
      additionalEmail: rawJob.additionalEmail,
      address: rawJob.address,
      zipCode: rawJob.zipCode,
      jobDescription: rawJob.jobDescription,
      status: rawJob.status ? "Active" : "Inactive",
      city: rawJob.city,
      date: createdAtDate.toLocaleDateString(),
      createdAt: createdAtDate.toLocaleDateString(),
      industryName: rawJob.industryName,
      jobTypeName: rawJob.jobTypeName,
    };
  });

export const getAllJobs = async (
  payload: ListingQuery
): Promise<SuccessResult<any> | ErrorResult> => {
  const response = await request({
    url: urlcat("/job/", toQueryParams(payload)),
    method: "get",
  });
  if (response.remote === "success") {
    const rawJobsArray = response.data.data.jobs || response.data.data.data || [];
    const transformed: any = transformJobsData(rawJobsArray);
    // Some responses use 'total', some use 'count'.
    transformed.count = response.data.data.count || response.data.data.total || 0;
    response.data.data.data = transformed;
  }
  return response;
};

export const getJobDetailById = async (
  id: string
): Promise<SuccessResult<any> | ErrorResult> => {
  return request({
    url: `/job/${id}`,
    method: "get",
  });
};
