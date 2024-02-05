import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../components/card/Card";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./dashboard/Table.scss";



const CompleteLoansReport = () => {
  const [details,setDetails] = useState()
  
  
  const navigate = useNavigate()

useEffect(()=>{
const fetchStudent=async()=>{

    try
    {
        const response = await axios({
            method:"get",
        baseURL:"http://localhost:8000/api/",
        url:`/expense/loan_data`,
        })
        console.log(response) 
        setDetails(response.data)
    }
    catch{
        console.log("err")
    }

}
fetchStudent();
},[])

    
    
  return (
    <div className="add-tender">
   {!details ? <h4>Loading...</h4> :<>
   <h3 style={{textAlign:"center"}}>Complete Loans Report</h3>
   {details.length > 0 ? 
     <table className="table">
          <thead>
            <th>Exp ID</th>
            <th>Exp Type</th>
            <th>Description</th>
            <th>Account</th>
            <th>Loan Date</th>
            <th>Loan Amount</th>
            <th>Return Amount</th>
            <th>Return Date</th>
            <th>Return Status</th>
          </thead>
          <tbody>
          {details.map((m,index)=>
          <tr key={index}>
               <td>{m.exp_id}</td>
               <td>{m.expense_type_name}</td>
               <td>{m.loan_desc}</td>
               <td>{m.Acct_type_name}</td> 
               <td>{m.expense_record_time}</td>
               <td>{m.return_amount}</td>
               <td>{m.return_amount - m.remaining_amount}</td>
               <td>{m.return_date}</td>
               <td>{m.return_status}</td>
          </tr>)}
         </tbody>
         </table>:
        <h3 style={{textAlign:"center",fontSize:"40px",marginTop:"20%"}}>No Records</h3>
        }
         </>}
         
      {/* </Card> */}
    </div>
  );
};

export default CompleteLoansReport;
