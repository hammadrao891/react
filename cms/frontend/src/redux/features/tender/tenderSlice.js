import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import tenderService from "./tenderService";
import { toast } from "react-toastify";

const initialState = {
  tender: null,
  tenders: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  totalStoreValue: 0,
  outOfStock: 0,
  category: [],
};

// Create New Tender
export const createTender = createAsyncThunk(
  "tender/create",
  async (formData, thunkAPI) => {
    try {
      return await tenderService.createTender(formData);
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

// Get all tenders
export const getTenders = createAsyncThunk(
  "tender/getAll",
  async (_, thunkAPI) => {
    try {
      return await tenderService.getTenders();
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

// Delete a Tender
export const deleteTender = createAsyncThunk(
  "tenders/delete",
  async (id, thunkAPI) => {
    try {
      return await tenderService.deleteTender(id);
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

// Get a tender
export const getTender = createAsyncThunk(
  "tenders/getTender",
  async (id, thunkAPI) => {
    try {
      return await tenderService.getTender(id);
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
// Update tender
export const updateTender = createAsyncThunk(
  "tenders/updateTender",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await tenderService.updateTender(id, formData);
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

const tenderSlice = createSlice({
  name: "tender",
  initialState,
  reducers: {
    // CALC_STORE_VALUE(state, action) {
    //   const tenders = action.payload;
    //   const array = [];
    //   tenders && tenders.map((item) => {
    //     const { price, quantity } = item;
    //     const tenderValue = price * quantity;
    //     return array.push(tenderValue);
    //   });
    //   const totalValue = array.reduce((a, b) => {
    //     return a + b;
    //   }, 0);
    //   state.totalStoreValue = totalValue;
    // },
    // CALC_OUTOFSTOCK(state, action) {
    //   const tenders = action.payload;
    //   const array = [];
    //  tenders && tenders.map((item) => {
    //     const { quantity } = item;

    //     return array.push(quantity);
    //   });
    //   let count = 0;
    //   array.forEach((number) => {
    //     if (number === 0 || number === "0") {
    //       count += 1;
    //     }
    //   });
    //   state.outOfStock = count;
    // },
    // CALC_CATEGORY(state, action) {
    //   const tenders = action.payload;
    //   const array = [];
    //  tenders && tenders.map((item) => {
    //     const { category } = item;

    //     return array.push(category);
    //   });
    //   const uniqueCategory = [...new Set(array)];
    //   state.category = uniqueCategory;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTender.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTender.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.tenders.push(action.payload);
        console.log("Tender added successfully. (tenderSlice.js)")
        toast.success("Tender added successfully");
      })
      .addCase(createTender.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getTenders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTenders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.tenders = action.payload;
      })
      .addCase(getTenders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteTender.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTender.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Tender deleted successfully");
      })
      .addCase(deleteTender.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getTender.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTender.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.tender = action.payload;
      })
      .addCase(getTender.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateTender.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTender.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Tender updated successfully");
      })
      .addCase(updateTender.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

// export const { CALC_STORE_VALUE, CALC_OUTOFSTOCK, CALC_CATEGORY } =
//   tenderSlice.actions;

export const selectIsLoading = (state) => state.tender.isLoading;
export const selectTender = (state) => state.tender.tender;
export const selectTotalStoreValue = (state) => state.tender.totalStoreValue;
export const selectOutOfStock = (state) => state.tender.outOfStock;
export const selectCategory = (state) => state.tender.category;

export default tenderSlice.reducer;
