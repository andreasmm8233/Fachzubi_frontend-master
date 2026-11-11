import { request } from "../api";
import { ErrorResult, SuccessResult } from "../runtimeType";

export interface ContactQueryPayload {
  companyName: string;
  email: string;
  phoneNo: string;
  description?: string;
}

// Contact form on /kontakt; the messages show up in admin → Contact Queries
export const sendContactQuery = async (
  payload: ContactQueryPayload
): Promise<SuccessResult<any> | ErrorResult> => {
  return request({
    url: "/contact/",
    method: "post",
    data: payload,
  });
};
