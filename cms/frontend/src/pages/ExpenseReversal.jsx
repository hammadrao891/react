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
    const fetchExpenses=async()=>{

        try
        {
            const response = await axios({
                method:"get",
            baseURL:"http://localhost:8000/api/",
            url:`/expense/expenses/${expenseId}`,
            })
            setForm(true)
            console.log(response.data[0].exp_type_id) 
            setDetails(response.data[0])

        }
        catch{
            console.log("err")
        }
    
    }
    const reverseExpense =async()=>{
        try
        {
            const response = await axios({
                method:"post",
            baseURL:"http://localhost:8000/api/",
            url:`/expense/expenses/${regNum}`,
            data:expenseId
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
               <td>{details.exp_type_id}
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
         </table>
     
            </>}
            <div className="--my">
            <button
            onClick={reverseExpense}
              type="submit"
              className="--btn --btn-success"
            >
              Reverse Expense
            </button>
            </div>
            </Card>
            </div>
        </>
    )
}

export default ExpenseReversal;