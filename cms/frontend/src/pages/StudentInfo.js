import React, { useState, useEffect, useContext } from "react";
import { getTenders } from "../services/tenderService";
import "./dashboard/Table.scss";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const StudentInfo = () => {
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
    navigate("/check-student-info")
}

const handleButton2 = () =>
{
    navigate("/add-student")
}
const handleButton3 =()=>{
  navigate("/update-options")
}

const handleButton4 =()=>{
  navigate("/terminate-student")
}
  return (
    <div>
      <h3 className="--mt">Student Information</h3>
    <div style={{display:"flex"}}>
     <button  className="square-button" onClick={handleButton1}>Check Student Information</button>
     <button className="square-button" onClick={handleButton2}>New Student Registration</button>
     </div>
     <div style={{display:"flex"}}>
     <button className="square-button" onClick={handleButton3}> Student Data Modification</button>
     <button className="square-button" onClick={handleButton4}>Terminate Student</button>
     </div>
     
      {/* {loading && <p>Loading...</p>}
      {error && <p>Error loading Inventory. Please try again later.</p>}
      {!loading && !error && (
        <table className="table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Item</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {inventory?.map((inventory) => (
              <tr key={inventory._id}>
                <td>{inventory.type}</td>
                <td>{inventory.item}</td>
                <td>{inventory.quantity}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )} 
      */}
    </div>
  );
};

export default StudentInfo;
