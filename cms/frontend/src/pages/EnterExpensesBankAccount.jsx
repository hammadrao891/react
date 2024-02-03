import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../components/card/Card";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./dashboard/Table.scss";



const EnterExpensesBankAccount = () => {
 
  const [details,setDetails] = useState()
 const[expenseTypes,setExpenseTypes] = useState()
 const[accountTypes,setAccountTypes] = useState() 
  const navigate = useNavigate()
  const currentDate = new
 
  Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2,
   
  '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');
  
  const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;


  const [expenseData,setExpenseData] = useState({
     
      
       
      expense_record_time:formattedDate,
      expense_desc: null,
      expense_amount: null,
      expense_pay_person: null,
      invoice_no: null,
      invoice_file_no: null,
      Acct_type_id:1,
      expense_type_id: null,
        
        
  })
useEffect(()=>{
const fetchExpenses=async()=>{

    try
    {
        const response = await axios({
            method:"get",
        baseURL:"http://localhost:8000/api/",
        url:`/expense/expense_types`,
        })
        console.log(response) 
        setExpenseTypes(response.data)
    }
    catch{
        console.log("err")
    }

}


fetchExpenses();

},[])
useEffect(()=>{console.log(expenseTypes)})

const handleInputChange = (e) =>
{
     const {name,value} = e.target;
     console.log(name,value)
     setExpenseData({ ...expenseData, [name]:value });
}
const handleTransfer = async(req,res) =>
{
 
console.log(expenseData)
  if(expenseData.expense_amount > 0)
  {
  try{
   const res =  await axios({
      method:"post",
      baseURL:"http://localhost:8000/api",
      url:`/expense/expenses/add`,
      data:expenseData
    })
    console.log(res.data)
    if(res.data.error)
    toast.error(res.data.error)
    else{
    toast.success("Expense Added Successfully!")
    setTimeout(() => {
      navigate("/")
      
    }, 2000);
  }
  }
  catch(error){
    
  
}
  }
  else
{
     toast.error("Enter a Valid Amount")
}
}
 
    
  return (
    <div className="add-tender">
       <ToastContainer/>
     <table className="table">
          <tbody>
          <tr>
               <td>Select Expense Type</td>
               <td><select name="expense_type_id" onChange={e=>handleInputChange(e)}>
               <option>--select--</option>
               {expenseTypes && expenseTypes.map((m)=>
               <option value={m.expense_type_id}>{m.expense_type_name}</option>
               )}
                </select></td>  
          </tr>
          
          <tr>
               <td>Expense Record Time</td>
               <td>{formattedDate}</td>  
          </tr>
          
          <tr>
               <td>Expense Description</td>
               <td><input onChange={e=>handleInputChange(e)} name="expense_desc" /></td>  
          </tr>
          
          <tr>
               <td>Expense Amount</td>
               <td><input onChange={e=>handleInputChange(e)}  name="expense_amount" type="number"/></td>  
          </tr>
          
          <tr>
               <td>Expense Pay Account</td>
               <td>NITB Bank Account</td>  
          </tr>
          <tr>
               <td>Invoice Pay Person</td>
               <td><input onChange={e=>handleInputChange(e)} name="expense_pay_person"/></td>  
          </tr>
          
          <tr>
               <td>Invoice Number</td>
               <td><input onChange={e=>handleInputChange(e)} name="invoice_no"/></td>  
          </tr>
          
          <tr>
               <td>Invoice File Number</td>
               <td><input onChange={e=>handleInputChange(e)} name="invoice_file_no" /></td>  
          </tr>
         </tbody>
         </table>
         <button className="--btn --btn-primary" onClick={handleTransfer}>Submit</button>
      {/* </Card> */}
    </div>
  );
};
export default EnterExpensesBankAccount;
