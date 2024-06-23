
import { data } from "autoprefixer";
import Api from "../service/axios";
import nurseRoutes from "../service/endpoints/NurseEndPoints";
import errorHandle from "./error";

export const details =async(data)=>{
    try {
        const response =await Api.post(nurseRoutes.details,data,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        });
        return response;
        
    } catch (error) {
        return errorHandle(error);
    }

}

export const registerNurse =async(data)=>{
    try {
        const response = await Api.post(nurseRoutes.registerNurse,data);
        return response;
        
    } catch (error) {
        return errorHandle(error);
    }
}

export const verifyOtp =async(data)=>{
    try {
        const response = await Api.post(nurseRoutes.verifyOtp,data);
        return response;
        
    } catch (error) {
        return errorHandle(error)
    }
}