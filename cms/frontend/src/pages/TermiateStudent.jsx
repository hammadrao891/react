import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Card from "../components/card/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const TerminateStudent = () =>{
    const [regNum,setRegNum] = useState()
    const [classs,setClasss] = useState()
    const [name,setName] = useState()
    const [form,setForm] = useState(false)
    const navigate = useNavigate()
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
            setName(response.data[0].name)
            setClasss(response.data[0].classs)
        }
        catch{
            console.log("err")
        }
    
    }
    const handleUpdate =async()=>{
        try
        {
            const response = await axios({
                method:"delete",
            baseURL:"http://localhost:8000/api/",
            url:`/users/terminateStudent/${regNum}`,
            })
            setForm(true)
            console.log(response) 
           toast.success("Student Terminated Successfully")
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
                <h4 style={{fontSize:"medium"}}>Current Class: {classs}</h4>
               
                <div className="--my">
            <button
            onClick={handleUpdate}
              type="submit"
              className="--btn --btn-success"
            >
              Terminate Student
            </button>
            </div>
                
            </>}
            </Card>
            </div>
        </>
    )
}

export default TerminateStudent;