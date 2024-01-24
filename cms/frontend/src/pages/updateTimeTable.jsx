import React, { useEffect, useMemo, useState } from 'react';
import './TimeTable.css'; // Import your CSS file
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const UpdateTimeTable = () => {
  const [classes,setClasses] = useState()
  const [timetable, setTimetable] = useState([]);
  const [addedEvents, setAddedEvents] = useState([]);
  const [tableData, setTableData] = useState({});
  const[classs,setClasss] = useState()
  const[toggle,setToggle]=useState(false)
    const [updatedClasses,setUpdatedClasses] = useState()
    const navigate = useNavigate()
  // Function to handle click on th or td
  const handleClick = (key, value) => {
    setTableData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };



  let updatedClassess = useMemo(() => {
    // Initialize the array here
    return []
  }, []); 
  const checkClassConflict=async(class_name,classs,dayToCheck)=>{
    const response=await axios({
        method:"post",
        baseURL:"http://localhost:8000/api/",
        url:"timeTable/check-class-match",
        data:{
            classs,
            class_name,
            dayToCheck
        }
        
    })
    return response.data
  }
  const  handleChange = async(e,index,day) =>{
    const classMatch=await checkClassConflict(e.target.value,classs,day)
    if(classMatch.match)
    alert(classMatch.message)
    else{
    const {name,value,key} = e.target;
    
  
    const indexToUpdateExists =updatedClassess?.some(subarray => subarray.class_id === index);

if (indexToUpdateExists) {
    // Update the existing subarray
   updatedClassess.forEach(subarray => {
        if (subarray.class_id === index) {
            subarray.class_name = e.target.value;
        }
    });
} else {
    // Push a new subarray
   updatedClassess.push({class_id:index , class_name:e.target.value});
}
console.log(updatedClassess)
    }

  }
  const handleUpdate = async(e)=>{
    console.log(updatedClasses)
       await axios(
        {
          method:"put",
          baseURL:'http://localhost:8000/api/',
          url:"timeTable/classes/monday",
          data:updatedClassess
        }
      )
      
      toast.success("Timetable Updated Successfully")
      setTimeout(() => {
        navigate(`/timetable`);
      }, 2000); 

      // alert("Updated")
    //   navigate(`/update-options`);

    }
    const getClasses = async(e) =>{
      setClasss(e.target.value)
      const response = await axios(
        {
          method:"get",
          baseURL:'http://localhost:8000/api/',
          url:`timeTable/classes/${e.target.value}`
        }
      )
      if(response.data.classes.Monday)
      {
        setClasses(response.data.classes)
        console.log(response.data)
        setToggle(true)
      }
      else
      {
        alert("Class Timetable Not Found!")
        setToggle(false)
      }
      
    }

  return (
    <div className="timetable-container">
     <ToastContainer/>
     
 <div className="" style={{width:"100em"}} >
                <div class="timetable-img text-center">
                <h2>Update TimeTable</h2>               
  <label style={{color:"black",fontSize:"large"}}>Select Class:</label>
        <select style={{fontSize:"small"}} onChange={e=>getClasses(e)} name="classs" >
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
 
                </div>
  {toggle && <>
                <div class="table-responsive">
                    <table class="tableL table-bordered text-center w-100" style={{width:"20%"}}>
                        <thead>
                            <tr class="bg-light-gray">
                                <th class="text-uppercase text-primary ">Time
                                </th>
                                <th class="text-uppercase text-primary">7:00</th>
                                <th class="text-uppercase text-primary">7:40</th>
                                <th class="text-uppercase text-primary">8:20</th>
                                <th class="text-uppercase text-primary">9:00</th>
                                <th class="text-uppercase text-primary">10:40</th>
                                <th class="text-uppercase text-primary">11:20</th>
                                <th class="text-uppercase text-primary">12:00</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <td className='align-middle text-primary'>Monday</td>
                          {classes && classes.Monday.map((m,index)=>
        <td>
        <select onChange={e=>handleChange(e,m.class_id,"Monday")} key={index}>
        <option>--select teacher--</option>
        <option value="Sir Aleem">Sir Aleem</option>
        <option value="Mam Rafia">Mam Rafia</option>
        <option value="Sir Adeel">Sir Adeel</option>
        <option value="Mam Joddat">Mam Joddat</option>
        </select>
        {/* <input placeholder={m.class_name} onChange={e=>handleChange(e,m.class_id)} key={index}/> */}
        </td>
        )}

                        </tr>
                        <tr>
                          <td className='align-middle text-primary'>Tuesday</td>
                        {classes && classes.Tuesday.map((m,index)=>
                         <td>
                         <select onChange={e=>handleChange(e,m.class_id,"Monday")} key={index}>
                        <option>--select teacher--</option>
                        <option value="Sir Aleem">Sir Aleem</option>
                        <option value="Mam Rafia">Mam Rafia</option>
                        <option value="Sir Adeel">Sir Adeel</option>
                        <option value="Mam Joddat">Mam Joddat</option>
                        </select>
                         {/* <input placeholder={m.class_name} onChange={e=>handleChange(e,m.class_id)} key={index}/> */}
                         </td>
                          )}

                        </tr>
                        <tr>
                          <td className='align-middle text-primary'>Wednesday</td>
                        {classes && classes.Wednesday.map((m,index)=>
                         <td>
                         <select onChange={e=>handleChange(e,m.class_id,"Monday")} key={index}>
        <option>--select teacher--</option>
        <option value="Sir Aleem">Sir Aleem</option>
        <option value="Mam Rafia">Mam Rafia</option>
        <option value="Sir Adeel">Sir Adeel</option>
        <option value="Mam Joddat">Mam Joddat</option>
        </select>
                         {/* <input placeholder={m.class_name} onChange={e=>handleChange(e,m.class_id)} key={index}/> */}
                         </td>
                          )}

                        </tr>
                        <tr>
                          <td className='align-middle text-primary'>Thursday</td>
                        {classes && classes.Thursday.map((m,index)=>
                         <td>
                         <select onChange={e=>handleChange(e,m.class_id,"Monday")} key={index}>
        <option>--select teacher--</option>
        <option value="Sir Aleem">Sir Aleem</option>
        <option value="Mam Rafia">Mam Rafia</option>
        <option value="Sir Adeel">Sir Adeel</option>
        <option value="Mam Joddat">Mam Joddat</option>
        </select>
                         {/* <input placeholder={m.class_name} onChange={e=>handleChange(e,m.class_id)} key={index}/> */}
                         </td>
                          )}

                        </tr>
                        <tr>
                          <td className='align-middle text-primary'>Friday</td>
                        {classes && classes.Friday.map((m,index)=>
                         <td><select onChange={e=>handleChange(e,m.class_id,"Monday")} key={index}>
        <option>--select teacher--</option>
        <option value="Sir Aleem">Sir Aleem</option>
        <option value="Mam Rafia">Mam Rafia</option>
        <option value="Sir Adeel">Sir Adeel</option>
        <option value="Mam Joddat">Mam Joddat</option>
        </select>
                         {/* <input placeholder={m.class_name} onChange={e=>handleChange(e,m.class_id)} key={index}/> */}
                         </td>
                          )}

                        </tr>
 
                          </tbody>
                    </table>
                </div>
                <button  className="--btn --btn-success" onClick={handleUpdate}>Update</button>
                </>}
            </div>
            

 
    </div>
  );
};

export default UpdateTimeTable;
