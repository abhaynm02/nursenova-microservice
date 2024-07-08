
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
export const getProfile=async(username)=>{
    try {
        const response =await Api.get(`${nurseRoutes.getProfile}/${username}`);
        return response;
        
    } catch (error) {
        return errorHandle(error);
    }
}
export const updateProfile=async(data)=>{
    try {
        const response=await Api.post(nurseRoutes.updateProfile,data);
        return response;
        
    } catch (error) {
        return errorHandle(error);
    }
}

export const getNurseDetails=async(usernae)=>{
    try {
       const response=await Api.get(`${nurseRoutes.getNurseDetails}/${usernae}`);
       return response;
        
    } catch (error) {
        return errorHandle(error);
    }
}

export const showServices =async()=>{
    try {
        const response =await Api.get(nurseRoutes.showServices);
        return response;
    } catch (error) {
        return errorHandle(error);
    }
}

export const addService =async(data)=>{
    try {
        const response =await Api.post(nurseRoutes.addService,data);
        return response;
        
    } catch (error) {
        return errorHandle(error);
    }
}

export const fetchServices =async(username,page,size,searchKey)=>{
    try {
         const response =await Api.get(`${nurseRoutes.fetchServices}?username=${username}&page=${page}&size=${size}&searchKey=${searchKey}`);
         return response;
    } catch (error) {
        return errorHandle(error);
    }
}

export const blcokServices =async(serviceId,status)=>{

    try {
        const response =await Api.post(`${nurseRoutes.blcokService}?serviceId=${serviceId}&status=${status}`);
        return response;
        
    } catch (error) {
        return errorHandle(error);
    }
}

export const findServiceById= async(serviceId)=>{
    try {
        const response = await Api.get(`${nurseRoutes.findServiceById}?serviceId=${serviceId}`);
        return response;
        
    } catch (error) {
        return errorHandle(error);
    }

}

export const deleteDuty =async(dutyId)=>{
    try {
        const response =await Api.delete(`${nurseRoutes.deleteDuty}/${dutyId}`)
        
    } catch (error) {
        return errorHandle(error);
        
    }
}

export const updateProfilePicture =async(userName,data)=>{
    try {
        const response =await Api.post(`${nurseRoutes.updateProfilePicture}?username=${userName}`,data,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        });
        return response;
        
    } catch (error) {
        return errorHandle(error);
    }
}
export const createSlotForBooking =async(userName,startDate,endDate)=>{
    try {
        const response =await Api.post(`${nurseRoutes.createSlotForBooking}/${userName}?startDate=${startDate}&endDate=${endDate}`);
        return response;
        
    } catch (error) {
        return errorHandle(error);
        
    }
}

export const findCreateSlots =async(userName)=>{
    try {
        const response =await Api.get(`${nurseRoutes.findCreateSlots}/${userName}`);
        return response;
    } catch (error) {
        return errorHandle(error);
    }
}

export const deleteSlotById =async(slotId)=>{
    try {
        const response =await Api.delete(`${nurseRoutes.deleteSlotById}/${slotId}`);
        return response;
        
    } catch (error) {
        return errorHandle(error);
    }
}