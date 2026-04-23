export interface Job {
  city: string;
  company: string;
  companyLogo: string;
  jobTitle: string;
  startDate: string;
  email: string;
  additionalEmail: string;
  address: string;
  zipCode: string;
  jobDescription: string;
  status: string;
  _id?: string;
  id?: string;
  companyId?: string;
  createdAt: string;
  industryName: string;
}
export interface getAllJobsType {
  searchValue: string;
  isFillter: string;
  slectedCity: string[];
  pageNo: number;
  filter: string;
  recordPerPage: string;
}
export interface JobWithCount {
  data: Job[];
  count: number;
}
export interface UpdateJob {
  city?: { id: string; label: string };
  industryName?: { id: string; label: string };
  company?: { id: string; label: string };
  jobTitle?: string;
  startDate?: string;
  email?: string;
  additionalEmail?: string;
  address?: string;
  zipCode?: string;
  attachments?: any;
  deletedAttachment?: string[];
  jobDescription?: string;
  status?: boolean;
  id: string;
}

export interface GetAllSuggestion {
  _id: string;
  jobTitle: string;
  company: string;
}

export interface Attachement {
  fileName: string;
  filePath: string;
}

export interface City {
  id: string;
  name: string;
  startTime: Date;
  endTime: Date;
  directionLink: string;
  address: string;
  zipCode: string;
  _id?: string;
}

export interface JobDetails {
  id: string;
  city: City;
  allCity?: City[];
  videoLink?: string[];
  jobImages?: any;
  industryName: string;
  company: {
    id: string;
    companyName: string;
    videoLink: string[];
    companyLogo: string;
    companyDescription: string;
    companyImages: string[];
    phoneNo?: string;
  };
  jobTitle: string;
  startDate: string;
  email: string;
  additionalEmail: string;
  address: string;
  zipCode: string;
  jobDescription: string;
  attachments: Attachement[];
  createdAt: string;
  phoneNo?: string;
  jobTypeName?: string;
}

export interface JobApplicationPayload {
  jobId: string;
  applicantName: string;
  email: string;
  phone: string;
  aboutMe: string;
  coverLetter: string;
}
