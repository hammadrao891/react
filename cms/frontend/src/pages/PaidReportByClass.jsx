import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../components/card/Card";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./dashboard/Table.scss";



const PaidReportByClass = () => {
  const [classs,setClasss] = useState()
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
       <label style={{fontSize:"12px",color:"black"}}>Class</label>
        <select onChange={e=>setClasss(e.target.value)} name="classs" >
            <option>--select class--</option>
            <option value="Play Group">Play Group</option>
            <option value="Nursery Green">Nursery Green</option>
            <option value="Nursery Blue">Nursery Blue</option>
            <option value="KG-Red">KG-Red</option>
            <option value="KG-Yellow">KG-Yellow</option>
            <option value="1-Red">1-Red</option>
            <option value="1-Yellow">1-Yellow</option>
            <option value="2-Red">2-Red</option>
            <option value="2-Yellow">2-Yellow</option>
            <option value="2-Green">2-Green</option>
            <option value="3-Red">3-Red</option>
            <option value="3-Yellow">3-Yellow</option>
            <option value="4-Red">4-Red</option>
            <option value="4-Yellow">4-Yellow</option>
            <option value="4-Green">4-Green</option>
            <option value="5-Red">5-Red</option>
            <option value="5-Yellow">5-Yellow</option>
            <option value="6-Red">6-Red</option>
            <option value="6-Yellow">6-Yellow</option>
            <option value="7-Red">7-Red</option>
            
        </select>
 
      
   {classs && <>
       
     <table className="table">
          <thead>
            <th>Sr #</th>
            <th>Reg No.</th>
            <th>Student Name</th>
            <th>Father Name</th>
            <th>Class</th>
            <th>Monthly Tution Fee</th>
            <th>Fine</th>
            <th>Misc Charges</th>
            <th>Previous Due</th>
            <th>Total Amount Due</th>
            <th>Payment Status</th>
            <th>Paid Amount</th>
            <th>Payment Date</th>
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
               <td>m.previousDue</td>
               <td>m.previousDue</td>
               <td>m.previousDue</td>
               <td>m.previousDue</td>
               <td>m.previousDue</td>
               <td></td>
          </tr>
          {/* )} */}
         </tbody>
         </table>
         </>}
      {/* </Card> */}
    </div>
  );
};

PaidReportByClass.modules = {
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
PaidReportByClass.formats = [
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

export default PaidReportByClass;
