import { request } from "../api";
import { transformJobsData } from "../job/helper";
import { Job } from "../job/jobs.types";
import { ErrorResult, SuccessResult } from "../runtimeType";
import {
  AppoinmentPayload,
  Companies,
  CompanyDetail,
  DashBoardData,
  GetAllEmpSuggestion,
} from "./employer.types";
import { transformCompanies, transformCompanyDetail } from "./helper";
import queryString from "query-string";

export const getEmpSuggestionApi = async (
  suggestion: string
): Promise<SuccessResult<GetAllEmpSuggestion[]> | ErrorResult> => {
  const response = await request({
    url: `/employer/get-emp-suggesstion?suggesstion=${suggestion}`,
    method: "get",
  });
  return response;
};

export const getAllCompanyApi = async (
  payload: any
): Promise<SuccessResult<Companies[]> | ErrorResult> => {
  const queryStringResult = queryString.stringify(payload);
  const response = await request({
    url: `/employer/get-all-emp-frontend?${queryStringResult}`,
    method: "get",
  });
  if (response.remote === "success") {
    response.data.data = transformCompanies(response.data.data);
    return response;
  }
  return response;
};

export const getCompanyDetailApi = async (
  companyid: string
): Promise<SuccessResult<CompanyDetail> | ErrorResult> => {
  const response = await request({
    url: `/employer/company-detail/${companyid}`,
    method: "get",
  });
  if (response.remote === "success") {
    response.data.data = transformCompanyDetail(response.data.data);
    return response;
  }
  return response;
};

export const dashBoardDataApi = async (): Promise<
  SuccessResult<DashBoardData> | ErrorResult
> => {
  const response = await request({
    url: `/user/dashboard`,
    method: "get",
  });
  if (response.remote === "success") {
    return response;
  }
  return response;
};

export const addAppoinmentApi = async (payload: AppoinmentPayload) => {
  const response = await request({
    url: `employer/add-appoinment`,
    method: "post",
    data: payload,
  });
  return response;
};

export const getJobsByCompanyIdApi = async(companyId:string,skip:number):Promise<SuccessResult<Job[]> | ErrorResult>=>{
  const queryStringResult = queryString.stringify({companyId,skip});
  const response = await request({
    url:`/employer/get-jobs-by-id?${queryStringResult}`,
    method:"get"
  })
  if(response.remote==="success"){
    response.data.data=transformJobsData(response.data.data)
  }
  return response
}