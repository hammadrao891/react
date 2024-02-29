import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../components/card/Card";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./dashboard/Table.scss";
import { Box, Grid, Container, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import { OverviewTotalProfit } from "../components/Check";
import NewCard from "../components/NewCard";

const MainPage = () => {
    const [previousDue,setPreviousDue] = useState()
  const [details,setDetails] = useState()
  const [regNum,setRegNum] = useState()
  const [table,setTable]=useState(false)
  const [feeHistory,setFeeHistory] = useState();
  const navigate = useNavigate()
  const[paidAmount,setPaidAmount] = useState()
  const[fine,setFine] = useState(0)
  


const updateFee=async()=>{
const totalAmountDue = (feeHistory.totalAmountDue + fine) - paidAmount
console.log( {
  feeMonth:feeHistory.feeMonth,
  paymentStatus:totalAmountDue === 0 ? "paid" : "not paid",
  paidAmount:paidAmount,
  fine:fine,
  totalAmountDue:totalAmountDue
 })
    try
    {
      console.log("sss")
         await axios({
            method:"put",
        baseURL:"http://localhost:8000/api",
        url:`/fee/collect-fee/${regNum}`,
        data:
        {
        feeMonth:feeHistory.feeMonth,
        paymentStatus:totalAmountDue === 0 ? "paid" : "not paid",
        paidAmount:paidAmount,
        fine:fine,
        totalAmountDue:totalAmountDue
       }
        })
        toast.success("Fee Collected Successfully!")
        console.log("sssdaw")

    }
    catch{
        console.log("err")
    }


}

const studentsData = {
    number: 12345,
    text: 'Students',
    color:"white"
  };

    
const paidData = {
    number: 12345,
    text: 'Fee Paid Students',
    color:"#e6e6fa"
  };

  const notPaidData = {
    number: 12345,
    text: 'Fee Unpaid Students',
    color:"#ff0000"
  };

  
const totalAmountData = {
    number: 12345,
    text: 'Total Amount Collected',
    color:"#ffb6c1"
  };

  
const epxenseData = {
    number: 12345,
    text: 'Expense this month'
  };
  const fetchStudent=async()=>{
    try
    {
        const response = await axios({
            method:"get",
        baseURL:"http://localhost:8000/api/",
        url:`/fee/last-fee/${regNum}`,
        })
        console.log(response.data)
        setFeeHistory(response.data)
    }
    catch{
        console.log("err")
    }
      try
      {
          const response = await axios({
              method:"get",
          baseURL:"http://localhost:8000/api/",
          url:`/fee/student-details-previousDue/${regNum}`,
          })
          setTable(true)
          
       
      
      }
      catch{
          console.log("err")
      }
  
  }
  

    
  return (
    <div className="" style={{display:"grid",gap:"2em"}}>
    <ToastContainer/>
    <div style={{display:"flex"}}>
     <NewCard {...studentsData} />
     <NewCard {...paidData} />
     <NewCard {...notPaidData} />
     <NewCard {...totalAmountData} />
     <NewCard {...epxenseData} />
     {/* <NewCard {...dummyData} /> */}
     </div>
     <div style={{display:"flex",justifyContent:"space-evenly"}}>
        <Card cardClass={"tasks"}>
        <h4 style={{color:"#5632f0"}}>Tasks</h4>
        {/* <table style={{width:"100%"}}>
          <tr>
            <td><p>Task 1</p></td>
            <td><button>Done</button></td>
          </tr>
          
          <tr>
            <td><p>Task 1</p></td>
            <td><button>Done</button></td>
          </tr>
          
          <tr>
            <td><p>Task 1</p></td>
            <td ><button>Done</button></td>
          </tr>
        </table>
        */}
        <p className="pTasks">Task1</p>
        <p className="pTasks">Task1</p>
        <p className="pTasks">Task1</p>
        <p className="pTasks">Task1</p>
        
        </Card>
        <Card cardClass={"tasks"}>
            <h4 style={{color:"#5632f0"}}>Ongoing Classes</h4>
            <p className="pTasks">1-Red</p>
        <p className="pTasks">1-Red</p>
        <p className="pTasks">1-Red</p>
        <p className="pTasks">1-Red</p>
       

        </Card>
     </div>
     <Card cardClass={'feeCollection'}>
        <h4>Fee Collection</h4>
        <label style={{color:"black",fontSize:"small"}}>Enter Registration Number:</label>
            <input
              type="number"
              name="regNum"
              onChange={e=>setRegNum(e.target.value)}
                        />
                        <div className="--my">
            <button
            onClick={fetchStudent}
              type="submit"
              className="--btn --btn-success"
            >
              Submit
            </button>
</div>
{table &&
     <>
     <table className="tableFee">
          
          <tbody>
          <tr>
            <td>Student Name</td>
            <td>{feeHistory.name}</td>
            <td>Student Registration No.</td>
            <td>{feeHistory.regNum}</td>
            <td>Total Amount Due</td>
            <td>{feeHistory.totalAmountDue}</td>
            
          </tr>
          <tr>
            <td>Father Name</td>
            <td>{feeHistory.fName}</td>
            <td>Class</td>
            <td>{feeHistory.classs}</td>
          </tr>
</tbody>
</table>
{feeHistory.paymentStatus === "paid" ? 
<h3>Fee Collected Already</h3>
:
 <div className="--my">
        <h4>Paid Amount</h4>
        <input type="number" onChange={(e)=>{setPaidAmount(e.target.value)}}/>
        <h4>Fine</h4>
        <input type="number" onChange={(e)=>{setFine(e.target.value)}}/>
        <button   className="--btn --btn-success" onClick={updateFee} style={{marginTop:"1em"}}>Collect</button>
        
        </div>
}
</>}

     </Card>
    </div>
  );
};
export default MainPage;
