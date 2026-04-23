import { Job } from "../job/jobs.types";

export interface GetAllEmpSuggestion {
  _id: string;
  companyName: string;
  industryName: string;
}

export interface Companies {
  id: string;
  companyName: string;
  industryName: string;
  companyLogo: string;
}

export interface CompanyDetail {
  id: string;
  contactPerson: string;
  companyName: string;
  website: string;
  phoneNo: string;
  address: string;
  zipCode: string;
  companyDescription: string;
  industryName: string;
  companyLogo: string;
  companyImages: string[];
  videoLink: string[];
  email?: string;
}

export interface DashBoardData {
  jobs: number;
  employer: number;
}

export interface AppoinmentPayload {
  companyId: string;
  applicantName: string;
  email: string;
  phone: string;
  aboutMe: string;
  coverLetter: string;
}
