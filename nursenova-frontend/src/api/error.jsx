import axios from "axios";
import { toast } from 'react-toastify';

const errorHandle = (error) => {
  const axiosError = error;

  if (axiosError.response && axiosError.response.data) {
    const errorResponse = axiosError.response.data;
    if (errorResponse) {
      toast.error(errorResponse);
    } else {
      console.log("Error response has no message");
    }
  } else {
    if(axiosError.response.status==403){
      toast.error("Access Denied: Your account does not have the necessary permissions. Please contact support for assistance.");
    }else{

      toast.error("An error occurred. Please try again!");
      console.log(axiosError)
      console.log("axiosError", axiosError.message);
    }
  }
};

export default errorHandle;
