import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Create Category
export const createCategory = async (categoryData) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/categories/`, categoryData);

    if (response.statusText === "OK") {
      console.log("Category created successfully. (categoryService.js)");
      toast.success("Category created successfully");
    }

    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to create category");
    throw error;
  }
};

// Get Categories
export const getCategories = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/categories/`);

    if (response.statusText === "OK") {
        console.log(response.data)
      console.log("Categories fetched successfully. (categoryService.js)");
    }

    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to fetch categories");
    throw error;
  }
};
