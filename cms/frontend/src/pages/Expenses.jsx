import React, { useState, useEffect, useContext } from "react";
import { getTenders } from "../services/tenderService";
import "./dashboard/Table.scss";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Expenses = () => {
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
    navigate("/enter-expenses-fee-collection-account")
}

const handleButton2 = () =>
{
    navigate("/enter-expenses-bank-account")
}
const handleButton3 =()=>{
  navigate("/enter-expenses")
}

const handleButton4 =()=>{
  navigate("/account-status-and-transfers")
}

const handleButton5 =()=>{
  navigate("/account-transfers-history")
}
const handleButton6 = () =>
{
    navigate("/expense-reversal")
}

const handleButton7 = () =>
{
    navigate("/fee-reversal")
}
const handleButton8 =()=>{
  navigate("/balance-change-history")
}

const handleButton9 =()=>{
  navigate("/balance-change-history-this-month-all")
}
const handleButton10 =()=>{
  navigate("/loan-return")
}

const handleButton11 =()=>{
  navigate("/complete-loans-report")
}



const handleButton12 =()=>{
  navigate("/monthly-loans-return-report")
}

return (
    <div>
      <h3 className="--mt">Expenses</h3>
    <div style={{display:"flex"}}>
     <button  className="square-buttonExp" onClick={handleButton1}>Enter Expenses-Fee Collection Account</button>
     <button className="square-buttonExp" onClick={handleButton2}>Enter Expenses-Bank Account</button>
     <button className="square-buttonExp" onClick={handleButton3}>Enter Expenses</button>
     </div>
     <div style={{display:"flex"}}>
     <button className="square-buttonExp" onClick={handleButton4}>Account Status & Transfers</button>
     <button className="square-buttonExp" onClick={handleButton5}>Account Transfers History</button>     
     </div>
     <div style={{display:"flex"}}>
     <button className="square-buttonExp" onClick={handleButton6}>Expense Reversal</button>
     <button className="square-buttonExp" onClick={handleButton7}>Fee Reversal(Reset Fee)</button>     
     <button className="square-buttonExp" onClick={handleButton8}>Balance Change History(Today)</button>
     <button className="square-buttonExp" onClick={handleButton9}>Balance Change History(This Month All)</button>     
     </div>
     <div style={{display:"flex"}}>
     <button className="square-buttonExp" onClick={handleButton10}>Loan Return</button>
     <button className="square-buttonExp" onClick={handleButton11}>Complete Loans Report</button>     
     <button className="square-buttonExp" onClick={handleButton12}>Monthly Loans Report</button>
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

export default Expenses;
