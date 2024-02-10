import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../components/card/Card";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./dashboard/Table.scss";



const CheckStudentInfo = () => {
  const [button1,setButton1] = useState(false)
  const [button2,setButton2] = useState(false)
  const [regNum,setRegNum] = useState()
  const [classs,setClasss] = useState()
  const [table,setTable]=useState(false)
  const [details,setDetails] = useState()
  const [classDetails,setClassDetails] = useState()
  


const handleButton1 =()=>{
    setButton2(false)
    setButton1(true)
}
const handleButton2 =()=>{
    setButton1(false)
    setButton2(true)
}
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

const fetchStudent=async()=>{

    try
    {
        const response = await axios({
            method:"get",
        baseURL:"http://localhost:8000/api/",
        url:`/users/getStudentByRegNum/${regNum}`,
        })
        setTable(true)
        console.log(response) 
        setDetails(response.data)
    }
    catch{
        console.log("err")
    }

}

const fetchStudents=async()=>{

    try
    {
        const response = await axios({
            method:"get",
        baseURL:"http://localhost:8000/api/",
        url:`/users/getClassStudents/${classs}`,
        })
        setTable(true)
        console.log(response) 
        setDetails(response.data)
    }
    catch{
        console.log("err")
    }


}
   
    
    
  return (
    <div className="add-tender">
      {/* <Card cardClass={"card"}> */}
     <ToastContainer/>
        
        <div style={{display:"flex"}}>
     <button  className="square-button" onClick={handleButton1}>Individual Student Information</button>
     <button className="square-button" onClick={handleButton2}>Student Information By Class</button>
     </div>  

     {
        button1 &&
        <>
            
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
        </>
     }
     {
        button2 && 
        <>
        <label style={{color:"black",fontSize:"small"}}>Select Class:</label>
        <select onChange={e=>setClasss(e.target.value)} name="classs" >
             <option>--select class--</option>
           {
            classDetails?.map((m)=>
            <option value={m.class_id}>{m.class_name}</option>
            )
           } 
        </select>
        <button
            onClick={fetchStudents}
              type="submit"
              className="--btn --btn-success"
            >
              Submit
            </button>
        </>
     }
     {table &&
     <>
     <table className="table">
          <thead>
            <tr>
              {/* <th>Details</th> */}
              <th>Sr#</th>
              <th>Registration Number</th>
              <th>Student Name</th>
              <th>Gender</th>
              <th>Class</th>
              <th>Date of Birth</th>
              <th>Monthly Fee</th>
              <th>Father Name</th>
              <th>Father CNIC</th>
              <th>Father Mobile</th>
              <th>Father Occupation</th>
              <th>Mother Name</th>
              <th>Mother CNIC</th>
              <th>Mother Mobile</th>
              <th>Mother Occupation</th>
              <th>Home Address</th>
              <th>Home Village</th>
              <th>Home Landmark</th>
              <th>Home Contact No</th>
              <th>Father Business</th>
              <th>Business Address</th>
              <th>Business Landmark</th>
              <th>Admission Fee</th>
              <th>Security Deposit</th>
              <th>Previous School</th>
              <th>Admission Date</th>
              
            </tr>
          </thead>
          <tbody>
            {details?.map((student,index) => (
              <tr key={student.name}>
                <td>{index+1}</td>
                <td>{student.regNum}</td>
                <td>{student.name}</td>
                <td>{student.gender}</td>
                <td>{student.class_name}</td>
                <td>{student.dob}</td>
                <td>{student.MonthlyFeeDetails}</td>
                <td>{student.fName}</td>
                <td>{student.fCnic}</td>
                <td>{student.contact}</td>
                <td>{student.fOccupation}</td>
                <td>{student.mName}</td>
                <td>{student.mCnic}</td>
                <td>{student.homeContact}</td>
                <td>{student.mOccupation}</td>
                <td>{student.address}</td>
                <td>{student.vilage}</td>
                <td>{student.homeLandmark}</td>
                <td>{student.homeContact}</td>
                <td>{student.officeName}</td>
                <td>{student.address}</td>
                <td>{student.officeLandmark}</td>
                <td>{student.admissionFee}</td>
                <td>{student.securityDeposit}</td>
                <td>-</td>
                <td>{student.admissionDate}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
     </>

     }
      
      {/* </Card> */}
    </div>
  );
};

CheckStudentInfo.modules = {
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
CheckStudentInfo.formats = [
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

export default CheckStudentInfo;
