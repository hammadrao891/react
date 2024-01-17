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
  




  module.exports=router