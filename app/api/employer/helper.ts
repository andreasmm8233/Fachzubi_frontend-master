import { transformJobsData } from "../job/helper";
import { Companies, CompanyDetail } from "./employer.types";

export const transformCompanies = (data: any): Companies[] => {
  return data.map((company: any) => {
    return {
      id: company._id,
      companyName: company.companyName,
      industryName: company.industryName,
      companyLogo: company.companyLogo,
    };
  });
};

export const transformCompanyDetail = (company: any): CompanyDetail => {
  const { _id, ...data } = company;
  return {
    ...data,
    id: company._id,
  };
};
