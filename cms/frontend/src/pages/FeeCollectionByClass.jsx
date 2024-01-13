import React, { useState, useEffect, useContext } from "react";
import { getTenders } from "../services/tenderService";
import "./dashboard/Table.scss";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const FeeCollectionByClass = () => {
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
    navigate("/complete-report-paid-and-unpaid-by-class")
}

const handleButton2 = () =>
{
    navigate("/paid-report-by-class")
}
const handleButton3 =()=>{
  navigate("/not-paid-report-by-class")
}

  return (
    <div>
      <h3 className="--mt">Student Information</h3>
    <div style={{display:"flex"}}>
     <button  className="square-button" onClick={handleButton1}>Complete Report - Paid & Unpaid By Class</button>
     <button className="square-button" onClick={handleButton2}>Paid Report By Class</button>
     </div>
     <div style={{display:"flex"}}>
     <button className="square-button" onClick={handleButton3}>Not Paid Report By Class</button>
     </div>
     
     
   
   
    </div>
  );
};

export default FeeCollectionByClass;
