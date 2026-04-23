import { Industry, TransformIndustry } from "./industry.types";

export const transformIndustries = (industries: Industry[]): TransformIndustry[] => {
    return industries.map((industry) => ({
      id: industry._id,
      name: industry.industryName,
    }));
  };