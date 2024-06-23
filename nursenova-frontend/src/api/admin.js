import Api from "../service/axios";
import errorHandle from "./error";
import adminRoutes from "../service/endpoints/AdminEndPoints";
import { data } from "autoprefixer";

export const allServices =async(page,size,searchKey,key)=>{
    try{
        const response =await Api.get(`${adminRoutes.services}?page=${page}&size=${size}&searchKey=${searchKey}&key=${key}`);
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

export const findAllUsers =async(page,size,searchKey)=>{
    try {
        const response=await Api.get(`${adminRoutes.allUsers}?page=${page}&size=${size}&searchKey=${searchKey}`);
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
export const nurseverificationRequests =async(page,size)=>{
    try {
        const response =Api.get(`${adminRoutes.nurserequests}?page=${page}&size=${size}`)
        return response;
        
    } catch (error) {
        return errorHandle(error);
    }
}
export const findByUserName =async(username)=>{
    try {
        const response =await Api.get(`${adminRoutes.viewnurse}/${username}`)
        return response;
    } catch (error) {
        return errorHandle(error);
    }
}

export const approveRequest =async (data)=>{

    try {
        const response =await Api.post(adminRoutes.verifyrequest,data);
        return response;
        
    } catch (error) {
        return errorHandle(error);
    }
}

export const findAllStaffs =async(page,size,searchKey)=>{
    try {
         const response =await Api.get(`${adminRoutes.findAllStaffs}?page=${page}&size=${size}&searchKey=${searchKey}`);
         return response;
    } catch (error) {
        return errorHandle(error);
    }
}

export const blockNurse =async(data)=>{
    try {
        const response =await Api.post(adminRoutes.blocknurse,data)
        return response;
        
    } catch (error) {
        return errorHandle(error);
        
    }
}