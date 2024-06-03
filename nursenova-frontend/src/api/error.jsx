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
    toast.error("An error occurred. Please try again!");
    console.log("axiosError", axiosError.message);
  }
};

export default errorHandle;
