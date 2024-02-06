import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../components/card/Card";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./dashboard/Table.scss";



const TodayExpenseReport = () => {
  const [details,setDetails] = useState()
  
  
  const navigate = useNavigate()

useEffect(()=>{
const fetchStudent=async()=>{

    try
    {
        const response = await axios({
            method:"get",
        baseURL:"http://localhost:8000/api/",
        url:`/expense/today`,
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
   <h3 style={{textAlign:"center"}}>Today's Expense Report</h3>
   {details.length > 0 ? 
     <table className="table">
          <thead>
            <th>Sr #</th>
            <th>Exp ID</th>
            <th>Expense Record Time</th>
            <th>Exp Type</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Expense Account</th>
            <th>Pay Person</th>
            
            <th>Invoice Number</th>
            <th>File Number</th>
          </thead>
          <tbody>
          {details.map((m,index)=>
          <tr key={index}>
               <td>{index+1}</td>
               <td>{m.exp_type_id}</td>
                <td>{m.expense_record_time}</td>
               <td>{m.expense_type_name}</td>
               <td>{m.expense_desc}</td>
               <td>{m.expense_amount}</td> 
               <td>{m.Acct_type_name}</td>
               <td>{m.expense_pay_person}</td>
               <td>{m.invoice_no}</td>
               <td>{m.invoice_file_nos}</td>
               
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

export default TodayExpenseReport;
