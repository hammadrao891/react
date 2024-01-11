import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../components/card/Card";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./dashboard/Table.scss";



const EnterExpensesBankAccount = () => {
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

    
    
  return (
    <div className="add-tender">
   {!details ? <h4>Loading...</h4> :<>
       
     <table className="table">
          <thead>
            <th>Sr #</th>
            <th>Reg No.</th>
            <th>Student Name</th>
            <th>Father Name</th>
            <th>Class</th>
            <th>Monthlt Tution Fee</th>
            <th>Previous Due</th>
            <th>total Amount Due</th>
            <th>Payment Status</th>
          </thead>
          <tbody>
          {details.map((m,index)=>
          <tr key={index}>
               <td>{index+1}</td>
               <td>{m.regNum}</td>
               <td>{m.name}</td>
               <td>{m.fName}</td> 
               <td>{m.classs}</td>
               <td>{m.MonthlyFeeDetails}</td>
               <td>{m.previousDue}</td>
               <td>{m.totalAmountDue}</td>
               <td>{m.paymentStatus}</td>
          </tr>)}
         </tbody>
         </table>
         </>}
      {/* </Card> */}
    </div>
  );
};

EnterExpensesBankAccount.modules = {
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
EnterExpensesBankAccount.formats = [
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

export default EnterExpensesBankAccount;
