import React, { useEffect, useState } from 'react';
import './TimeTable.css'; // Import your CSS file
import axios from 'axios'

const TimeTable = () => {
  const [classes,setClasses] = useState()
  const [timetable, setTimetable] = useState([]);
  const [addedEvents, setAddedEvents] = useState([]);
  const [tableData, setTableData] = useState({});

  // Function to handle click on th or td
  const handleClick = (key, value) => {
    setTableData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };


  useEffect(()=>{
    const getClasses = async() =>{
      const response = await axios(
        {
          method:"get",
          baseURL:'http://localhost:8000/api/',
          url:"timeTable/classes/monday"
        }
      )
      setClasses(response.data.classes)
      console.log(response.data.classes)
    }
    getClasses()
  },[])
  return (
    <div className="timetable-container">
      <table className="table">
      <thead>
      <th></th>
            <th onClick={() => handleClick('header1', '8:00')} name="ss">8:00</th>
            <th onClick={() => handleClick('header2', '8:40')}>8:40</th>
            <th onClick={() => handleClick('header3', '9:20')}>9:20</th>
            <th onClick={() => handleClick('header4', '10:00')}>10:00</th>
            <th onClick={() => handleClick('header5', '10:40')}>10:40</th>
            <th onClick={() => handleClick('header6', '11:20')}>11:20</th>
            <th onClick={() => handleClick('header7', '12:00')}>12:00</th>
      </thead>
      <tbody>
     
      <tr>
        <td><span style={{fontWeight:900}}>Monday</span></td>
       {classes && classes.map((m)=>
        <td>{m.class_name}</td>
        )}

      </tr>
 
      <tr>
        <td><span style={{fontWeight:900}}>Tuesday</span></td>
        <td>Physics</td>
        <td>Physics</td>
        <td>Physics</td>
        <td>Physics</td>
        <td>Physics</td>
        <td>Physics</td>
        <td>Physics</td>

      </tr>
 
      <tr>
        <td><span style={{fontWeight:900}}>Wednesday</span></td>
        <td>Physics</td>
        <td>Physics</td>
        <td>Physics</td>
        <td>Physics</td>
        <td>Physics</td>
        <td>Physics</td>
        <td>Physics</td>

      </tr>
 
      <tr>
        <td><span style={{fontWeight:900}}>Thursday</span></td>
        <td>Physics</td>
        <td>Physics</td>
        <td>Physics</td>
        <td>Physics</td><td>Physics</td>
        <td>Physics</td>
        <td>Physics</td>

      </tr>
      </tbody>
      <tr>
        <td><span style={{fontWeight:900}}>Friday</span></td>
        <td>Physics</td>
        <td>Physics</td>
        <td>Physics</td>
        <td>Physics</td>

        <td>Physics</td>
        <td>Physics</td>
        <td>Physics</td>
      </tr>
 </table>
    </div>
  );
};

export default TimeTable;
