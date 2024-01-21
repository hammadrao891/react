import React, { useContext, useState } from "react";
import styles from "./auth.module.scss";
import { BiLogIn } from "react-icons/bi";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const initialState = {
  userType: "",
  email: "",
  password: "",
};


      const Login = () => {
        console.log(localStorage.getItem("user"))
        // const dispatch = useDispatch();
        // const navigate = useNavigate();
        const [isLoading, setIsLoading] = useState(false);
        const [formData, setformData] = useState(initialState);
        const { userType, pNum, pass } = formData;
        const baseURL=process.env.REACT_APP_BACKEND_URL
        const handleInputChange = (e) => {
          
          const { name, value } = e.target;
          setformData({ ...formData, [name]: value });
        };
      
        
          const { isFetching, dispatch } = useContext(AuthContext);
        const {user} = useContext(AuthContext)
        const navigate = useNavigate();
          const login = async(e) => {
            e.preventDefault()
            await loginCall(
              { pNum, pass },
              dispatch
             
            );
            try {
    
              const res = await axios({
                  method:"post",
                  baseURL,
                  url:"/api/users/login", 
                  data:{pNum,pass}
              });
              navigate("/dashboard");
            }catch{
              toast("Wrong Credentials Entered")
      
            }
      
            // console.log(user)
           
             console.log(user)
          };
  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
      <ToastContainer />
        <div className={styles.form}>
          <div className="--flex-center">
            <BiLogIn size={35} color="#999" />
          </div>
          <h2>Login</h2>

          <form onSubmit={login}>
            
            <input
              type="text"
              placeholder="Enter Personal Number"
              required
              name="pNum"
              value={pNum}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Password"
              required
              name="pass"
              value={pass}
              onChange={handleInputChange}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Login
            </button>
          </form>
          {/* <Link to="/forgot">Forgot Password</Link> */}

          <span className={styles.register}>
            <Link to="/">Return Home</Link>
            {/* <p> &nbsp; Don't have an account? &nbsp;</p>
            <Link to="/register">Register</Link> */}
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Login;