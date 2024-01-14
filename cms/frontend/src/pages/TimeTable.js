// src/components/Timetable.js
import React, { useState, useEffect } from 'react';

// Move teachers array outside the component
const teachers = ['Teacher A', 'Teacher B', 'Teacher C', 'Teacher D'];

const Timetable = () => {
  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    const generatedTimetable = generateTimetable();
    setTimetable(generatedTimetable);
  }, []);

  const generateTimetable = () => {
    const classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];
    const subjects = ['Subject 1', 'Subject 2', 'Subject 3', 'Subject 4'];

    const timetableData = [];
    const startTime = 8 * 60; // 8 am in minutes
    const endTime = 14 * 60; // 2 pm in minutes
    const classDuration = 40;
    const breakDuration = 20;

    for (let time = startTime; time < endTime; time += classDuration + breakDuration) {
      const row = { time: formatTime(time) };
      teachers.forEach((teacher) => {
        row[teacher] = subjects[Math.floor(Math.random() * subjects.length)];
      });
      timetableData.push(row);
    }

    return timetableData;
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
  };

  return (
    <div>
      <h2>Timetable</h2>
      <table className='table' style={{width:"40em"}}>
        <thead>
          <tr>
            <th>Time</th>
            {teachers.map((teacher) => (
              <th key={teacher}>{teacher}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timetable.map((row) => (
            <tr key={row.time}>
              <td>{row.time}</td>
              {teachers.map((teacher) => (
                <td key={`${row.time}-${teacher}`}>{row[teacher]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Timetable;
