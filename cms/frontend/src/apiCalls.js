import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
   const baseURL=process.env.REACT_APP_BACKEND_URL
  try {
    
    const res = await axios({
        method:"post",
        baseURL,
        url:"/api/users/login", 
        data:userCredential
    });
    console.log("Res data: ")
    console.log(res.data)
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};
