
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

export const forgotPassword =async(data)=>{
    try{
        const response =await Api.post(userRoutes.forgotpassword,data);
        return response;

    }catch(error){
        return errorHandle(error)
    }
}

export const otpVerificationForgotpassword =async(data)=>{
    try{
        const response =await Api.post(userRoutes.otpVerificationForgotpassword,data);
        return response;

    }catch(error){
        return errorHandle(error);
    }
}
 
export const updatePassword =async(data)=>{
    try{
        const response = await Api.post(userRoutes.updatePassword,data);
        return response;

    }catch(error){
        return errorHandle(error);
    }
}