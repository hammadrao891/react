import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../components/card/Card";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./dashboard/Table.scss";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';



const GenerateSingleChallan = () => {
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
  const tableRef = useRef(null);
  
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
        url:`/fee/student-details/${regNum}`,
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
        url:`/fee/update-monthly-fee/${regNum}`,
        data:{newMonthlyFeeDetails}
        })
        toast.success("Monthly Tution Fee Updated Successfully!")
        setTimeout(() => {
            
            navigate(`/fee-collection-and-modification`);
          }, 2000);

    }
    catch{
        console.log("err")
    }


}

const saveAsPDF = () => {
    const input = tableRef.current;

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');

        // Set custom page size
        const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });

        // Calculate width and height based on the aspect ratio of A4 size
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('feeChallan.pdf');
      });
  };
    
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
       
       {table && <> <table ref={tableRef} className="tableFee">
        <thead> 
        <tr> 
        <td  colSpan="4" style={{textAlign:"center",fontWeight:700}}>Air Foundation School System,<br/>Ashraf Town Chakwal 0543-552497</td>
        <td  colSpan="4" style={{textAlign:"center",fontWeight:700}}>Air Foundation School System,<br/>Ashraf Town Chakwal 0543-552497</td> 
        </tr>
         </thead>
          <tbody>
           <tr>
           <td colSpan="2">Student Copy</td>
           <td colSpan="2">Challan No : {details.regNum}</td>
           <td colSpan="2">School Copy</td>
           <td colSpan="2">Challan No : {details.regNum}</td>
           
           </tr>
           <tr>
            <td colSpan="2">Student Name</td>
            <td colSpan="2">{details.name}</td>
            <td colSpan="2">Student Name</td>
            <td colSpan="2">{details.name}</td>
           </tr>
           <tr>
            <td colSpan="2">Father Name</td>
            <td colSpan="2">{details.fName}</td>
            <td colSpan="2">Father Name</td>
            <td colSpan="2">{details.fName}</td>
           </tr>
           <tr>
            <td colSpan="2">Class</td>
            <td colSpan="2">{details.classs}</td>
            <td colSpan="2">Class</td>
            <td colSpan="2">{details.classs}</td>
           </tr>
           <tr>
            <td colSpan="2">Fee Month</td>
            <td colSpan="2">{details.feeMonth}</td>
            <td colSpan="2">Fee Month</td>
            <td colSpan="2">{details.feeMonth}</td>
           </tr>
           <tr>
            <td colSpan="2">Tution Fee</td>
            <td colSpan="2">{details.MonthlyFeeDetails}</td>
            <td colSpan="2">Tution Fee</td>
            <td colSpan="2">{details.MonthlyFeeDetails}</td>
           </tr>
           <tr>
            <td colSpan="2">Previous Due</td>
            <td colSpan="2">{details.previousDue}</td>
            <td colSpan="2">Previous Due</td>
            <td colSpan="2">{details.previousDue}</td>
           </tr>
           <tr>
            <td colSpan="2">Total Amount Due</td>
            <td colSpan="2">{details.totalAmountDue}</td>
            <td colSpan="2">Total Amount Due</td>
            <td colSpan="2">{details.totalAmountDue}</td>
           </tr>
           </tbody> 
           </table> 
           <button onClick={saveAsPDF}>Save as PDF</button></> }   
      {/* </Card> */}
    </div>
  );
};

GenerateSingleChallan.modules = {
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
GenerateSingleChallan.formats = [
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

export default GenerateSingleChallan;
