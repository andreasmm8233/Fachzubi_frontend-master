import { request } from "../api";
import { ErrorResult, SuccessResult } from "../runtimeType";
import { transformIndustries } from "./helper";
import { TransformIndustry } from "./industry.types";

export const getAllIndustries =async ():Promise<
SuccessResult<TransformIndustry[]> | ErrorResult
> => {
    const response = await request({
        url:"/industries/get_all_Industry/",
        method:"get"
    });
    if(response.remote==="success"){
        response.data.data = transformIndustries(response.data.data.data)
        return response;
    }
    return response
}