import React, { useEffect, useState } from 'react';
import './TimeTable.css'; // Import your CSS file
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const TimeTable = () => {
  const [classes,setClasses] = useState()
  const [tableData, setTableData] = useState({});
  const[classs,setClasss] = useState()
  const [toggle,setToggle] = useState(false);
  const [classDetails,setClassDetails] = useState()
  const navigate = useNavigate();

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

const fetchTimetable=async(e)=>{
  setClasses(e)
  try
  {
    const response=await axios(
    {
      method:"get",
      baseURL:'http://localhost:8000/api/',
      url:`/timeTable/classes/${e}`,
    }
  )
  if (response.data.classes.Monday) {
    setClasses(response.data.classes)
    console.log(response.data)
    setToggle(true)
  }
  else {
    alert("Class Timetable Not Found!")
    setToggle(false)
  }
} catch{}
}
const times = ['7:00','7:40','8:20','9:00','10:00','10:40','11:20']
  return (
    <div className="" >
      <div style={{display:"flex",justifyContent:"flex-end"}}>
      <button   onClick={ ()=>navigate("/update-timetable")} className="--btn --btn-success">Update TimeTable</button>
      <button   onClick={ ()=>navigate("/create-timetable")} className="--btn --btn-success">Create TimeTable</button>
      <button  onClick={ ()=>navigate("/add-teacher")} className="--btn --btn-success">Add Teacher</button>
      </div>
 <div className="timetable-container">
        <div class="timetable-img text-center">
          <h2>Class TimeTable</h2>
          <label style={{ color: "black", fontSize: "small" }}>Select Class:</label>
          <select className='form-control form-control-lg'  style={{marginBottom:"1%"}} onChange={e=>fetchTimetable(e.target.value)} name="classs" >
            <option>--select class--</option>
            {
              classDetails?.map((m) =>
                <option value={m.class_id}>{m.class_name}</option>
              )
            }

          </select>
        {/* <button className='--btn --btn-small' onClick={fetchTimetable}>Get TimeTable</button>  */}

        </div>    
           {
            toggle && <>
          <div class="table-responsive" style={{display:"flex",justifyContent:"center"}}>
                    <table class="tableL table-bordered text-center" style={{width:"50%",height:"50%",fontSize:"15px"}} >
                        <thead>
                            <tr class="bg-light-gray">
                                <th class="text-uppercase text-primary ">Time
                                </th>
                                {times.map(m=>
                                  <th class="text-uppercase text-primary">{m}</th>
                                )}
                                
                               
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <td className='align-middle text-primary'>Monday</td>
                          {times.map((time, index) => (
                      <td key={index}>
                      <span class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">
                        {classes && classes?.Monday?.find(item => item.time_slot === time) ? 
                          classes.Monday.find(item => item.time_slot === time).class_name : '-'}
                          </span>
                      </td>
                    ))}

                        {/* {classes && classes.Monday?.map((m)=>
                           <td><span class="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">{m.class_name}</span></td>
                          )} */}

                        </tr>
                        <tr>
                          <td className='align-middle text-primary'>Tuesday</td>
                      {times.map((time, index) => (
                      <td key={index}>
                      <span class="bg-yellow padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">
                        {classes && classes?.Tuesday?.find(item => item.time_slot === time) ? 
                          classes.Tuesday.find(item => item.time_slot === time).class_name : '-'}
                          </span>
                      </td>
                    ))}

      
                        </tr>
                        <tr>
                        <td className='align-middle text-primary'>Wednesday</td>
                        {times.map((time, index) => (
                      <td key={index}>
                      <span class="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">
                        {classes && classes?.Wednesday?.find(item => item.time_slot === time) ? 
                          classes.Wednesday.find(item => item.time_slot === time).class_name : '-'}
                          </span>
                      </td>
                    ))}

      
                        </tr>
                        <tr>
                          <td className='align-middle text-primary'>Thursday</td>
                          {times.map((time, index) => (
                      <td key={index}>
                      <span class="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">
                        {classes && classes?.Thursday?.find(item => item.time_slot === time) ? 
                          classes.Thursday.find(item => item.time_slot === time).class_name : '-'}
                          </span>
                      </td>
                    ))}

                        </tr>
                        <tr>
                        <td className='align-middle text-primary'>Friday</td>
                        {times.map((time, index) => (
                      <td key={index}>
                      <span class="bg-purple padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">
                        {classes && classes?.Friday?.find(item => item.time_slot === time) ? 
                          classes.Friday.find(item => item.time_slot === time).class_name : '-'}
                          </span>
                      </td>
                    ))}


                        </tr>
 
                            {/* <tr>
                            
                                <td class="align-middle text-primary">09:00am</td>
                                <td>
                                    <span class="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">Dance</span>
                                    <div class="margin-10px-top font-size14 text-primary">9:00-10:00</div>
                                    <div class="font-size13 text-light-gray">Ivana Wong</div>
                                </td>
                                <td>
                                    <span class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">Yoga</span>
                                    <div class="margin-10px-top font-size14 text-primary">9:00-10:00</div>
                                    <div class="font-size13 text-light-gray">Marta Healy</div>
                                </td>

                                <td>
                                    <span class="bg-yellow padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">Music</span>
                                    <div class="margin-10px-top font-size14 text-primary">9:00-10:00</div>
                                    <div class="font-size13 text-light-gray">Ivana Wong</div>
                                </td>
                                <td>
                                    <span class="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">Dance</span>
                                    <div class="margin-10px-top font-size14 text-primary">9:00-10:00</div>
                                    <div class="font-size13 text-light-gray">Ivana Wong</div>
                                </td>
                                <td>
                                    <span class="bg-purple padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">Art</span>
                                    <div class="margin-10px-top font-size14 text-primary">9:00-10:00</div>
                                    <div class="font-size13 text-light-gray">Kate Alley</div>
                                </td>
                                <td>
                                    <span class="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">English</span>
                                    <div class="margin-10px-top font-size14 text-primary">9:00-10:00</div>
                                    <div class="font-size13 text-light-gray">James Smith</div>
                                </td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
           </>
           }
            </div>

    </div>
  );
};

export default TimeTable;
