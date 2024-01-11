import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../components/card/Card";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./dashboard/Table.scss";



const GenerateFeeAdmin = () => {
    const [options, setOptions] = useState([]);
   const [annualCharges,setAnnualCharges] = useState(false)
   const [admissionFee,setAdmissionFee] = useState(false)
   const [MonthlyFeeDetails,setMonthlyFeeDetails] = useState(false)
   const [miscAmount, setMiscAmount] = useState(0)
   const [miscDescription,setMiscDescription] = useState('')
   const [feeMonth,setFeeMonth] = useState()
    const generateChallans = async()=>{
      const data={annualCharges,admissionFee,MonthlyFeeDetails,miscAmount,miscDescription,feeMonth}
        try
        {
            const response = await axios({
                method:"post",
            baseURL:"http://localhost:8000/api/",
            url:`users/generateFeeChallan/`,
            data
            })
            console.log(response) 
            toast.success("Challans generated Successfully!")
        }
        catch{
            console.log("err")
        }
    
    }
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
      };
  
      generateOptions();
      
    }, []); 
     
    return (
      <div style={{color:"black",fontSize:"medium",marginTop:"1em"}}>
      <ToastContainer/>
        <label htmlFor="monthYearDropdown">Select Month-Year:</label>
        <select name="feeMonth" onChange={e=>setFeeMonth(e.target.value)} id="monthYearDropdown">
          {options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <div>
        <input onChange={e=>setAnnualCharges(!annualCharges)}
          type="checkbox"
          id="checkbox1"
          name="annualCharges"
        />
        <label htmlFor="checkbox1">Annual Charges</label>
      </div>
      <div>
        <input onChange={e=>setAdmissionFee(!admissionFee)}
          type="checkbox"
          id="checkbox2"
          name="admissionFee"
        //   checked={checkboxValues.checkbox1}
        //   onChange={() => handleCheckboxChange('checkbox1')}
        />
        <label htmlFor="checkbox2">Admission Fee</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="checkbox3"
          name="MonthlyFeeDetails"
          onChange={e=>setMonthlyFeeDetails(!MonthlyFeeDetails)}
        />
        <label htmlFor="checkbox3">MonthlyFee</label>
      </div>
      <table className="">
        <tbody>
            <tr>
                <td>Other Charges Description:</td>
                <td><input type="text" name="miscDescription" onChange={e=>setMiscDescription(e.target.value)}/></td>
            </tr>
            
            <tr>
                <td>Other Charges Amount:</td>
                <td><input type="number" name="miscAmount" onChange={e=>setMiscAmount(e.target.value)}/></td>
            </tr>
        </tbody>
      </table>
      <button className="--btn --btn-success" onClick={generateChallans}>Click to Generate Challans</button>
      </div>
    );
  };

GenerateFeeAdmin.modules = {
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
GenerateFeeAdmin.formats = [
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

export default GenerateFeeAdmin;
