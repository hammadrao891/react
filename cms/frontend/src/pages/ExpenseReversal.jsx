import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Card from "../components/card/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const ExpenseReversal = () =>{
    const [regNum,setRegNum] = useState()
    const [classs,setClasss] = useState()
    const [expenseId,setExpenseId] = useState()
    const [details,setDetails] = useState()
    const [name,setName] = useState()
    const [form,setForm] = useState(false)
    const navigate = useNavigate()
    const [expenseReverse,setExpenseReverse] = useState(false)
    const fetchExpenses=async()=>{

        try
        {
            const response = await axios({
                method:"get",
            baseURL:"http://localhost:8000/api/",
            url:`/expense/expenses/${expenseId}`,
            })
            setForm(true)
            console.log(response.data[0]) 
            setDetails(response.data[0])
             try{
              const response = await axios({
                method:"get",
            baseURL:"http://localhost:8000/api/",
            url:`/expense/check_exp_id/${expenseId}`,
            
            })
              setExpenseReverse(response.data.exists)
              console.log(response.data)
            }
             catch{} 
        }
        catch{
            console.log("err")
        }
    
    }
    
    const reverseExpense =async()=>{
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
    
    
      const data = {
        Acct_type_id : details.Acct_type_id,
        balance_before: details.current_Bal,
        balance_after: details.current_Bal + details.expense_amount,
        expense_amount:details.expense_amount,
        time:formattedDate,
        expense_type_id:details.expense_type_id,
        exp_type_id:expenseId
      }
        try
        {
            const response = await axios({
                method:"post",
            baseURL:"http://localhost:8000/api/",
            url:`/expense/insert_balance_change`,
            data
            })
            // setForm(true)
            console.log(response) 
           toast.success("Expense Reversal Successfull")
           setTimeout(() => {
            
            navigate(`/`);
          }, 2000);
        }
        catch{
            console.log("err")
        }
    

    }

    return(
        <>
             <div className="add-tender">
    <Card cardClass={"card"}>
     <ToastContainer/>
        <label style={{color:"black",fontSize:"small"}}>Enter Expense Id:</label>
            <input
              type="number"
              name="regNum"
              onChange={e=>setExpenseId(e.target.value)}
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
            {form && <>
                
                <table className="table">
          <tbody>
          <tr>
               <td>Expense ID</td>
               <td>{expenseId}
                </td>  
          </tr>
          
          <tr>
               <td>Expense Type</td>
               <td>{details.expense_type_name}</td>  
          </tr>
          
          <tr>
               <td>Expense Description</td>
               <td>{details.expense_desc}</td>  
          </tr>
          
          <tr>
               <td>Expense Account</td>
               <td>{details.Acct_type_name}</td>  
          </tr>
          
          <tr>
               <td>Expense Time</td>
               <td>{details.expense_record_time}</td>  
          </tr>
          <tr>
               <td>Original Expense Amount</td>
               <td>{details.expense_amount}</td>  
          </tr>
          
         </tbody>
         </table>{

          expenseReverse ? <h3>Expense already Reversed</h3> :
         <div className="--my">
            <button
            onClick={reverseExpense}
              type="submit"
              className="--btn --btn-success"
            >
              Reverse Expense
            </button>
            </div>}
     
            </>}
            </Card>
            </div>
        </>
    )
}

export default ExpenseReversal;