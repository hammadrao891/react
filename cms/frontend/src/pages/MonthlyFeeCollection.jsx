import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../components/card/Card";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./dashboard/Table.scss";



const MonthlyFeeCollection = () => {
  const [feeMonth,setFeeMonth]=useState()
  const [options,setOptions]=useState()
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

useEffect(() => {
  const generateOptions = () => {
    const currentDate = new Date();
    const startDate = new Date(2010, 0); // January 2010
    const newOptions = [];

    while (startDate <= currentDate) {
      const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(startDate);
      newOptions.push({ value: formattedDate, label: formattedDate });

      // Move to the next month
      startDate.setMonth(startDate.getMonth() + 1);
    }

    setOptions(newOptions);
    console.log(newOptions)
  };

  generateOptions();
  
}, []); 
    
    
  return (
    <div className="add-tender">
      <div style={{color:"black",fontSize:"medium",marginTop:"1em"}}>
      <ToastContainer/>
        <label htmlFor="monthYearDropdown">Select Month-Year:</label>
        <select name="feeMonth" onChange={e=>setFeeMonth(e.target.value)} id="monthYearDropdown">
          {options && options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        </div>
      
   {feeMonth && <>
       
     <table className="table">
          <thead>
            <th>Sr #</th>
            <th>Fee ID</th>
            <th>Fee Month</th>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Class</th>
            <th>Paid Amount</th>
            
          </thead>
          <tbody>
          {/* {details.map((m,index)=> */}
          <tr >
               <td>index+1</td>
               <td>m.regNum</td>
               <td>m.name</td>
               <td>m.fName</td> 
               <td>m.classs</td>
               <td>m.MonthlyFeeDetails</td>
               <td>m.previousDue</td>
          </tr>
          {/* )} */}
         </tbody>
         </table>
         </>}
      {/* </Card> */}
    </div>
  );
};

MonthlyFeeCollection.modules = {
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
MonthlyFeeCollection.formats = [
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

export default MonthlyFeeCollection;
