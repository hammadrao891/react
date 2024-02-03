import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../components/card/Card";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./AddStudent.css"
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

    navigate("/")
   } 
   const handleInputChange = (e) =>
   {
        const {name,value} = e.target;
        console.log(name,value)
        setStudentData({ ...studentData, [name]:value });
    }
  return (
    <div className="container">
    <ToastContainer/>
      <div className="text">
        Student Registration
      </div>
      <form onSubmit={addStudent}>
        <div className="form-row" >
        <div style={{display:"flex",justifyContent:"center"}}>
          
          <div className="input-data">
            <input   type="number"
              name="regNum"
              onChange={e=>handleInputChange(e)} required />
            <div className="underline"></div>
            <label htmlFor="">Registration Number</label>
          </div>
          <div className="input-data" >
            <input   type="text"
              name="name"
              onChange={e=>handleInputChange(e)}  required />
            <div className="underline" ></div>
            <label htmlFor="">Student Name</label>
          </div>
          <div className="input-data" >
            <input   type="date"
              name="admissionDate" style={{color:!studentData.admissionDate && "white"}}
              onChange={e=>handleInputChange(e)} required />
            <div className="underline" ></div>
            <label htmlFor="">Admission Date </label>
          </div>
          <div className="input-data" >
          <div style={{display:"flex",fontSize:"20px"}} >
            <input   type="radio" style={{width:"4em"}}
              name="gender" value="male"
              onChange={e=>handleInputChange(e)} required /> Male

            <input   type="radio"
              name="gender" value="female"
              onChange={e=>handleInputChange(e)} required /> Female
            {/* <div className="underline" ></div> */}
            </div>
            <div className="underline" ></div>
            <label htmlFor="gender" style={{bottom:"33px",color:studentData.gender && "#3498db"}}>Gender</label>
          </div>
          </div>
          </div>
          <div className="form-row" > 
          
          <div style={{display:"flex",justifyContent:"center"}}>   
          <div className="input-data" >
          <select className="" onChange={e=>handleInputChange(e)} name="classs" >
            <option></option>
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
            <div className="underline" ></div>
            <label htmlFor=""  style={{bottom:"33px",color:studentData.classs && "#3498db"}}>Class</label>
          </div>
          <div className="input-data" >
            <input  type="date"
              name="dob" style={{color:!studentData.dob && "white"}}
              onChange={e=>handleInputChange(e)} required />
            <div className="underline" ></div>
            <label htmlFor="">DOB</label>
          </div>
          <div className="input-data" >
            <input type="text" name="fName" onChange={e=>handleInputChange(e)} required />
            <div className="underline" ></div>
            <label htmlFor="">Father Name</label>
          </div>
          <div className="input-data" >
            <input type="text" name="fCnic" onChange={e=>handleInputChange(e)} required />
            <div className="underline" ></div>
            <label htmlFor="">Father CNIC</label>
          </div>
          </div>
          </div>
          <div className="form-row">
          <div style={{display:"flex",justifyContent:"center"}}>
          <div className="input-data" >
            <input type="number" name="contact" onChange={e=>handleInputChange(e)}  required />
            <div className="underline" ></div>
            <label htmlFor="">Father Mobile Number</label>
          </div>
          <div className="input-data" >
            <input type="text" name="fOccupation" onChange={e=>handleInputChange(e)}  required />
            <div className="underline" ></div>
            <label htmlFor="">Father Occupation</label>
          </div>
          <div className="input-data" >
            <input type="text" name="mName" onChange={e=>handleInputChange(e)}  required />
            <div className="underline" ></div>
            <label htmlFor="">Mother Name</label>
          </div>
          <div className="input-data" >
            <input type="text" name="mCnic" onChange={e=>handleInputChange(e)}  required />
            <div className="underline" ></div>
            <label htmlFor="">Mother CNIC</label>
          </div>
          </div>

        </div>
                <div className="form-row">
          <div style={{display:"flex",justifyContent:"center"}}>
          <div className="input-data" >
            <input type="number" name="mNumber" onChange={e=>handleInputChange(e)}  required />
            <div className="underline" ></div>
            <label htmlFor="">Mother Mobile Number</label>
          </div>
          <div className="input-data" >
            <input type="text" name="mOccupation" onChange={e=>handleInputChange(e)}  required />
            <div className="underline" ></div>
            <label htmlFor="">Mother Occupation</label>
          </div>
          <div className="input-data" >
            <input type="text" name="address" onChange={e=>handleInputChange(e)}  required />
            <div className="underline" ></div>
            <label htmlFor="">Home Address(HouseNo,Road)</label>
          </div>
          <div className="input-data" >
            <input type="text" name="homeLandmark" onChange={e=>handleInputChange(e)}  required />
            <div className="underline" ></div>
            <label htmlFor="">Home Landmark</label>
          </div>
          </div>

        </div>
        <div className="form-row">
          <div style={{display:"flex",justifyContent:"center"}}>
          <div className="input-data" >
            <input type="text" name="village" onChange={e=>handleInputChange(e)}  required />
            <div className="underline" ></div>
            <label htmlFor="">Village/Mohallah</label>
          </div>
          <div className="input-data" >
            <input type="number" name="homeContact" onChange={e=>handleInputChange(e)}  required />
            <div className="underline" ></div>
            <label htmlFor="">Home Contact Number</label>
          </div>
          <div className="input-data" >
            <input type="text" name="officeName" onChange={e=>handleInputChange(e)}  required />
            <div className="underline" ></div>
            <label htmlFor="">Business/Office Name</label>
          </div>
          <div className="input-data" >
            <input type="text" name="officeAddress" onChange={e=>handleInputChange(e)}  required />
            <div className="underline" ></div>
            <label htmlFor="">Business/Office Address</label>
          </div>
          </div>

        </div>
        <div className="form-row">
          <div style={{display:"flex",justifyContent:"center"}}>
          <div className="input-data" >
            <input type="text" name="officeLandmark" onChange={e=>handleInputChange(e)}  required />
            <div className="underline" ></div>
            <label htmlFor="">Business/Office Landmark</label>
          </div>
          <div className="input-data" >
            <input type="number" name="workContact" onChange={e=>handleInputChange(e)}  required />
            <div className="underline" ></div>
            <label htmlFor="">officeContact</label>
          </div>
          <div className="input-data" >
            <input type="number" name="MonthlyFeeDetails" onChange={e=>handleInputChange(e)}  required />
            <div className="underline" ></div>
            <label htmlFor="">Monthly Fee</label>
          </div>
          <div className="input-data" >
            <input type="number" name="admissionFee" onChange={e=>handleInputChange(e)}  required />
            <div className="underline" ></div>
            <label htmlFor="">Admission Fee</label>
          </div>
          </div>

        </div>
        <div className="form-row">
          <div style={{display:"flex",justifyContent:"center"}}>
          <div className="input-data" >
            <input type="number" name="securityDeposit" onChange={e=>handleInputChange(e)}  required />
            <div className="underline" ></div>
            <label htmlFor="">Security Deposit</label>
          </div>
          <div className="input-data" >
            <input type="number" name="annualCharges" onChange={e=>handleInputChange(e)}  required />
            <div className="underline" ></div>
            <label htmlFor="">Annual Charges</label>
          </div>
                   </div>

        </div>


        <div className="--my" style={{padding:"3em"}}>
            <button
              type="submit"
              className="--btn --btn-primary"
           
            >
              Add Student
            </button>
</div>
        {/* Add additional form rows here if needed */}
      </form>
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
