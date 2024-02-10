import React, { useEffect, useMemo, useState } from 'react';
import './TimeTable.css'; // Import your CSS file
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";

const CreateTimeTable = () => {
  const [teachers,setTeachers]=useState()
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
  const[classTeacher,setClassTeacher]=useState()
  const [classDetails,setClassDetails] = useState()
  const navigate=useNavigate()

    const [updatedClasses,setUpdatedClasses] = useState()
  // Function to handle click on th or td
  const timeArr = ['7:00','7:40','8:20','9:00','9:40','10:40','11:20']
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


  useEffect(()=>{
    const getTeachers=async()=>{
      try{
        const response =await axios({
          method:"get",
          baseURL:"http://localhost:8000/api/",
          url:`timeTable/getTeachers`
        })
        setTeachers(response.data)
      }
      catch{}
    }
    getTeachers()
  },[])
  const handleClick = (key, value) => {
    setTableData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };
const handleClassTeacher=async(e)=>{
  const response=await axios({
    method:"get",
    baseURL:"http://localhost:8000/api/",
    url:`timeTable/checkClassTeacher/${e.target.value}`,
    
  })
  if(response.data.exists)
  {
    alert(`${e.target.value} is a class teacher for ${response.data.classs}`)
  }
  else
  setClassTeacher(e.target.value)

}

  const checkClassConflict=async(class_name,classs,dayToCheck,time_slot)=>{
    const response=await axios({
        method:"post",
        baseURL:"http://localhost:8000/api/",
        url:"timeTable/check-class-match",
        data:{
            classs,
            class_name,
            dayToCheck,
            time_slot
        }
        
    })
    return response.data
  }
  const  handleChange = async(e,index,day,timeSlot,dayToCheck) =>{
    const classMatch=await checkClassConflict(e.target.value,classs,dayToCheck,timeSlot)
    if(classMatch.match)
    alert(classMatch.message)
    else{
    console.log(timeSlot)
    const {name,value,key} = e.target;
    
    const indexToUpdateExists =day?.some(subarray => subarray.class_id === index);

if (indexToUpdateExists) {
    // Update the existing subarray
   day.forEach(subarray => {
        if (subarray.class_id === index) {
            subarray.class_name = e.target.value;
            subarray.time_slot = timeSlot
        }
    });
} else {
    // Push a new subarray
   day.push({class_id:index , class_name:e.target.value,time_slot:timeSlot});
}
console.log(day)
    

    // arr[index]=value
    // setUpdatedClasses(updatedClasses)
    // setClasses(updatedClasses);
    
    // console.log(name,value)
    // setStudentData({ ...studentData, [name]:value });
}
  }
  
  const handleSave = async(e)=>{
    // setMonday(monday.map(subarray => subarray.class_name))
    // tuesday.map(subarray => subarray.slice(1));
    // wednesday.map(subarray => subarray.slice(1));
    // thursday.map(subarray => subarray.slice(1));
    // friday.map(subarray => subarray.slice(1));


    // console.log(data)
       await axios(
        {
          method:"post",
          baseURL:'http://localhost:8000/api/',
          url:"/timeTable/insert-classes",
          data:{
            classs,classTeacher,
            Monday:monday.map(subarray => [subarray.class_name,subarray.time_slot]),
            Tuesday:tuesday.map(subarray => [subarray.class_name,subarray.time_slot]),
            Wednesday:wednesday.map(subarray => [subarray.class_name,subarray.time_slot]),
            Thursday:thursday.map(subarray => [subarray.class_name,subarray.time_slot]),
            Friday:friday.map(subarray => [subarray.class_name,subarray.time_slot])
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
    setClasss(e.target.value)
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
        <select className='form-control form-control-lg' onChange={e=>handleClass(e)} name="classs" >
        <option>--select class--</option>
           {
            classDetails?.map((m)=>
            <option value={m.class_id}>{m.class_name}</option>
            )
           }      
        
        </select>
        
        
        </div>
        
        {/* {classes && <h4>{classes.monday[0]}</h4>} */}
       {
        toggle &&
         
 <div  >
        <label style={{color:"black",fontSize:"small",paddingLeft:"5px"}} >Class Teacher:</label>
        <select className='form-control form-control-lg' onChange={e=>handleClassTeacher(e)}>
        <option>--select teacher--</option>
        {teachers && teachers?.map((teacher)=>
        <option value={teacher.teacher_name}>{teacher.teacher_name}</option>
        )}
        </select>
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
                                <th class="text-uppercase text-primary">9:40</th>
                                <th class="text-uppercase text-primary">10:40</th>
                                <th class="text-uppercase text-primary">11:20</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <td className='align-middle text-primary'>Monday</td>
                            {Array.from({ length: 7 }, (_, index) => (
                                  <>
                                  <td>
                                  <select className='form-control form-control-lg' onChange={e=>handleChange(e,index,monday,timeArr[index],"Monday")} key={index}>
        <option>--select teacher--</option>
        {teachers && teachers?.map((teacher)=>
        <option value={teacher.teacher_name}>{teacher.teacher_name}</option>
        )}
        </select>
                                  {/* <input placeholder={''}  key={index} onChange={e=>handleChange(e,index,monday,timeArr[index])}/> */}
                                  </td>           
                          </>
                          ))}

                        </tr>
                        <tr>
                          <td className='align-middle text-primary'>Tuesday</td>
                          {Array.from({ length: 7 }, (_, index) => (
                            <>
                            <td> <select className='form-control form-control-lg' onChange={e=>handleChange(e,index,tuesday,timeArr[index],"Tuesday")} key={index}>
        <option>--select teacher--</option>
        {teachers && teachers?.map((teacher)=>
        <option value={teacher.teacher_name}>{teacher.teacher_name}</option>
        )}
        </select>
                            {/* <input placeholder={''}  key={index} onChange={e=>handleChange(e,index,tuesday,timeArr[index])}/> */}
                            </td>           
                            </>
                          ))}
                                </tr>
                        <tr>
                          <td className='align-middle text-primary'>Wednesday</td>
                          {Array.from({ length: 7 }, (_, index) => (
                            <>
                            <td>
                            <select className='form-control form-control-lg' onChange={e=>handleChange(e,index,wednesday,timeArr[index],"Wednesday")} key={index}>
        <option>--select teacher--</option>
        {teachers && teachers?.map((teacher)=>
        <option value={teacher.teacher_name}>{teacher.teacher_name}</option>
        )}
        </select>
                            {/* <input placeholder={''}  onChange={e=>handleChange(e,index,wednesday,timeArr[index])} key={index}/> */}
                            </td>           
                          </>
                        ))}
                              </tr>
                        <tr>
                          <td className='align-middle text-primary'>Thursday</td>
                          {Array.from({ length: 7 }, (_, index) => (
                              <>
                              <td>
                              <select className='form-control form-control-lg' onChange={e=>handleChange(e,index,thursday,timeArr[index],"Thursday")} key={index}>
        <option>--select teacher--</option>
        {teachers && teachers?.map((teacher)=>
        <option value={teacher.teacher_name}>{teacher.teacher_name}</option>
        )}
        </select>
                              {/* <input placeholder={''}  onChange={e=>handleChange(e,index,thursday,timeArr[index])} key={index}/> */}
                              </td>           
                            </>
                          ))}
                              </tr>
                        <tr>
                          <td className='align-middle text-primary'>Friday</td>
                          {Array.from({ length: 7 }, (_, index) => (
                                    <>
                                    <td>
                                    <select className='form-control form-control-lg' onChange={e=>handleChange(e,index,friday,timeArr[index],"Friday")} key={index}>
        <option>--select teacher--</option>
        {teachers && teachers?.map((teacher)=>
        <option value={teacher.teacher_name}>{teacher.teacher_name}</option>
        )}
        </select>
                                    {/* <input placeholder={''}  onChange={e=>handleChange(e,index,friday,timeArr[index])}  key={index}/> */}
                                    </td>           
                            </>
                          ))}
                        </tr>
 
                            
                        </tbody>
                    </table>
                    <div style={{display:"flex",justifyContent:"center",paddingTop:"3em"}}>
                    <button  className="--btn --btn-success" onClick={handleSave}>Create</button>   
                         </div>
                    </div>
            </div>
}
 
    </div>
  );
};

export default CreateTimeTable;
