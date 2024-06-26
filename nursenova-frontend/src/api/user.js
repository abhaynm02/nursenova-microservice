
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

export const showServices =async()=>{
    try {
        const response = await Api.get(userRoutes.services);
        return response;
        
    } catch (error) {
        return errorHandle(error);
    }
}

export const getProfile =async(username)=>{
    try {
        const response=await Api.get(`${userRoutes.profile}/${username}`);
        return response;
        
    } catch (error) {
        return errorHandle(error);
    }
}

export const updateProfile =async(data)=>{
    try {
        const response=await Api.post(userRoutes.updateProfile,data);
        return response;
        
    } catch (error) {
        return errorHandle(error);
        
    }
}
export const changePassword =async(data)=>{
    try {
        const response =await Api.post(userRoutes.changePassword,data);
        return response;
    } catch (error) {
        return errorHandle(error);
    }
}