import { request } from "../api";
import { ErrorResult, SuccessResult } from "../runtimeType";
import { ManageContentTypes } from "./manageContent.Types";
export const getAllContents = async (): Promise<
  SuccessResult<ManageContentTypes> | ErrorResult
> => {
  const response = await request({
    url: "/manage_content/",
    method: "get",
  });
  return response;
};
