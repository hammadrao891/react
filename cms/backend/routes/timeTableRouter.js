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

    const query = 'SELECT class_id, class_name, day,time_slot,class_teacher FROM classes WHERE classs = ?';
    db.query(query, [classs], (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        const organizedClasses = {};
        const class_teacher=results[0]?.class_teacher
        results.forEach((result) => {
          
          const { class_id, class_name, day,time_slot } = result;
  
          // Create an array for the day if it doesn't exist
          if (!organizedClasses[day]) {
            organizedClasses[day] = [];
          }
  
          organizedClasses[day].push({ class_id, class_name,time_slot });
        });
  
        res.json({ classes: organizedClasses ,class_teacher:class_teacher});
      }
    });
  });

  router.post('/insert-classes', (req, res) => {
    const { classs,classTeacher, ...classData } = req.body;
console.log(classs)
    // Extract day, class_name, and classs from the req.body and insert into classes table
    for (const day of Object.keys(classData)) {
        const classesArray = classData[day];
        for (const [className, time_slot] of classesArray) {
            const insertQuery = 'INSERT INTO classes (class_name, day, classs, time_slot,class_teacher) VALUES (?, ?, ?, ?,?)';
            const values = [className, day, classs, time_slot,classTeacher];

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
router.post('/check-class-match', (req, res) => {
  const { classs, class_name ,dayToCheck,time_slot} = req.body;
  

  // Check if the specified class_name for Monday matches with any other class_name for Monday
  const selectQuery = 'SELECT * FROM classes WHERE day = ? AND class_name = ? AND time_slot=? AND  classs <> ?';
  const values = [dayToCheck, class_name, time_slot ,classs];

  db.query(selectQuery, values, (err, results) => {
      if (err) {
          console.error('Error querying classes table:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
      }
// console.log(results[0].classs)
      if (results.length > 0) {
        console.log(class_name,time_slot,dayToCheck)
          const matchingClass = results[0].classs;
          return res.json({
              message: `Teacher already has a class in ${matchingClass}.`,
              match: true,
          });
      } else {
          return res.json({
              message: `No match found for class_name ${class_name} on Monday in other classes.`,
              match: false,
          });
      }
  });
});
router.get('/class-occurrences', (req, res) => {
  // Query to count occurrences of each class on different days
  const query = 'SELECT class_name, day, COUNT(*) as occurrences FROM classes GROUP BY class_name, day';

  db.query(query, (err, results) => {
      if (err) {
          console.error('Error querying classes table:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
      }

      // Organize the results into an array for each class
      const classOccurrences = {};
      results.forEach(result => {
          const className = result.class_name;
          const day = result.day;
          const occurrences = result.occurrences;

          if (!classOccurrences[className]) {
              classOccurrences[className] = {};
          }

          classOccurrences[className][day] = occurrences;
      });

      return res.json({ classOccurrences });
  });
});
router.get('/checkClassTeacher/:teacherId', (req, res) => {
  const teacherId = req.params.teacherId;

  // Execute a SQL query to check if the class_teacher exists
  const sql = 'SELECT * FROM classes WHERE class_teacher = ? ';
  db.query(sql, [teacherId], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.length > 0) {
        res.json({ exists: true ,classs:results[0].classs});
      } else {
        res.json({ exists: false });
      }
    }
  });
});

router.get('/checkClassTeacherForUpdation/:teacherName/:classs', (req, res) => {
  const teacherName = req.params.teacherName;
  const classs=req.params.classs;

  // Execute a SQL query to check if the class_teacher exists
  const sql = 'SELECT * FROM classes WHERE class_teacher = ? and classs <> ? ';
  db.query(sql, [teacherName,classs], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log(results)
      if (results.length > 0) {
        res.json({ exists: true ,classs:results[0].classs});
      } else {
        res.json({ exists: false });
      }
    }
  });
});
router.post('/addTeacher', (req, res) => {
  const { teacher_name, main_subject, secondary_subject } = req.body;

  // Execute a SQL query to insert teacher information into the "teachers" table
  const sql = 'INSERT INTO teachers (teacher_name, main_subject, secondary_subject) VALUES (?, ?, ?)';
  db.query(sql, [teacher_name, main_subject, secondary_subject], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Teacher information added successfully' });
    }
  });
});

router.get('/getTeachers', (req, res) => {
  // Execute a SQL query to retrieve all teachers from the "teachers" table
  const sql = 'SELECT * FROM teachers';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});



 module.exports=router