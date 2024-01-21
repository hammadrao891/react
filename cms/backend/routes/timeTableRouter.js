const express = require("express");
const router = express.Router();
const db = require("../db");


router.get('/classes/monday', (req, res) => {
    const query = 'SELECT class_id, class_name FROM classes WHERE day = ?';
    const day = 'Monday';
  
    db.query(query, [day], (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        const classes = results.map((result) => ({
          class_id: result.class_id,
          class_name: result.class_name,
        }));
        res.json({ classes });
      }
    });
  });
router.put('/classes/monday',(req,res)=>{
    const classesToUpdate = req.body;
    console.log(classesToUpdate)

    
    // Function to update class_name for a given class_id
    
    const updateClassName = (classId, newClassName) => {
      const updateQuery = 'UPDATE classes SET class_name = ? WHERE class_id = ?';
  
      // Update the class_name in the database
      db.query(updateQuery, [newClassName, classId], (updateErr, updateResults) => {
        if (updateErr) {
          console.error('Error executing MySQL query:', updateErr);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      });
    };
  
    for (var i = 0 ;i < classesToUpdate.length;i++)
    {
        console.log(i.class_name)
        updateClassName(classesToUpdate[i].class_id,classesToUpdate[i].class_name)
    }

      res.json({ message: 'Classes updated successfully' });
    
  
    // Start updating classes
  });
  

  router.get('/classes/week', (req, res) => {
    const query = 'SELECT class_id, class_name, day FROM classes WHERE day IN (?, ?, ?, ?, ?)';
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
    db.query(query, daysOfWeek, (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        const classesByDay = {};
  
        // Organize classes by day
        results.forEach((result) => {
          const { class_id, class_name, day } = result;
          if (!classesByDay[day]) {
            classesByDay[day] = [];
          }
          classesByDay[day].push({ class_id, class_name });
        });
  
        res.json({ classesByDay });
      }
    });
  });
  
  router.get('/classes/:classs', (req, res) => {
    // const classs = req.params.classs;
  
    // const query = 'SELECT class_name, day FROM classes WHERE classs = ?';
    // db.query(query, [classs], (err, results) => {
    //   if (err) {
    //     console.error('Error executing MySQL query:', err);
    //     res.status(500).json({ error: 'Internal Server Error' });
    //   } else {
    //     const organizedClasses = {};
  
    //     results.forEach((result) => {
    //       const { class_name, day } = result;
  
    //       // Create an array for the day if it doesn't exist
    //       if (!organizedClasses[day]) {
    //         organizedClasses[day] = [];
    //       }
  
    //       organizedClasses[day].push(class_name);
    //     });
  
    //     res.json({ classes: organizedClasses });
    //   }
    // });
    const classs = req.params.classs;

    const query = 'SELECT class_id, class_name, day FROM classes WHERE classs = ?';
    db.query(query, [classs], (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        const organizedClasses = {};
  
        results.forEach((result) => {
          const { class_id, class_name, day } = result;
  
          // Create an array for the day if it doesn't exist
          if (!organizedClasses[day]) {
            organizedClasses[day] = [];
          }
  
          organizedClasses[day].push({ class_id, class_name });
        });
  
        res.json({ classes: organizedClasses });
      }
    });
  });

  router.post('/insert-classes', (req, res) => {
    const { classs, ...classData } = req.body;
  console.log(req.body)
    // Extract day, class_name, and classs from the req.body and insert into classes table
    for (const day of Object.keys(classData)) {
      const classesArray = (classData[day]);
      for (const className of classesArray) {
        const insertQuery = 'INSERT INTO classes (class_name, day, classs) VALUES (?, ?, ?)';
        const values = [className, day, classs];
  
        db.query(insertQuery, values, (err, results) => {
          if (err) {
            console.error('Error inserting into classes table:', err);
            res.status(500).json({ error: 'Internal Server Error' });
          }
        });
      }
    }
  
    res.json({ message: 'Classes inserted successfully' });
  });
  module.exports=router