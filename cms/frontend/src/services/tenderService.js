import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Create Tender
export const createTender = async (tenderData) => {
  try {
    const response = await axios({
      method:"post",
      baseURL:"http://localhost:5000/api/",
      url:"tenders/",
      data:tenderData
    })
    console.log("Tender data in tenderService.js: ")
    console.log(tenderData)
    if (response.statusText === "OK") {
      console.log("Tender created successfully. (tenderService.js)")
      toast.success("Tender created successfully");
    }
    return response.data;
  } catch (error) {
   
    toast.error("message");
  }
};

// Get All Tender
export const getTenders = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/tenders/`);
    
        if (response.statusText === "OK") {
          console.log("Tenders fetched successfully. (tenderService.js)");
        }
    
        return response.data;
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch tenders");
        throw error;
      }
    };