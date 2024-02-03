import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../components/card/Card";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./dashboard/Table.scss";



const AccountTransfersHistory = () => {
  const [details,setDetails] = useState()
  
  

useEffect(()=>{
const fetchStudent=async()=>{

    try
    {
        const response = await axios({
            method:"get",
        baseURL:"http://localhost:8000/api/",
        url:`/expense/transfers`,
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
            <th>Transfer Amount</th>
            <th>Transfer From</th>
            <th>Transfer To</th>
            <th>Transfer Reason</th>
            <th>Transfer Time</th>

            
          </thead>
          <tbody>
          {details.map((m,index)=>
          <tr key={index}>
               <td>{index+1}</td>
               <td>{m.transfer_amount}</td>
               <td>{m.transfer_account_from_name}</td>
               <td>{m.transfer_account_to_name}</td> 
               <td>{m.reason_for_transfer}</td>
               <td>{m.transfer_record_time}</td>
               
          </tr>
          )}
         </tbody>
         </table>
         </>}
      {/* </Card> */}
    </div>
  );
};

AccountTransfersHistory.modules = {
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
AccountTransfersHistory.formats = [
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

export default AccountTransfersHistory;
