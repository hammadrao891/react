import React, { useState, useEffect, useContext } from "react";
import { getTenders } from "../services/tenderService";
import "./dashboard/Table.scss";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const FeeCollectionReports = () => {
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
    navigate("/monthly-fee-collection")
}

const handleButton2 = () =>
{
    navigate("/fee-collection-by-class")
}
const handleButton3 =()=>{
  navigate("/total-fee-collection")
}

const handleButton4 =()=>{
  navigate("/not-paid-detailed-by-student")
}

const handleButton5 =()=>{
  navigate("/total-fee-collection-summary-by-class-and-payment-status")
}
const handleButton6 = () =>
{
    navigate("/fee-collection-amount-by-class")
}

const handleButton7 = () =>
{
    navigate("/total-paid-and-unpaid-count")
}
const handleButton8 =()=>{
  navigate("/today-fee-collection")
}

const handleButton9 =()=>{
  navigate("/more-than-one-month-defaulters")
}

const handleButton10 =()=>{
  navigate("/free-students-report")
} 
return (
    <div>
      <h3 className="--mt">Student Information</h3>
    <div style={{display:"flex"}}>
     <button  className="square-buttonFee" onClick={handleButton1}>Monthly Fee Collection</button>
     <button className="square-buttonFee" onClick={handleButton2}>Fee Collection By Class</button>
     </div>
     <div style={{display:"flex"}}>
     <button className="square-buttonFee" onClick={handleButton3}>Total Fee Collection - Detailed by Student</button>
     <button className="square-buttonFee" onClick={handleButton4}>NOT PAID - Detailed by Student</button>     
     </div>
     <div style={{display:"flex"}}>
     <button className="square-buttonFee" onClick={handleButton5}>Total Fee Collection -Summary by Class & Payment Status</button>
     <button className="square-buttonFee" onClick={handleButton6}>Fee Collection Amount by Class</button>     
     </div> <div style={{display:"flex"}}>
     <button className="square-buttonFee" onClick={handleButton7}>Total Paid & UnPaid Count</button>
     <button className="square-buttonFee" onClick={handleButton8}>Today's Fee Collection</button>     
     </div> <div style={{display:"flex"}}>
     <button className="square-buttonFee" onClick={handleButton9}>More than 1-Month Defaulters</button>
     <button className="square-buttonFee" onClick={handleButton10}>Free Students Report</button>     
     </div>
     
     
    </div>
  );
};

export default FeeCollectionReports;
