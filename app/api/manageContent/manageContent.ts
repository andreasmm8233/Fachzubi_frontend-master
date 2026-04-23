import { request } from "../api";
import { ErrorResult, SuccessResult } from "../runtimeType";
import { ManageContent } from "./manageContent.type";

export const getManageContentApi = async (): Promise<SuccessResult<ManageContent> | ErrorResult>=>{
    const response = await request({
        url:"/manage_content",
        method:"get"
    });
    if(response.remote==="success"){
        response.data.data={
            privacyPolicy:response.data.data.privacyPolicy,
            termsConditions:response.data.data.termsConditions,
            jobCoverLetter:response.data.data.jobCoverLetter,
            appointment:response.data.data.appointment
        }
    }
    return response
}