import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Card from "../components/card/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const UpdateStudentClass = () =>{
    const [regNum,setRegNum] = useState()
    const [currentClasss,setCurrentClasss] = useState()
    const[classs,setClasss] = useState()
    const [name,setName] = useState()
    const [form,setForm] = useState(false)
    const [classDetails,setClassDetails] = useState()
    const navigate = useNavigate()



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
            
            console.log(response) 
            setForm(true)
            setName(response.data[0].name)
            setCurrentClasss(response.data[0].class_name)
        }
        catch{
            console.log("err")
        }
    
    }
    const handleUpdate =async()=>{
        try
        {
            const response = await axios({
                method:"put",
            baseURL:"http://localhost:8000/api/",
            url:`/users/updateClass/${regNum}/${classs}`,
            })
            setForm(true)
            console.log(response) 
           toast.success("Class Updated Successfully")
           setTimeout(() => {
            
            navigate(`/update-options`);
          }, 2000);
        }
        catch{
            console.log("err")
        }
    

    }

    return(
        <>
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
                
                <h4 style={{fontSize:"medium"}}>Name: {name}</h4>
                <h4 style={{fontSize:"medium"}}>Current Class: {currentClasss}</h4>
                <h4 style={{fontSize:"medium"}}>Modify Class Select: <select onChange={e=>setClasss(e.target.value)}>
                <option>--select class--</option>
           {
            classDetails?.map((m)=>
            <option value={m.class_id}>{m.class_name}</option>
            )
           } 
          
    
          </select></h4>
                <div className="--my">
            <button
            onClick={handleUpdate}
              type="submit"
              className="--btn --btn-success"
            >
              Update
            </button>
            </div>
                
            </>}
            </Card>
            </div>
        </>
    )
}

export default UpdateStudentClass;