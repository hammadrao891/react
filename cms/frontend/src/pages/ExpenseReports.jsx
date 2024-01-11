import React, { useState, useEffect, useContext } from "react";
import { getTenders } from "../services/tenderService";
import "./dashboard/Table.scss";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const ExpenseReports = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inventory,setInventory] =useState()
  const [requisitions,setRequisitons] = useState()
  const {user} = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
   
  const fetchStudents =async () => 
  {
    try {
      const response = await axios({
        method:"get",
        baseURL:"http://localhost:8000/api/",
        url:`users/getClassStudents/`,
        
      })
      console.log(response.data)
      setRequisitons(response.data)
    } catch (error) {
      console.log(error)
      // toast.error("Error")
  }
  
  }
//   fetchStudents()
}, []);
const handleButton1 = () =>
{
    navigate("/update-log")
}

const handleButton2 = () =>
{
    navigate("/update-student-class")
}
const handleButton3 =()=>{
  navigate("/transfer-whole-class")
}

const handleButton4 =()=>{
  navigate("/update-dob")
}

const handleButton5 =()=>{
  navigate("/update-student-admission-date")
}
  return (
    <div>
      <h3 className="--mt">Expense Reports</h3>
    <div style={{display:"flex"}}>
     <button  className="square-button" onClick={handleButton1}>Today's Expense Report</button>
     <button className="square-button" onClick={handleButton2}>Daily Expense Report</button>
     </div>
     <div style={{display:"flex"}}>
     <button className="square-button" onClick={handleButton3}>Monthly Expense Report</button>
     <button className="square-button" onClick={handleButton4}>Monthly Expense - By Account</button>     
     </div>
     <button className="square-button" onClick={handleButton5}>Monthly Expense - By  Expense Type</button>
     
     
    </div>
  );
};

export default ExpenseReports;
