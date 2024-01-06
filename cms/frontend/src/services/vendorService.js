import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Create Vendor
export const createVendor = async (vendorData) => {
  try {
    const response = await axios({
      method:"post",
      baseURL:"http://localhost:5000/api/",
      url:"vendors/",
      data:vendorData
    })
    console.log(vendorData)
    if (response.statusText === "OK") {
      console.log("Vendor created successfully. (vendorService.js)")
      toast.success("Vendor created successfully");
    }
    return response.data;
  } catch (error) {
   
    toast.error("message");
  }
};