import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Card from "../components/card/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const TransferWholeClass = () =>{
    const [newClasss,setNewClasss] = useState()
    const [classs,setClasss] = useState()
    const [name,setName] = useState()
    const [form,setForm] = useState(false)
    const navigate = useNavigate()
    
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
                </select></h4></td>
                        </tr>
                        <tr>
                            <td> <h4 style={{fontSize:"medium"}}>Modify Class Select: </h4></td>
                            <td><h4><select onChange={e=>setNewClasss(e.target.value)}>
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
                </select></h4></td>
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