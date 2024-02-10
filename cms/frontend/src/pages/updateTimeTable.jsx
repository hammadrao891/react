import React, { useEffect, useMemo, useState } from 'react';
import './TimeTable.css'; // Import your CSS file
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const UpdateTimeTable = () => {
  const[teachers,setTeachers]=useState()
  const [classes,setClasses] = useState()
  const [timetable, setTimetable] = useState([]);
  const [addedEvents, setAddedEvents] = useState([]);
  const [tableData, setTableData] = useState({});
  const[classs,setClasss] = useState()
  const[toggle,setToggle]=useState(false)
    const [updatedClasses,setUpdatedClasses] = useState()
    const [ classTeacher,setClassTeacher] = useState()
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
    const handleClassTeacher=async(e)=>{
      const response=await axios({
        method:"get",
        baseURL:"http://localhost:8000/api/",
        url:`timeTable/checkClassTeacherForUpdation/${e.target.value}/${classs}`,
        
      })
      if(response.data.exists)
      {
        alert(`${e.target.value} is a class teacher for ${response.data.classs}`)
      }
      else
      setClassTeacher(e.target.value)
    
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
           {
            classDetails?.map((m)=>
            <option value={m.class_id}>{m.class_name}</option>
            )
           }      
        </select>
 
                </div>
  {toggle && <>
                <div class="table-responsive">
                <div style={{display:"flex"}}>
                <h4>Class Teacher:</h4>
                <select onChange={e=>handleClassTeacher(e)}>
        <option>--select teacher--</option>
        {teachers && teachers?.map((teacher)=>
        <option value={teacher.teacher_name}>{teacher.teacher_name}</option>
        )}
        </select>
        </div>
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
                          {classes && classes.Monday?.map((m,index)=>
        <td>
        <select onChange={e=>handleChange(e,m.class_id,"Monday")} key={index}>
        <option>--select teacher--</option>
        {teachers && teachers?.map((teacher)=>
        <option value={teacher.teacher_name}>{teacher.teacher_name}</option>
        )}
        </select>
        {/* <input placeholder={m.class_name} onChange={e=>handleChange(e,m.class_id)} key={index}/> */}
        </td>
        )}

                        </tr>
                        <tr>
                          <td className='align-middle text-primary'>Tuesday</td>
                        {classes && classes.Tuesday?.map((m,index)=>
                         <td>
                         <select onChange={e=>handleChange(e,m.class_id,"Monday")} key={index}>
                        <option>--select teacher--</option>
                        {teachers && teachers?.map((teacher)=>
        <option value={teacher.teacher_name}>{teacher.teacher_name}</option>
        )}</select>
                         {/* <input placeholder={m.class_name} onChange={e=>handleChange(e,m.class_id)} key={index}/> */}
                         </td>
                          )}

                        </tr>
                        <tr>
                          <td className='align-middle text-primary'>Wednesday</td>
                        {classes && classes.Wednesday?.map((m,index)=>
                         <td>
                         <select onChange={e=>handleChange(e,m.class_id,"Monday")} key={index}>
        <option>--select teacher--</option>
        {teachers && teachers?.map((teacher)=>
        <option value={teacher.teacher_name}>{teacher.teacher_name}</option>
        )} </select>
                         {/* <input placeholder={m.class_name} onChange={e=>handleChange(e,m.class_id)} key={index}/> */}
                         </td>
                          )}

                        </tr>
                        <tr>
                          <td className='align-middle text-primary'>Thursday</td>
                        {classes && classes.Thursday?.map((m,index)=>
                         <td>
                         <select onChange={e=>handleChange(e,m.class_id,"Monday")} key={index}>
        <option>--select teacher--</option>
        {teachers && teachers?.map((teacher)=>
        <option value={teacher.teacher_name}>{teacher.teacher_name}</option>
        )}</select>
                         {/* <input placeholder={m.class_name} onChange={e=>handleChange(e,m.class_id)} key={index}/> */}
                         </td>
                          )}

                        </tr>
                        <tr>
                          <td className='align-middle text-primary'>Friday</td>
                        {classes && classes.Friday?.map((m,index)=>
                         <td><select onChange={e=>handleChange(e,m.class_id,"Monday")} key={index}>
        <option>--select teacher--</option>
        {teachers && teachers?.map((teacher)=>
        <option value={teacher.teacher_name}>{teacher.teacher_name}</option>
        )} </select>
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
