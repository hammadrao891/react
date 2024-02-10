import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Card from "../components/card/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const TransferWholeClass = () =>{
    const [newClasss,setNewClasss] = useState()
    const [classs,setClasss] = useState()
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

    const handleUpdate =async()=>{
        try
        {
            const response = await axios({
                method:"put",
            baseURL:"http://localhost:8000/api/",
            url:`/users/update-class/${classs}`,
            data:{newClasss}
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
                <table>
                    <tbody>
                        <tr>
                            <td> <h4 style={{fontSize:"medium"}}>Current Class: </h4></td>
                            <td><h4><select onChange={e=>setClasss(e.target.value)}>
                            <option>--select class--</option>
           {
            classDetails?.map((m)=>
            <option value={m.class_id}>{m.class_name}</option>
            )
           }   </select></h4></td>
                        </tr>
                        <tr>
                            <td> <h4 style={{fontSize:"medium"}}>Modify Class Select: </h4></td>
                            <td><h4><select onChange={e=>setNewClasss(e.target.value)}>
                            <option>--select class--</option>
           {
            classDetails?.map((m)=>
            <option value={m.class_id}>{m.class_name}</option>
            )
           }  </select></h4></td>
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
                
            </Card>
            </div>
        </>
    )
}

export default TransferWholeClass;