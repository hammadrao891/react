import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../components/card/Card";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./dashboard/Table.scss";



const DailyStatusReports = () => {
  const [subtype, setSubtype] = useState("");
  const [type,setType]=useState("")
  const [data,setData]=useState()
  const [subtypeItem,setSubtypeItem] = useState()
  const[newItem,setNewItem]= useState()
  const [quantity, setQuantity] = useState()
  const [subTypeArray,setSubtypeArray]=useState()
  const [selectedItem,setSelectedItem] = useState()
  const [button1,setButton1] = useState(false)
  const [button2,setButton2] = useState(false)
  const [regNum,setRegNum] = useState()
  const [classs,setClasss] = useState()
  const [table,setTable]=useState(false)
  const [details,setDetails] = useState()
  const [newMonthlyFeeDetails,setNewMonthlyFeeDetails] = useState()
  
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
  
  const formattedDate = `${day}-${month}-${year}`;
useEffect(()=>{
const fetchStudent=async()=>{

    try
    {
        const response = await axios({
            method:"get",
        baseURL:"http://localhost:8000/api/",
        url:`/fee/getStudents`,
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
    <h4>Report Date: {formattedDate}</h4>
    <hr></hr>
    <h4>Today's Fee Collection</h4>
    <table className="table">
      <thead>
        <th>Sr#</th>
        <th>Payment Status</th>
        <th>Total Payment</th>
        <th>Number of Students</th>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>paid</td>
          <td>21121</td>
          <td>90</td>
        </tr>
      </tbody>
    </table>
    <hr/>
    <h4>Today's Expense </h4>
    <table className="table">
      <thead>
        <th>Sr#</th>
        <th>Expense Type</th>
        <th>Expense Account</th>
        <th>Amount</th>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>paid</td>
          <td>21121</td>
          <td>90</td>
        </tr>
      </tbody>
    </table>
<hr/>
<h4>Today's Transfers</h4>
    <table className="table">
      <thead>
        <th>Sr#</th>
        <th>Transfer Amount</th>
        <th>Transfer From</th>
        <th>Transfer Reason</th>
        <th>Transfer Time</th>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>paid</td>
          <td>21121</td>
          <td>90</td>
          <td>sdsdss</td>
        </tr>
      </tbody>
    </table>
    <hr/>
    <h4>Account Status</h4>
    <table className="table">
      <thead>
        <th>ID</th>
        <th>Account Name</th>
        <th>Current Balance</th>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>paid</td>
          <td>21121</td>
        </tr>
      </tbody>
    </table>
    <hr/>
      
     <h4>Monthly Up to Date Fee Collection Status</h4>
    <table className="table">
      <thead>
        <th>ID</th>
        <th>Payment Status</th>
        <th>Number of Students</th>
        <th>Amount</th>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>paid</td>
          <td>21121</td>
          <td>ssds</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td  style={{textAlign:"center",fontSize:"20px",background:"aqua"}}><h5>Current Month Total Collection</h5></td>
          <td  style={{fontSize:"12px",background:"aqua"}}>65555</td>
        </tr>
      </tbody>
    </table>
    <hr/>

    <h4>Monthly Up to Date Expense</h4>
    <table className="table">
      <thead>
        <th>Sr#</th>
        <th>Expense Type</th>
        <th>Expense Account</th>
        <th>Amount</th>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>paid</td>
          <td>21121</td>
          <td>2222</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td  style={{textAlign:"center",fontSize:"20px",background:"aqua"}}><h5>Current Month Total Expense</h5></td>
          <td  style={{fontSize:"12px",background:"aqua"}}>65555</td>
        </tr>
      </tbody>
    </table>
   
    <hr/>
    
      {/* </Card> */}
    </div>
  );
};

DailyStatusReports.modules = {
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
DailyStatusReports.formats = [
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

export default DailyStatusReports;
