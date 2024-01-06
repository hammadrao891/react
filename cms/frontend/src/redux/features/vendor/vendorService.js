import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/vendors/`;

// Create New Vendor
const createVendor = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

// Get all vendors
const getVendors = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Delete a Vendor
const deleteVendor = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};
// Get a Vendor
const getVendor = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};
// Update Vendor
const updateVendor = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};

const vendorService = {
  createVendor,
  getVendors,
  getVendor,
  deleteVendor,
  updateVendor,
};

export default vendorService;
