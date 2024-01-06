import { createSlice } from "@reduxjs/toolkit";

const name = JSON.parse(localStorage.getItem("name"));

const initialState = {
  isLoggedIn: false,
  name: name ? name : "",
  userType:"",
  user: {
    email: "",
    userType:"",
    phone: "",
    
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_USERTYPE(state, action) {
      localStorage.setItem("userType", JSON.stringify(action.payload));
      state.name = action.payload;
    },
    SET_NAME(state, action) {
      localStorage.setItem("name", JSON.stringify(action.payload));
      state.name = action.payload;
    },
    SET_USER(state, action) {
      const profile = action.payload;
      state.user.name = profile.name;
      state.user.userType=profile.userType;
      state.user.email = profile.email;
      state.user.phone = profile.phone;
      
    },
  },
});

export const { SET_LOGIN, SET_NAME, SET_USER, SET_USERTYPE} = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectUserType = (state) => state.auth.userType;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
