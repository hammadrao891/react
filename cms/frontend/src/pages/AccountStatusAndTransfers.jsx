import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../components/card/Card";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./dashboard/Table.scss";



const AccountStatusAndHistory = () => {
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
        <thead>
          <th>Account Name</th>
          <th>Account Description</th>
          <th>Initial Balance</th>
          <th>Initial Balance Set Time</th>
          <th>Current Balance</th>
          <th>Balance Update Time</th>

        </thead>
        <tbody>
          <tr>
               <td>1</td>
               <td>sss</td>
               <td>sss</td>
               <td>sss</td>
               <td>sss</td>
               <td>sss</td>

          </tr>
        </tbody>
       </table>
       <h4>Transfer</h4>
     <table className="table">
          <tbody>
          <tr>
               <td>Transfer Record Time</td>
               <td>{formattedDate}</td>  
          </tr>
          <tr>
               <td>Transfer Account From</td>
               <td><select>
               <option value="NITB Bank Account">NITB Bank Account</option>
               <option value="Cash IN Hand Account">Cash IN Hand Account</option>
               <option value="Fee Collection">Fee Collection</option>
               </select></td>  
          </tr>
          <tr>
               <td>Transfer Account To</td>
               <td><select>
               <option value="NITB Bank Account">NITB Bank Account</option>
               <option value="Cash IN Hand Account">Cash IN Hand Account</option>
               <option value="Fee Collection">Fee Collection</option>
               </select></td>  
          </tr>
          <tr>
               <td>Transfer Amount</td>
               <td><input /></td>  
          </tr>
          <tr>
               <td>Transfer By</td>
               <td><input /></td>  
          </tr>
          <tr>
               <td>Authorized By</td>
               <td><input /></td>  
          </tr>
          <tr>
               <td>Reason For Transfer</td>
               <td><input /></td>  
          </tr>
       
         
         
          
         </tbody>
         </table>
         <button className="--btn --btn-primary">Submit</button>
      {/* </Card> */}
    </div>
  );
};

AccountStatusAndHistory.modules = {
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
AccountStatusAndHistory.formats = [
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

export default AccountStatusAndHistory;
