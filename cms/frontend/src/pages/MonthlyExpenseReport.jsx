import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../components/card/Card";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./dashboard/Table.scss";



const MonthlyExpenseReport = () => {
  const [details,setDetails] = useState()
const [date,setDate] = useState()
const[day,setDay] = useState()
const[month,setMonth]=useState()
  const [year,setYear] = useState()
  const navigate = useNavigate()



const fetchExpenses=async()=>{
    if (/^\d{4}$/.test(year)) {
    
    try
    {
        const response = await axios({
            method:"get",
        baseURL:"http://localhost:8000/api/",
        url:`/expense/${month < 10  &&  !(/^\d{2}$/.test(month)) ? "0"+month :month }/${year}`,
        })
        console.log(response) 
        setDetails(response.data)
    }
    catch{
        console.log("err")
    }


}
else{
    toast.error("Year must be 4 digits")
}

}


    
    
  return (
    <div className="add-tender">
<ToastContainer/>
<label style={{color:"black",fontSize:"small"}}>Select Year and Month :</label>
            <input
              type="number"
              placeholder="01"
              name="regNum"
              max={12}
              min={1}
              onChange={e=>setMonth(e.target.value)}
                        />
           <input
              type="number"
              placeholder="2001"
              name="regNum"
              max={12}
              min={1}

              onChange={e=>setYear(e.target.value)}
                        />
        <div className="--my">
            <button
            onClick={fetchExpenses}
              type="submit"
              className="--btn --btn-success"
            >
              Submit
            </button>
            </div>
   {!details ? <h4>Loading...</h4> :<>
   <h3 style={{textAlign:"center"}}>Complete Loans Report</h3>
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

export default MonthlyExpenseReport;
