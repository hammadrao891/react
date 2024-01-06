import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import tenderReducer from "../redux/features/tender/tenderSlice";
import filterReducer from "../redux/features/tender/filterSlice";
import vendorReducer from "../redux/features/vendor/vendorSlice";
import categoryReducer from "../redux/features/category/categorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tender: tenderReducer,
    filter: filterReducer,
    vendor: vendorReducer,
    category: categoryReducer,
  },
});
