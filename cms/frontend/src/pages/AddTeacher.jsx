import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../components/card/Card";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// import "../tenderForm/TenderForm.scss";

const AddTeacher = () => {
 const [name,setName] = useState()
 const [primarySubject,setPrimarySubject] = useState()
 const [secondarySubject,setSecondarySubject] = useState()
  const navigate = useNavigate()
  


   const AddTeacher = async(e) =>{
    e.preventDefault()

    await axios({
        method:"post",
        baseURL:"http://localhost:8000/api/",
        url:"/timetable/addTeacher",
        data:{
            teacher_name:name,
            secondary_subject:secondarySubject,
            main_subject:primarySubject
        }
    })
    toast.success("Teacher Added Successfully!")


   } 
  
  return (
    <div className="add-tender">
      <Card cardClass={"card"}>
  <ToastContainer/>
        <form>
        <label>Name:</label>
            <input
              type="text"
              name="regNum"
            
              placeholder="Enter Name of Teacher"
          
              onChange={e=>setName(e.target.value)}
            />
      <label>Main Subject:</label>
            <input
              type="text"
              name="name"
            
              placeholder="Enter Main Subject"
          
              onChange={e=>setPrimarySubject(e.target.value)}
            />
          <label>Secondary Subject:</label>
            <input
              type="text"
              name=""
            
              placeholder="Enter Secondary Subeject"
          
              onChange={e=>setSecondarySubject(e.target.value)}
            />
           
      <div className="--my">
            <button
              type="submit"
              className="--btn --btn-primary"
            onClick={AddTeacher}
            >
              Add Teacher
            </button>
</div>
      </form>
      </Card>
    </div>
  );
};

AddTeacher.modules = {
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
AddTeacher.formats = [
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

export default AddTeacher;
