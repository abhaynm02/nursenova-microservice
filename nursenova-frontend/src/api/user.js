import { data } from "autoprefixer";
import Api from "../service/axios";
import userRoutes from "../service/endpoints/UserEndPoints";
import errorHandle from "./error";

export const signup= async (registerData)=>{
    try{
        const response = await Api.post(userRoutes.register,registerData);
        return response;
    }catch(error){
        return errorHandle(error);
    }
}

export const otpVerify =async (data)=>{
    try{
        const response =await Api.post(userRoutes.otpVerification,data);
        return response;
    }catch(error){
       return errorHandle(error);
    }
}

export const login =async (data)=>{
    try{
        const response = await Api.post(userRoutes.login,data);
        return response;
    }catch(error){
            return errorHandle(error);
    }
}
export const reSendOpt= async(data)=>{
    try{
        const response =await Api.post(userRoutes.resendotp,data);
        return response;
    }catch(error){
        return errorHandle(error);
    }
}