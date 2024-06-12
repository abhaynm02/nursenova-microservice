import Api from "../service/axios";
import errorHandle from "./error";
import adminRoutes from "../service/endpoints/AdminEndPoints";
import { data } from "autoprefixer";

export const allServices =async()=>{
    try{
        const response =await Api.get(adminRoutes.services);
        return response;

    }catch(error){
        return errorHandle(error);
    }

}

export const addService= async (data)=>{
    try{
        const response = await Api.post(adminRoutes.addServices,data);
        return response;

    }catch(error){
        return errorHandle(error);

    }
}
export const findServiceById =async (id)=>{
    try {
        const response =await Api.get(`${adminRoutes.findServiceById}/${id}`)
        return response;
        
    } catch (error) {
        return errorHandle(error);
        
    }
}

export const editService =async (data)=>{
    try {
        const response =await Api.post(adminRoutes.editService,data);
        return response;
        
    } catch (error) {
        return errorHandle(error);
        
    }
}

export const blockOrUnblockService =async (data)=>{
    try {
        const response=await Api.post(adminRoutes.blockService,data);
        return response;
        
    } catch (error) {
        return errorHandle(error);
    }
}

export const findAllUsers =async()=>{
    try {
        const response=await Api.get(adminRoutes.allUsers);
        return response;
        
    } catch (error) {
        return errorHandle(error);
    }
}

export const blockOrUnblockUser =async(data)=>{
    try {
        const response =Api.post(adminRoutes.blockUser,data);
        return response;
        
    } catch (error) {
        return errorHandle(error);
    }

}