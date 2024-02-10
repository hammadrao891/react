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

const fetchTimetable=async()=>{
  try
  {
    const response=await axios(
    {
      method:"get",
      baseURL:'http://localhost:8000/api/',
      url:`/timeTable/classes/${classs}`,
    }
  )
setClasses(response.data.classes)
setToggle(true)
} catch{}
}
  return (
    <div className="">
      <div style={{display:"flex",justifyContent:"space-between"}}><h1 className='text-center'>Timetables</h1>
      <div style={{display:"flex",justifyContent:"space-between"}}>
      <button   onClick={ ()=>navigate("/update-timetable")} className="--btn --btn-success">Update TimeTable</button>
      <button   onClick={ ()=>navigate("/create-timetable")} className="--btn --btn-success">Create TimeTable</button>
      <button  onClick={ ()=>navigate("/add-teacher")} className="--btn --btn-success">Add Teacher</button>
      </div>
      </div>
 <div class="" style={{width:"100em"}}  >
    <h3>Class Teacher: {}</h3>
  <label style={{color:"black",fontSize:"large"}}>Select Class:</label>
        <select style={{fontSize:"small"}} onChange={e=>setClasss(e.target.value)} name="classs" >
        <option>--select class--</option>
           {
            classDetails?.map((m)=>
            <option value={m.class_id}>{m.class_name}</option>
            )
           } 
        </select>
        <button className='--btn --btn-small' onClick={fetchTimetable}>Get TimeTable</button>
     
           {
            toggle && <>
          <div class="table-responsive" style={{width:"100%"}}>
                    <table class="tableL table-bordered text-center" >
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
                        {classes && classes.Monday?.map((m)=>
                           <td><span class="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">{m.class_name}</span></td>
                          )}

                        </tr>
                        <tr>
                          <td className='align-middle text-primary'>Tuesday</td>
                        {classes && classes.Tuesday?.map((m)=>
                          <td><span class="bg-yellow padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">{m.class_name}</span></td>
                          )}

                        </tr>
                        <tr>
                          <td className='align-middle text-primary'>Wednesday</td>
                        {classes && classes.Wednesday?.map((m)=>
                          <td><span class="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">{m.class_name}</span></td>
                          )}

                        </tr>
                        <tr>
                          <td className='align-middle text-primary'>Thursday</td>
                        {classes && classes.Thursday?.map((m)=>
                          <td><span class="bg-purple padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">{m.class_name}</span></td>
                          )}

                        </tr>
                        <tr>
                          <td className='align-middle text-primary'>Friday</td>
                        {classes && classes.Friday?.map((m)=>
                          <td><span class="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">{m.class_name}</span></td>
                          )}

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
