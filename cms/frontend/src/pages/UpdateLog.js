import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../components/card/Card";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./dashboard/Table.scss";



const UpdateLog = () => {
  const [button1,setButton1] = useState(false)
  const [button2,setButton2] = useState(false)
  const [regNum,setRegNum] = useState()
  const [classs,setClasss] = useState()
  const [table,setTable]=useState(false)
  const [details,setDetails] = useState()
  const [form,setForm] = useState(false)
  const [classDetails,setClassDetails] = useState()
  const navigate = useNavigate()


  const [studentData,setStudentData] = useState({
    name:'',regNum:null,classs:'',current_fee_month:null,current_fee_year:null,fName:'',address:'',contact:null,MonthlyFeeDetails:null,mName:'',officeName:'',monthlyFee:null,fCnic:'',mCnic:'',homeLandmark:'',officeLandmark:'',village:'',homeContact:null,workContact:null,admissionFee:null,securityDeposit:null,annualCharges:null,fOccupation:null,mOccupation:'',dob:null,gender:''
})


useEffect(() => {
   
  const fetchClasses=async()=>{

    try
    {
        const response = await axios({
            method:"get",
        baseURL:"http://localhost:8000/api/",
        url:`/class/class_names`,
        })
        console.log(response) 
        setClassDetails(response.data)
    }
    catch{
        console.log("err")
    }

}
if(!classDetails)
fetchClasses();
},[classDetails])
const handleInputChange=(e)=>{
    const {name,value} = e.target;
    console.log(name,value)
    setStudentData({ ...studentData, [name]:value });
}
const fetchStudent=async()=>{
    try
    {

        const response = await axios({
            method:"get",
        baseURL:"http://localhost:8000/api/",
        url:`/users/getStudentByRegNum/${regNum}`,
        })
        setForm(true)
        console.log(response) 
        setStudentData(response.data[0])
    }
    catch{
        console.log("err")
    }

}


const updateStudentdetails=async(e)=>{
  e.preventDefault()
  console.log(studentData)
    try
    {
        const response = await axios({
            method:"put",
        baseURL:"http://localhost:8000/api/",
        url:`/users/students/${regNum}`,
        data:studentData
        }) 
        toast.success("Details Updated Successfully!")
        setTimeout(() => {
          navigate("/update-options")
        }, 2000);
    }
    catch{
        console.log("err")
    }

}

   
    
    
  return (
    <div className="add-tender">
    <Card cardClass={"card"}>
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
{form && <>
  <form>
    
    <label>Student Name:</label>
          <input
            type="text"
            name="name"
          
            placeholder="Enter Student Name"
        value={studentData.name}
            onChange={handleInputChange}
          />
          <label>Gender:</label>
          <div style={{display:"flex",gap:"10px"}}>
            <p>
          <input type="radio" onChange={handleInputChange} value={studentData.gender} name="gender" />
          Male
      </p>
     

      <p>
          <input type="radio" name="gender" onChange={handleInputChange} value={studentData.gender} />
          Female
      </p>
</div>
<label>Class:</label>
      <select onChange={handleInputChange} value={studentData.classs} name="classs" >
      <option>--select class--</option>
           {
            classDetails?.map((m)=>
            <option value={m.class_id}>{m.class_name}</option>
            )
           } 
          
      </select>
           <label>DOB:</label>
          <input
            type="date"
            name="dob"
          
            placeholder="Enter Date of Birth"
        
            onChange={handleInputChange} value={studentData.dob}
          />
          
          <label>Father Name:</label>
          <input
            type="text"
            name="f_name"
          
            placeholder="Enter Father Name"
        
            onChange={handleInputChange} value={studentData.fName}
          />
          
          <label>Father CNIC:</label>
          <input
            type="text"
            name="fCnic"
          
            placeholder="Enter Father CNIC"
        
            onChange={handleInputChange} value={studentData.fCnic}
          />
          
          <label>Father Mobile Number:</label>
          <input
            type="number"
            name="fNumber"
          
            placeholder="Enter fNumber"
        
            onChange={handleInputChange} value={studentData.contact}
          />
          
          <label>Father Occupation:</label>
          <input
            type="text"
            name="fOccupation"
          
            placeholder="Enter Father Occupation"
        
            onChange={handleInputChange} value={studentData.fOccupation}
          />
          
          <label>Mother Name:</label>
          <input
            type="text"
            name="mName"
          
            placeholder="Enter Mother Name"
        
            onChange={handleInputChange} value={studentData.mName}
          />
          
          <label>Mother CNIC:</label>
          <input
            type="text"
            name="mCnic"
          
            placeholder="Enter Mother CNIC"
        
            onChange={handleInputChange} value={studentData.mCnic}
          />
          
          <label>Mother Mobile Number:</label>
          <input
            type="number"
            name="mNumber"
          
            placeholder="Enter Mother Mobile no."
        
            onChange={handleInputChange} value={studentData.homeContact}
          />
          
          <label>Mother Occupation:</label>
          <input
            type="text"
            name="mOccupation"
          
            placeholder="Enter Mother Occupation"
        
            onChange={handleInputChange} value={studentData.mOccupation}
          />
          
          <label>Enter Home Address(HouseNo,Road):</label>
          <input
            type="text"
            name="address"
          
            placeholder="Enter Home Address"
        
            onChange={handleInputChange} value={studentData.address}
          />
          
          <label>Home Landmark:</label>
          <input
            type="text"
            name="homeLandmark"
          
            placeholder="Enter Home Landmark"
        
            onChange={handleInputChange} value={studentData.homeLandmark}
          />
          
          <label>Village/Mohallah:</label>
          <input
            type="text"
            name="village"
          
            placeholder="Enter Village/Mohalla"
        
            onChange={handleInputChange} value={studentData.village}
          />
          

          <label>Home Contact Number:</label>
          <input
            type="number"
            name="homeContact"
          
            placeholder="Enter Home Contact No."
        
            onChange={handleInputChange} value={studentData.homeContact}
          />
          <label>Business/Office Name:</label>
          <input
            type="text"
            name="officeName"
          
            placeholder="Enter Business/Office Name"
        
            onChange={handleInputChange} value={studentData.officeName}
          />
          <label>Business/Office Address</label>
          <input
            type="text"
            name="officeAddress"
          
            placeholder="Enter Business/Address Address"
        
            onChange={handleInputChange} value={studentData.officeLandmark}
          />
          <label>Business/Office Landmark:</label>
          <input
            type="text"
            name="officeLandmark"
          
            placeholder="Enter Business/Office Landmark"
        
            onChange={handleInputChange} value={studentData.officeLandmark}
          />
          <label>Office Contact:</label>
          <input
            type="text"
            name="workContact"
          
            placeholder="Enter Enter Office Contact No."
        
            onChange={handleInputChange} value={studentData.workContact}
          />
          <label>Monthly Fee:</label>
          <input
            type="number"
            name="MonthlyFeeDetails"
          
            placeholder="Enter Monthly Fee"
        
            onChange={handleInputChange} value={studentData.MonthlyFeeDetails}
          />
          <label>Admission Fee:</label>
          <input
            type="number"
            name="admissionFee"
          
            placeholder="Enter Admission Fee"
        
            onChange={handleInputChange} value={studentData.admissionFee}
          />
          <label>Security Deposit:</label>
          <input
            type="number"
            name="securityDeposit"
          
            placeholder="Enter Security Deposit"
        
            onChange={handleInputChange} value={studentData.securityDeposit}
          />
          <label>Annual Charges:</label>
          <input
            type="number"
            name="annualCharges"
          
            placeholder="Enter Annual Charges"
        
            onChange={handleInputChange} value={studentData.annualCharges}
          />
          

    <div className="--my">
          <button
            type="submit"
            className="--btn --btn-primary"
            onClick={updateStudentdetails}
          >
            Update Student
          </button>
</div>
    </form>
    </>}
</Card>
      
    </div>
  );
};

UpdateLog.modules = {
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
UpdateLog.formats = [
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

export default UpdateLog;
