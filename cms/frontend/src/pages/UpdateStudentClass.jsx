import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Card from "../components/card/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const UpdateStudentClass = () =>{
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
                <h4 style={{fontSize:"medium"}}>Current Class: {classs}</h4>
                <h4 style={{fontSize:"medium"}}>Modify Class Select: <select onChange={e=>setClasss(e.target.value)}>
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