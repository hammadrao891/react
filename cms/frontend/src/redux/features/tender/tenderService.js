import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/tenders/`;

// Create New Tender
const createTender = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

// Get all tenders
const getTenders = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Delete a Tender
const deleteTender = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};
// Get a Tender
const getTender = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};
// Update Tender
const updateTender = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};

const tenderService = {
  createTender,
  getTenders,
  getTender,
  deleteTender,
  updateTender,
};

export default tenderService;
