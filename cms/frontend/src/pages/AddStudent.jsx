import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../components/card/Card";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// import "../tenderForm/TenderForm.scss";

const AddStudent = () => {
  const [subtype, setSubtype] = useState("");
  const [type,setType]=useState("")
  const [data,setData]=useState()
  const [subtypeItem,setSubtypeItem] = useState()
  const[newItem,setNewItem]= useState()
  const [selectedItem,setSelectedItem] = useState()
  const navigate = useNavigate()
  useEffect(() => {
    // Reset subtype when category type changes
    setSubtype("");
  }, []);

const [studentData,setStudentData] = useState({
    name:'',regNum:null,admissionDate:'',classs:'',current_fee_month:null,current_fee_year:null,fName:'',address:'',contact:null,MonthlyFeeDetails:null,mName:'',officeName:'',monthlyFee:null,fCnic:'',mCnic:'',homeLandmark:'',officeLandmark:'',village:'',homeContact:null,workContact:null,admissionFee:null,securityDeposit:null,annualCharges:null,fOccupation:null,mOccupation:'',dob:null,gender:''
})

   const addStudent = async(e) =>{
    e.preventDefault()
    console.log(studentData)

    await axios({
        method:"post",
        baseURL:"http://localhost:8000/api/",
        url:"/users/register",
        data:studentData
    })
    toast.success("Student Registered Successfully!")


   } 
   const handleInputChange = (e) =>
   {
        const {name,value} = e.target;
        console.log(name,value)
        setStudentData({ ...studentData, [name]:value });
    }
  return (
    <div className="add-tender">
      <Card cardClass={"card"}>
  <ToastContainer/>
        <form>
        <label>Registration Number:</label>
            <input
              type="number"
              name="regNum"
            
              placeholder="Enter Registration Number"
          
              onChange={e=>handleInputChange(e)}
            />
      <label>Student Name:</label>
            <input
              type="text"
              name="name"
            
              placeholder="Enter Student Name"
          
              onChange={e=>handleInputChange(e)}
            />
          <label>Admission Date:</label>
            <input
              type="date"
              name="admissionDate"
            
              placeholder="Enter Admission Date"
          
              onChange={e=>handleInputChange(e)}
            />
            <label>Gender:</label>
            <div style={{display:"flex",gap:"10px"}}>
              <p>
            <input type="radio" onChange={e=>handleInputChange(e)} name="gender" value="male"/>
            Male
        </p>
       

        <p>
            <input type="radio" name="gender" onChange={e=>handleInputChange(e)} value="female"/>
            Female
        </p>
</div>
 <label>Class</label>
        <select onChange={e=>handleInputChange(e)} name="classs" >
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
             <label>DOB:</label>
            <input
              type="date"
              name="dob"
            
              placeholder="Enter Date of Birth"
          
              onChange={e=>handleInputChange(e)}
            />
            
            <label>Father Name:</label>
            <input
              type="text"
              name="fName"
            
              placeholder="Enter Father Name"
          
              onChange={e=>handleInputChange(e)}
            />
            
            <label>Father CNIC:</label>
            <input
              type="text"
              name="fCnic"
            
              placeholder="Enter Father CNIC"
          
              onChange={e=>handleInputChange(e)}
            />
            
            <label>Father Mobile Number:</label>
            <input
              type="number"
              name="contact"
            
              placeholder="Enter fNumber"
          
              onChange={e=>handleInputChange(e)}
            />
            
            <label>Father Occupation:</label>
            <input
              type="text"
              name="fOccupation"
            
              placeholder="Enter Father Occupation"
          
              onChange={e=>handleInputChange(e)}
            />
            
            <label>Mother Name:</label>
            <input
              type="text"
              name="mName"
            
              placeholder="Enter Mother Name"
          
              onChange={e=>handleInputChange(e)}
            />
            
            <label>Mother CNIC:</label>
            <input
              type="text"
              name="mCnic"
            
              placeholder="Enter Mother CNIC"
          
              onChange={e=>handleInputChange(e)}
            />
            
            <label>Mother Mobile Number:</label>
            <input
              type="number"
              name="mNumber"
            
              placeholder="Enter Mother Mobile no."
          
              onChange={e=>handleInputChange(e)}
            />
            
            <label>Mother Occupation:</label>
            <input
              type="text"
              name="mOccupation"
            
              placeholder="Enter Mother Occupation"
          
              onChange={e=>handleInputChange(e)}
            />
            
            <label>Enter Home Address(HouseNo,Road):</label>
            <input
              type="text"
              name="address"
            
              placeholder="Enter Home Address"
          
              onChange={e=>handleInputChange(e)}
            />
            
            <label>Home Landmark:</label>
            <input
              type="text"
              name="homeLandmark"
            
              placeholder="Enter Home Landmark"
          
              onChange={e=>handleInputChange(e)}
            />
            
            <label>Village/Mohallah:</label>
            <input
              type="text"
              name="village"
            
              placeholder="Enter Village/Mohalla"
          
              onChange={e=>handleInputChange(e)}
            />
            

            <label>Home Contact Number:</label>
            <input
              type="number"
              name="homeContact"
            
              placeholder="Enter Home Contact No."
          
              onChange={e=>handleInputChange(e)}
            />
            <label>Business/Office Name:</label>
            <input
              type="text"
              name="officeName"
            
              placeholder="Enter Business/Office Name"
          
              onChange={e=>handleInputChange(e)}
            />
            <label>Business/Office Address</label>
            <input
              type="text"
              name="officeAddress"
            
              placeholder="Enter Business/Address Address"
          
              onChange={e=>handleInputChange(e)}
            />
            <label>Business/Office Landmark:</label>
            <input
              type="text"
              name="officeLandmark"
            
              placeholder="Enter Business/Office Landmark"
          
              onChange={e=>handleInputChange(e)}
            />
            <label>Office Contact:</label>
            <input
              type="text"
              name="workContact"
            
              placeholder="Enter Enter Office Contact No."
          
              onChange={e=>handleInputChange(e)}
            />
            <label>Monthly Fee:</label>
            <input
              type="number"
              name="MonthlyFeeDetails"
            
              placeholder="Enter Monthly Fee"
          
              onChange={e=>handleInputChange(e)}
            />
            <label>Admission Fee:</label>
            <input
              type="number"
              name="admissionFee"
            
              placeholder="Enter Admission Fee"
          
              onChange={e=>handleInputChange(e)}
            />
            <label>Security Deposit:</label>
            <input
              type="number"
              name="securityDeposit"
            
              placeholder="Enter Security Deposit"
          
              onChange={e=>handleInputChange(e)}
            />
            <label>Annual Charges:</label>
            <input
              type="number"
              name="annualCharges"
            
              placeholder="Enter Annual Charges"
          
              onChange={e=>handleInputChange(e)}
            />
            

      <div className="--my">
            <button
              type="submit"
              className="--btn --btn-primary"
            onClick={addStudent}
            >
              Add Student
            </button>
</div>
      </form>
      </Card>
    </div>
  );
};

AddStudent.modules = {
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
AddStudent.formats = [
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

export default AddStudent;
