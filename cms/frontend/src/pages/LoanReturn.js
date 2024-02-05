import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Card from "../components/card/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const LoanReturn = () =>{
    const [details,setDetails] = useState()
    const [form,setForm] = useState(false)
    const navigate = useNavigate()
    const [expenseId,setExpenseId] = useState()
    const [paidAmount,setPaidAmount] = useState(0)
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
  
    const fetchExpense=async()=>{

        try
        {
            const response = await axios({
                method:"get",
            baseURL:"http://localhost:8000/api/",
            url:`/expense/loans/${expenseId}`,
            })
            setForm(true)
            console.log(response.data)
            setDetails(response.data) 
            // setName(response.data[0].name)
            // setClasss(response.data[0].classs)
        }
        catch{
            console.log("err")
        }
    
    }
    const payLoan =async()=>{
        if(paidAmount > details.remaining_amount)
        {
            toast.error("Amount cannot be greater than remaining amount")
        }
        else if(paidAmount<1)
        {
            toast.error("Please enter a valid amount")
        }
        else{
        const data={
            return_date:formattedDate,
            return_amount:details.expense_amount,
            paid_amount:paidAmount,
            expense_record_time:details.expense_record_time,
            expense_type_name:details.expense_type_name,
            remaining_amount:(details.remaining_amount-paidAmount),
            return_status: details.remaining_amount-paidAmount === 0  ? "PAID" : "NOT PAID",
            exp_type_id:details.exp_type_id,
           
            expense_desc:details.expense_desc

        }
        try
        {
            const response = await axios({
                method:"post",
            baseURL:"http://localhost:8000/api/",
            url:`/expense/loans`,
            data
            })
            setForm(true)
            console.log(response) 
           toast.success("Loan Data Entered Successfully")
           setTimeout(() => {
            
            navigate(`/expenses`);
          }, 2000);
        }
        catch{
            console.log("err")
        }
    
    }
    }

    return(
        <>
             <div className="add-tender">
    <Card cardClass={"card"}>
     <ToastContainer/>
        <label style={{color:"black",fontSize:"small"}}>Enter Loan Expense Id:</label>
            <input
              type="number"
              name="expenseId"
              onChange={e=>setExpenseId(e.target.value)}
                        />
                        <div className="--my">
            <button
            onClick={fetchExpense}
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
               <td>{expenseId}</td>  
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
               <td>Expense Amount</td>
               <td>{details.expense_amount}</td>  
          </tr>
          
          <tr>
               <td>Expense Time</td>
               <td>{details.expense_record_time}
              </td>  
          </tr>
          <tr>
               <td>Loan Amount</td>
               <td>{details.expense_amount}</td>  
          </tr>
          
          <tr>
               <td>Loan Return Status</td>
               <td>{details.return_status}</td>  
          </tr>
          
          <tr>
               <td>Return Amount</td>
               <td>{details.expense_amount - details.remaining_amount}</td>
          </tr>
          <tr>
               <td>Remaining Amount</td>
               <td>{details.remaining_amount}</td>  
          </tr>
          
          <tr>
               <td>Return Time</td>
               <td>{formattedDate}</td>
          </tr>
          
         </tbody>
         </table>
         {
            details.remaining_amount === 0 ? <h3 style={{color:"green"}}>Loan Returned Already</h3> :<>
            <input
              type="number"
              name="loan"
              className="form-control"
              placeholder="Enter Amount to be paid..."
              onChange={e=>setPaidAmount(e.target.value)}
                        />
                <div className="--my">
            <button
            onClick={payLoan}
              type="submit"
              className="--btn --btn-success"
            >
             Pay Loan
            </button>
            </div>
            </>
            }
                
            </>
            }
            </Card>
            </div>
        </>
    )
}

export default LoanReturn;