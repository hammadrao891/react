import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../components/card/Card";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./dashboard/Table.scss";



const MonthlyExpenseByType = () => {
  const [details,setDetails] = useState()
const [date,setDate] = useState()
const[day,setDay] = useState()
const[month,setMonth]=useState()
  const [year,setYear] = useState()
  const navigate = useNavigate()
  const [expenses,setExpenses] = useState()
  const[expenseType,setExpenseType] = useState()

useEffect(()=>{
    const fetchExpenseTypes=async()=>{

        try
        {
            const response = await axios({
             method:"get",
            baseURL:"http://localhost:8000/api/",
            url:`/expense/expense_types`,
            })
            console.log(response.data[0].Acct_type_name) 
            setExpenses(response.data)
        }
        catch{
            console.log("err")
        }
    
    }
    

fetchExpenseTypes()
// console.log()
},[])

const fetchExpenses=async()=>{
    console.log(expenseType)
    if (/^\d{4}$/.test(year)) {
        if(!expenseType){
            toast.error("select Account Type")
        }
        else{
    try
    {
        const response = await axios({
            method:"get",
        baseURL:"http://localhost:8000/api/",
        url:`/expense/expenses_by_expense_type/${month < 10  &&  !(/^\d{2}$/.test(month)) ? "0"+month :month }/${year}/${expenseType}`,
        })
        console.log(response) 
        setDetails(response.data)
    }
    catch{
        console.log("err")
    }
        }

}
else{
    toast.error("Year must be 4 digits")
}

    }

    
    
  return (
    <div className="add-tender">
<ToastContainer/>
<label style={{color:"black",fontSize:"small"}}>Select Month and Year :</label>
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
            <label style={{color:"black",fontSize:"small"}}>Select Account Type:</label>
            <select name="Acct_type_id" onChange={e=>setExpenseType(e.target.value)}>
               <option value="select">--select--</option>
               {expenses && expenses?.map((m)=>
               <option value={m.expense_type_id}>{m.expense_type_name}</option>
               )}  
               </select>
        <div className="--my">
            <button
            onClick={fetchExpenses}
              type="submit"
              className="--btn --btn-success"
            >
              Submit
            </button>
            </div>
   {!details ? <h4></h4> :<>
   <h3 style={{textAlign:"center"}}>Monthly Expense Report By Account</h3>
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

export default MonthlyExpenseByType;
