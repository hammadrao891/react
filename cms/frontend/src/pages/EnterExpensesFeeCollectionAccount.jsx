import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../components/card/Card";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./dashboard/Table.scss";



const EnterExpensesFeeCollectionAccount = () => {
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
  
  const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
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
       
     <table className="table">
          <tbody>
          <tr>
               <td>Select Expense Type</td>
               <td><select>
                <option>Monthly Rent</option>
                <option>Salary</option>
                <option>Royalty</option>
                <option>Utitlity Bills</option>
                <option>Maintenance & Repair</option>
                <option>Kitchen</option>
                <option>Stationary</option>
                <option value="EOBI">EOBI</option>
                <option value="Social Security">Social Security</option>
                <option value="Income Tax">Income Tax</option>
                <option value='Personal'>Personal</option>
                <option value='Advertisement'>Advertisement</option>
                <option value='School Visits to HQ/Board etc'>School Visits to HQ/Board etc</option>
                <option value='STAFF LOAN'>STAFF LOAN</option>
                <option value='MOTORCYCLE PETROL'>MOTORCYCLE PETROL</option>
                <option value='MOTORCYCLE REPAIR&MAINTENANCE'>MOTORCYCLE REPAIR&MAINTENANCE</option>
                <option value='CAR REPAIR&MAINTENANCE'>CAR REPAIR&MAINTENANCE</option>
                <option value='CAR PETROL'>CAR PETROL</option>
                <option value='STAFF WELFARE'>STAFF WELFARE</option>
                <option value='ASSETS'>ASSETS</option>
                </select></td>  
          </tr>
          
          <tr>
               <td>Expense Record Time</td>
               <td>{formattedDate}</td>  
          </tr>
          
          <tr>
               <td>Expense Description</td>
               <td><input /></td>  
          </tr>
          
          <tr>
               <td>Expense Amount</td>
               <td><input /></td>  
          </tr>
          
          <tr>
               <td>Expense Pay Account</td>
               <td><select><option>Fee Collection</option></select></td>  
          </tr>
          <tr>
               <td>Invoice Pay Person</td>
               <td><input /></td>  
          </tr>
          
          <tr>
               <td>Invoice Number</td>
               <td><input /></td>  
          </tr>
          
          <tr>
               <td>Invoice File Number</td>
               <td><input /></td>  
          </tr>
         </tbody>
         </table>
         <button className="--btn --btn-primary">Submit</button>
      {/* </Card> */}
    </div>
  );
};

EnterExpensesFeeCollectionAccount.modules = {
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
EnterExpensesFeeCollectionAccount.formats = [
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

export default EnterExpensesFeeCollectionAccount;
