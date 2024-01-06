import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import vendorService from "./vendorService";
import { toast } from "react-toastify";

const initialState = {
    vendor: null,
    vendors: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  };

// Create New Vendor
export const createVendor = createAsyncThunk(
    "vendor/create",
    async (formData, thunkAPI) => {
      try {
        return await vendorService.createVendor(formData);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  
  // Get all vendors
  export const getVendors = createAsyncThunk(
    "vendor/getAll",
    async (_, thunkAPI) => {
      try {
        return await vendorService.getVendors();
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  
  // Delete a Vendor
  export const deleteVendor = createAsyncThunk(
    "vendors/delete",
    async (id, thunkAPI) => {
      try {
        return await vendorService.deleteVendor(id);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  
  // Get a vendor
  export const getVendor = createAsyncThunk(
    "vendors/getVendor",
    async (id, thunkAPI) => {
      try {
        return await vendorService.getVendor(id);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  // Update vendor
  export const updateVendor = createAsyncThunk(
    "vendors/updateVendor",
    async ({ id, formData }, thunkAPI) => {
      try {
        return await vendorService.updateVendor(id, formData);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  
  const vendorSlice = createSlice({
    name: "vendor",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder
        .addCase(createVendor.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createVendor.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          console.log(action.payload);
          state.vendors.push(action.payload);
          toast.success("Vendor added successfully");
        })
        .addCase(createVendor.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          toast.error(action.payload);
        })
        .addCase(getVendors.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getVendors.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          console.log(action.payload);
          state.vendors = action.payload;
        })
        .addCase(getVendors.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          toast.error(action.payload);
        })
        .addCase(deleteVendor.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(deleteVendor.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          toast.success("Vendor deleted successfully");
        })
        .addCase(deleteVendor.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          toast.error(action.payload);
        })
        .addCase(getVendor.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getVendor.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.vendor = action.payload;
        })
        .addCase(getVendor.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          toast.error(action.payload);
        })
        .addCase(updateVendor.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateVendor.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          toast.success("Vendor updated successfully");
        })
        .addCase(updateVendor.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          toast.error(action.payload);
        });
    },
  });
  
  // export const { } =
  //   vendorSlice.actions;
  
  export const selectIsLoading = (state) => state.vendor.isLoading;
  export const selectVendor = (state) => state.vendor.vendor;
  
  export default vendorSlice.reducer;
  