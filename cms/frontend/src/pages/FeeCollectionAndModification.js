import React, { useState, useEffect, useContext } from "react";
import { getTenders } from "../services/tenderService";
import "./dashboard/Table.scss";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const FeeCollectionAndModification = () => {
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
    navigate("/collect-fee")
}

const handleButton2 = () =>
{
    navigate("/generate-single-challan")
}
const handleButton3 =()=>{
  navigate("/modify-previous-dues")
}

const handleButton4 =()=>{
  navigate("/modify-monthly-tution-fee")
}
  return (
    <div>
      <h3 className="--mt">Fee Collection And Modification</h3>
    <div style={{display:"flex"}}>
     <button  className="square-button" onClick={handleButton1}>Collect Fee</button>
     <button className="square-button" onClick={handleButton2}>Generate Single Challan</button>
     </div>
     <div style={{display:"flex"}}>
     <button className="square-button" onClick={handleButton3}>Modify Previous Dues</button>
     <button className="square-button" onClick={handleButton4}>Modify Monthly Tution Fee</button>
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

export default FeeCollectionAndModification;
