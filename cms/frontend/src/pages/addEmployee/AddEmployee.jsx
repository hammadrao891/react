import React, { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../components/card/Card";


import  "../../components/tender/tenderForm/TenderForm.scss"
import axios from "axios";
import { registerUser } from "../../services/authService";
import { useSelector } from "react-redux";
import { selectName } from "../../redux/features/auth/authSlice";
import { AuthContext } from "../../context/AuthContext";
const AddEmployee = () => {
  const {user} =useContext(AuthContext)
  console.log(user)
    const name = useSelector(selectName)
    const [employeeDetails,setEmployeeDetails] = useState({
        pNum:null,
        name:"",
        fName:"",
        des:"",
        cnic:'',
        pop:"",
        pon:"",
        pass:"",
        cadre:'',
        zone:'',
        circle:'',
        userType:"Employee"
    })
    const handleInputChange = (e) => {
        const { name, value } = e.target;
      
        setEmployeeDetails((prevDetails) => ({
          ...prevDetails,
          [name]: value,
        }));
      };
      const handleSubmit =async (e) =>
      {
        e.preventDefault();
        const{pNum,
            name,
            fName,
            des,
            cnic,
            pop,
            pon,
            pass,
            cadre,
            zone,
            circle,userType } = employeeDetails
        const userData={
            pNum,
            name,
            fName,
            des,
            cnic,
            pop,
            pon,
            pass,
            cadre,
            zone,
            circle,userType 
        }
        const data = await registerUser(userData)
        console.log(data);
        // try{
        //     await axios({
        //         method:"post",
        //         baseURL:"http://localhost:5000/api/",
        //         url:"users/register",
        //         data:userData
        //       })
        // alert("Employee Registered Successfully")
        //     }
        
        // catch(err)
        // {
        //     console.log(err)
        // }
        
      }

      
  return (
    <div className="add-tender">
      <Card cardClass={"card"}>
        <form onSubmit={handleSubmit}>     
          <label>Personal No.:</label>
          <input
            type="number"
            placeholder="Enter Personal No."
            name="pNum"
            // value={vendor?.firmName}
            onChange={handleInputChange}
          />

          <label>Name:</label>
          <input
            type="text"
            name="name"
            // value={vendor?.type}
            onChange={handleInputChange}
          />
           <label>Father Name:</label>
          <input
            type="text"
            name="fName"
            // value={vendor?.type}
            onChange={handleInputChange}
          />
          <label>Designation:</label>
          <input
            type="text"
            name="des"
            // value={vendor?.type}
            onChange={handleInputChange}
          />

          <label>CNIC:</label>
          <input
            type="text"
            placeholder="Enter CNIC"
            name="cnic"
            // value={vendor?.CNIC}
            onChange={handleInputChange}
          />

          <label>Place of Posting:</label>
          <input
            type="text"
            placeholder="Enter place of Posting"
            name="pop"
            // value={vendor?.contactNo}
            onChange={handleInputChange}
          />

          <label>Posting Order No.:</label>
          <input
            type="text"
            placeholder="Enter Posting Order No."
            name="pon"
            // value={vendor?.NTNNo}
            onChange={handleInputChange}
          />

          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter Password"
            name="pass"
            // value={vendor?.salesTaxNo}
            onChange={handleInputChange}
          />

          <label>Cadre:</label>
          <input
            type="text"
            placeholder="Enter Cadre"
            name="cadre"
            // value={vendor?.IBAN}
            onChange={handleInputChange}
          />

          <label>Zone:</label>
          <input
            type="text"
            placeholder="Enter Zone"
            name="zone"
            // value={vendor?.representative}
            onChange={handleInputChange}
          />

          <label>Circle:</label>
          <input
            type="text"
            placeholder="Enter Circle"
            name="circle"
            // value={vendor?.email}
            onChange={handleInputChange}
          />
           <label>Type:</label>
          <select name="userType" onChange={handleInputChange}>
            <option value={null}>--select--</option>
            <option value="Employee">Employee</option>
            <option value="Store Incharge">Store Incharge</option>
            {/* <option value="AD">AD</option> */}
          </select>

          

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Register Employee
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

// VendorForm.modules = {
//   toolbar: [
//     [{ header: "1" }, { header: "2" }, { font: [] }],
//     [{ size: [] }],
//     ["bold", "italic", "underline", "strike", "blockquote"],
//     [{ align: [] }],
//     [{ color: [] }, { background: [] }],
//     [
//       { list: "ordered" },
//       { list: "bullet" },
//       { indent: "-1" },
//       { indent: "+1" },
//     ],
//     ["clean"],
//   ],
// };
// VendorForm.formats = [
//   "header",
//   "font",
//   "size",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "blockquote",
//   "color",
//   "background",
//   "list",
//   "bullet",
//   "indent",
//   "link",
//   "video",
//   "image",
//   "code-block",
//   "align",
// ];

export default AddEmployee;
