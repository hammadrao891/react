import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../components/card/Card";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./dashboard/Table.scss";



const BalanceChangeHistory = () => {
  const [details,setDetails] = useState()
  

useEffect(()=>{
const fetchStudent=async()=>{

    try
    {
        const response = await axios({
            method:"get",
        baseURL:"http://localhost:8000/api/",
        url:`/expense/balance_change_history_today`,
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
   <h3 style={{textAlign:"center"}}>Balance Change History(Today)</h3>
      {details.length > 0 ? 
     <table className="table">
          <thead>
            <th>ID</th>
            <th>Account Name</th>
            <th>Balance Before</th>
            <th>Balance After</th>
            <th>Fee ID</th>
            <th>Fee Paid</th>
            <th>Expense ID</th>
            <th>Expense Amount</th>
            <th>Time</th>
            <th>Type</th>
          </thead>
          <tbody>
          {details.map((m,index)=>
          <tr key={index}>
               <td>{m.id}</td>
               <td>{m.Acct_type_name}</td>
               <td>{m.balance_before}</td>
               <td>{m.balance_after}</td>
               <td>{m.feeId}</td> 
               <td>{m.paidAmount}</td>
               <td>{m.exp_type_id}</td>
               <td>{m.expense_amount}</td>
               <td>{m.time}</td>
               <td>{m.expense_type_name}</td>
               
          </tr>)}
        
         </tbody>
         </table>
        :
        <h3 style={{textAlign:"center",fontSize:"40px",marginTop:"20%"}}>No Records</h3>
        }
         </>}   {/* </Card> */}
    </div>
  );
};

BalanceChangeHistory.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
BalanceChangeHistory.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default BalanceChangeHistory;
