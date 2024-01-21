import React, { useEffect, useMemo, useState } from 'react';
import './TimeTable.css'; // Import your CSS file
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";

const CreateTimeTable = () => {
  const[monday,setMonday]=useState([])
  const[tuesday,setTuesday]=useState([])
  const[wednesday,setWednesday]=useState([])
  const[thursday,setThursday]=useState([])
  const[friday,setFriday]=useState([])
  const [timetable, setTimetable] = useState([]);
  const [addedEvents, setAddedEvents] = useState([]);
  const[classes,setClasses]=useState()
  const [tableData, setTableData] = useState({});
  const[classs,setClasss]=useState()
  const[toggle,setToggle]=useState(false)
  const navigate=useNavigate()
    const [updatedClasses,setUpdatedClasses] = useState()
  // Function to handle click on th or td
  const handleClick = (key, value) => {
    setTableData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };



  const  handleChange = (e,index,day) =>{
    const {name,value,key} = e.target;
    
    const indexToUpdateExists =day?.some(subarray => subarray.class_id === index);

if (indexToUpdateExists) {
    // Update the existing subarray
   day.forEach(subarray => {
        if (subarray.class_id === index) {
            subarray.class_name = e.target.value;
        }
    });
} else {
    // Push a new subarray
   day.push({class_id:index , class_name:e.target.value});
}
console.log(day)


    // arr[index]=value
    // setUpdatedClasses(updatedClasses)
    // setClasses(updatedClasses);
    
    // console.log(name,value)
    // setStudentData({ ...studentData, [name]:value });
  
  }
  const handleSave = async(e)=>{
    // setMonday(monday.map(subarray => subarray.class_name))
    // tuesday.map(subarray => subarray.slice(1));
    // wednesday.map(subarray => subarray.slice(1));
    // thursday.map(subarray => subarray.slice(1));
    // friday.map(subarray => subarray.slice(1));
const data={
  Monday:monday.map(subarray => subarray.class_name)
}

    console.log(data)
       await axios(
        {
          method:"post",
          baseURL:'http://localhost:8000/api/',
          url:"/timeTable/insert-classes",
          data:{
            classs,
            Monday:monday.map(subarray => subarray.class_name),
            Tuesday:tuesday.map(subarray => subarray.class_name),
            Wednesday:wednesday.map(subarray => subarray.class_name),
            Thursday:thursday.map(subarray => subarray.class_name),
            Friday:friday.map(subarray => subarray.class_name)
          }
        }
      )
      // alert("Updated")
      toast.success("Timetable Created Successfully")
      setTimeout(() => {
        navigate(`/timetable`);
      }, 2000); 

    }
    const handleClass = async(e)=>{
      try
      {
        const response=await axios(
        {
          method:"get",
          baseURL:'http://localhost:8000/api/',
          url:`/timeTable/classes/${e.target.value}`,
        }
      )
    console.log(response.data)
    if(!response.data.classes.Monday)
    {
    setClasses(response.data.classes)
    setToggle(true)
      }else
    {
      setToggle(false)
      alert("Class Timetable Already Exists")
      
    }    
  }
  
      catch{}
    }
  return (
    <div className="timetable-container">
    <ToastContainer/>
    <div class="timetable-img text-center">
    <h2>Create TimeTable</h2>
      <label style={{color:"black",fontSize:"small"}}>Select Class:</label>
        <select onChange={e=>handleClass(e)} name="classs" >
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
        {/* {classes && <h4>{classes.monday[0]}</h4>} */}
       {
        toggle && 
 <div className="" style={{width:"100em"}} >
                <div class="timetable-img text-center">
                    <img src="img/content/timetable.png" alt=""/>
                </div>
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
                            {Array.from({ length: 7 }, (_, index) => (
                                  <>
                                  <td><input placeholder={''}  key={index} onChange={e=>handleChange(e,index,monday)}/></td>           
                          </>
                          ))}

                        </tr>
                        <tr>
                          <td className='align-middle text-primary'>Tuesday</td>
                          {Array.from({ length: 7 }, (_, index) => (
                            <>
                            <td><input placeholder={''}  key={index} onChange={e=>handleChange(e,index,tuesday)}/></td>           
                            </>
                          ))}
                                </tr>
                        <tr>
                          <td className='align-middle text-primary'>Wednesday</td>
                          {Array.from({ length: 7 }, (_, index) => (
                            <>
                            <td><input placeholder={''}  onChange={e=>handleChange(e,index,wednesday)} key={index}/></td>           
                          </>
                        ))}
                              </tr>
                        <tr>
                          <td className='align-middle text-primary'>Thursday</td>
                          {Array.from({ length: 7 }, (_, index) => (
                              <>
                              <td><input placeholder={''}  onChange={e=>handleChange(e,index,thursday)} key={index}/></td>           
                            </>
                          ))}
                              </tr>
                        <tr>
                          <td className='align-middle text-primary'>Friday</td>
                          {Array.from({ length: 7 }, (_, index) => (
                                    <>
                                    <td><input placeholder={''}  onChange={e=>handleChange(e,index,friday)}  key={index}/></td>           
                            </>
                          ))}
                        </tr>
 
                            
                        </tbody>
                    </table>
  
                    <button  className="--btn --btn-success" onClick={handleSave}>Create</button>              </div>
            </div>
}
 
    </div>
  );
};

export default CreateTimeTable;
