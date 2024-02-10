import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Card from "../components/card/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const UpdateDOB = () =>{
    const [regNum,setRegNum] = useState()
    const [dob,setDob] = useState()
    const [newDob,setNewDob] = useState()
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
            setDob(response.data[0].dob)
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
            url:`/users/updateDob/${regNum}`,
            data:{dob:newDob}
            })
            setForm(true)
            console.log(response) 
           toast.success("Date of Birth Updated Successfully")
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
     <table>
                    <tbody>
                        <tr>
                            <td> <h4 style={{fontSize:"medium"}}>Current Date of Birth: </h4></td>
                            <td><h4>{dob}</h4></td>
                        </tr>
                        <tr>
                            <td> <h4 style={{fontSize:"medium"}}>Select New Date of Birth: </h4></td>
                            <td><input type="date" onChange={e=>setNewDob(e.target.value)}/></td>
                        </tr>
                    </tbody>
                </table>
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

export default UpdateDOB;