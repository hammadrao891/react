import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../components/card/Card";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./dashboard/Table.scss";



const ModifyPreviousDues = () => {
 
  const [button1,setButton1] = useState(false)
  const [button2,setButton2] = useState(false)
  const [regNum,setRegNum] = useState()
 
  const [table,setTable]=useState(false)
  const [details,setDetails] = useState()
  const [previousDue,setPreviousDue] = useState()
  
  const navigate = useNavigate()


const handleButton1 =()=>{
    setButton2(false)
    setButton1(true)
}
const handleButton2 =()=>{
    setButton1(false)
    setButton2(true)
}
const fetchStudent=async()=>{

    try
    {
        const response = await axios({
            method:"get",
        baseURL:"http://localhost:8000/api/",
        url:`/fee/student-details-previousDue/${regNum}`,
        })
        setTable(true)
        console.log(response) 
        setDetails(response.data)
    }
    catch{
        console.log("err")
    }

}

const updateFee=async()=>{

    try
    {
        const response = await axios({
            method:"put",
        baseURL:"http://localhost:8000/api/",
        url:`/fee/update-previous-due/${regNum}`,
        data:{previousDue}
        })
        toast.success("Previous Due Updated Successfully!")
        setTimeout(() => {
            
            navigate(`/fee-collection-and-modification`);
          }, 2000);

    }
    catch{
        console.log("err")
    }


}
   
    
    
  return (
    <div className="add-tender">
      {/* <Card cardClass={"card"}> */}
     <ToastContainer/>
        
       
            
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
     <table className="table">
          
          <tbody>
          <tr>
            <td>Student Name</td>
            <td>{details.name}</td>
            <td>Student Registration No.</td>
            <td>{details.regNum}</td>
            <td>Challan_no</td>
            <td>==challanno</td>
          </tr>
          <tr>
            <td>Father Name</td>
            <td>{details.fName}</td>
            <td>Class</td>
            <td>{details.classs}</td>
          </tr>
          <tr>
            <td>Fee Month</td>
            <td>==fee month===</td>
            <td>Fue Due Date</td>
            <td>===fee Due Date===</td>
          </tr>
          <tr>
            <td>
                Monthly Fee
            </td>
            <td>{details.MonthlyFeeDetails}</td>
            <td>Admission Fee</td>
            <td>{details.admissionFee}</td>
          </tr>
          <tr>
            <td>Annual Charges</td>
            <td>{details.annualCharges}</td>
            <td>Security Deposit</td>
            <td>{details.securityDeposit}</td>    
          </tr>
          <tr>
            <td>
                Admission Fee
            </td>
            <td>
                {details.admissionFee}
            </td>
            <td>Fine</td>
            <td>{details.fine}</td>
          </tr>
          <tr>
            <td>Total Amount Due</td>
            <td>{details.totalAmountDue}</td>
            <td>Payment Status</td>
            <td>{details.paymentStatus}</td>
            <td>Prev. Paid this month</td>
            <td></td>
          </tr>
          </tbody>
        </table>
        <div className="--my">
        <h4>Modified Previous Due</h4>
        <input type="number" onChange={(e)=>{setPreviousDue(e.target.value)}}/>
        <button   className="--btn --btn-success" onClick={updateFee} style={{marginTop:"1em"}}>Submit</button>
        </div>
     </>

     }
      
      {/* </Card> */}
    </div>
  );
};

ModifyPreviousDues.modules = {
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
ModifyPreviousDues.formats = [
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

export default ModifyPreviousDues;
