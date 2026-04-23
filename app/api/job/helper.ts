import { Job, JobDetails } from "./jobs.types";

export const transformJobsData = (rawJobs: Job[]): Job[] => {
  return rawJobs.map((rawJob) => {
    let isStartDate = false;
    if (rawJob.startDate) {
      isStartDate = true;
    }
    const createdAtDate = new Date(rawJob.createdAt);
    const newStartingDate = new Date(rawJob.startDate);
    return {
      id: rawJob._id,
      company: rawJob.company,
      companyLogo: rawJob.companyLogo,
      companyId: rawJob.companyId,
      jobTitle: rawJob.jobTitle,
      startDate: isStartDate ? newStartingDate.toLocaleDateString() : "",
      email: rawJob.email,
      additionalEmail: rawJob.additionalEmail,
      address: rawJob.address,
      zipCode: rawJob.zipCode,
      jobDescription: rawJob.jobDescription,
      status: rawJob.status ? "Active" : "Inactive",
      city: rawJob.city,
      date: createdAtDate.toLocaleDateString(),
      createdAt: createdAtDate.toLocaleDateString(),
      industryName: rawJob.industryName,
    };
  });
};

export const transformJobDetail = (jobData: any): JobDetails => {
  const newStartingDate = new Date(jobData.startDate);
  const createdAt = new Date(jobData.createdAt);
  let isStartDate = false;
  if (jobData.startDate) {
    isStartDate = true;
  }
  return {
    jobTypeName: jobData.jobTypeName,
    phoneNo: jobData.company.phoneNo || "",
    id: jobData._id,
    videoLink: jobData.videoLink,
    allCity: jobData.city,
    jobImages: jobData.jobImages?.map((item: any) => {
      return item.filepath;
    }),
    city: {
      id: jobData.city._id,
      name: jobData.city.name,
      startTime: jobData.city.startDate,
      endTime: jobData.city.endTime,
      address: jobData.city.address,
      directionLink: jobData.city.directionLink,
      zipCode: jobData.city.zipCode,
    },
    industryName: jobData.industryName.industryName,
    company: {
      id: jobData.company._id,
      companyName: jobData.company.companyName,
      companyLogo: jobData?.company?.companyLogo?.filepath,
      videoLink: jobData.company.videoLink,
      companyDescription: jobData?.company?.companyDescription,
      companyImages: jobData.companyImages.map(
        (data: any) => data?.companyImages?.filepath
      ),
    },
    jobTitle: jobData.jobTitle,
    startDate: isStartDate ? newStartingDate.toLocaleDateString() : "",
    email: jobData.email,
    additionalEmail: jobData.additionalEmail,
    address: jobData.address,
    zipCode: jobData.zipCode,
    jobDescription: jobData.jobDescription,
    attachments: jobData?.attachments?.map((data: any) => {
      return {
        fileName: data?.document?.fileName,
        filePath: data?.document?.filepath,
      };
    }),
    createdAt: createdAt.toLocaleDateString(),
  };
};
