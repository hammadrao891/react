const  db  = require("../db");


// Register User
const registerUser = (async (req, res) => {
    const { name,classs,current_fee_month,current_fee_year,regNum,fName,address,contact,MonthlyFeeDetails,mName,officeName,monthlyFee,fCnic,mCnic,homeLandmark,officeLandmark,village,homeContact,workContact,admissionFee,securityDeposit,annualCharges,fOccupation,mOccupation,dob,gender,admissionDate, previousDue,totalAmountDue,paymentStatus,feeMonth,paidAmount,fine,paymentDate,lastMonthStatus} = req.body;
// console.log(req.body)
    // if (!name || !classs) {
    //   return res.status(400).json({ error: 'Name and classs are required' });
    // }
  
    const sql = 'INSERT INTO students (name, classs, current_fee_month, current_fee_year, regNum, fName, address, contact, MonthlyFeeDetails, mName, officeName, monthlyFee, fCnic, mCnic, homeLandmark, officeLandmark, village, homeContact, workContact, admissionFee, securityDeposit, annualCharges, fOccupation, mOccupation, dob, gender,admissionDate) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?);'
    const values = [name, classs, current_fee_month, current_fee_year, regNum, fName, address, contact, MonthlyFeeDetails, mName, officeName, monthlyFee, fCnic, mCnic, homeLandmark, officeLandmark, village, homeContact, workContact, admissionFee, securityDeposit, annualCharges, fOccupation, mOccupation, dob, gender,admissionDate];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error registering student: ' + err.message);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      else
      {
        const sqlFee='insert into fee(regNum,previousDue,totalAmountDue,paymentStatus,feeMonth,paidAmount,fine,paymentDate,lastMonthStatus) values(?,?,?,?,?,?,?,?,?)'
        const value=[regNum,0,2750,"not paid",admissionDate,0,0,admissionDate,"nil"]
        db.query(sqlFee, value, (err, result) => {
          if (err) {
            console.error('Error registering student: ' + err.message);
            // return res.status(500).json({ error: 'Internal Server Error' });
          }
      })
    }
      res.status(201).json({ message: 'Student registered successfully', studentId: result.insertId });
    });
});

const markAttendance = (async(req,res)=>{
  const { classs,  date, presentStudents } = req.body;

  if (!classs  || !date || !presentStudents || !Array.isArray(presentStudents)) {
    return res.status(400).json({ error: 'Invalid input. Class, date, and presentStudents array are required.' });
  }

  const sql = 'INSERT INTO attendance (student_id, classs, date, status) VALUES ?';
  const attendanceValues = presentStudents.map(studentId => [studentId, classs, date, 'present']);

  db.query(sql, [attendanceValues], (err, result) => {
    if (err) {
      console.error('Error marking attendance: ' + err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.status(201).json({ message: 'Attendance marked successfully' });
  });
  });

  const checkClassAttendance = (async(req,res)=>{
    const { classs, startDate, endDate } = req.params;

    if (!classs || !startDate || !endDate) {
      return res.status(400).json({ error: 'Invalid input. Class, startDate, and endDate are required.' });
    }
  
    const sql = `
      SELECT students.id, students.name, attendance.date, attendance.status
      FROM students
      LEFT JOIN attendance ON students.id = attendance.student_id
      WHERE students.classs = ? AND attendance.date BETWEEN ? AND ?
    `;
  
    db.query(sql, [classs, startDate, endDate], (err, result) => {
      if (err) {
        console.error('Error checking class attendance: ' + err.message);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      const classAttendance = {};
  
      result.forEach(row => {
        const { id, name, date, status } = row;
  
        if (!classAttendance[id]) {
          classAttendance[id] = { id, name, attendance: [] };
        }
  
        classAttendance[id].attendance.push({ date, status });
      });
  
      res.status(200).json({ classAttendance });
    });
  })
  
const getCLassStudent = (async(req,res)=>{
  const {classs} = req.params;
  const q = `SELECT students.*, class_names.class_name
  FROM students
  INNER JOIN class_names ON students.classs = class_names.class_id
  WHERE students.classs = ?`;
  const values = [classs]
  console.log(classs)
  db.query(q,values,(err,data)=>{
    if(err) return res.send(err);
    return res.json(data)
  })  

})
const getStudentByRegNum = (async(req,res)=>{
  const {regNum} = req.params;
  const q = `  SELECT students.*, class_names.class_name
  FROM students
  INNER JOIN class_names ON students.classs = class_names.class_id
  WHERE students.regNum = ?`;
  const values = [regNum]
  console.log(regNum)
  db.query(q,values,(err,data)=>{
    if(err) return res.send(err);
    return res.json(data)
  })  

})
const getUsers = (async(req,res)=>{
const q = "select * from students";
db.query(q,(err,data)=>{
  if(err) return res.send(err);
  return res.json(data)
}
    

)


})

const checkAttendance = (async(req,res)=>{
  const requestedDate = req.params.date || new Date().toISOString().split('T')[0]; // Use the requested date or default to the current date

  const sql = `
    SELECT students.id, students.name, attendance.date, attendance.status
    FROM students
    LEFT JOIN attendance ON students.id = attendance.student_id AND attendance.date = ?
  `;

  db.query(sql, [requestedDate], (err, result) => {
    if (err) {
      console.error('Error checking attendance: ' + err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const attendanceData = {};

    // Organize the data by student
    result.forEach(row => {
      const { id, name, date, status } = row;

      if (!attendanceData[id]) {
        attendanceData[id] = { id, name, attendance: [] };
      }

      attendanceData[id].attendance.push({ date, status });
    });

    res.status(200).json({ attendanceData });
  });
})


const updateStudentClass = (async(req,res)=>{
  const regNum = req.params.regNum;
  const classs = req.params.classs; 

  const updateQuery = 'UPDATE students SET classs = ? WHERE regNum = ?';
  db.query(updateQuery, [classs, regNum], (err, results) => {
    if (err) {
      console.error('Error updating class:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Class updated successfully' });
    }
  });
})
const updateWholeClass = (async(req, res) => {
  const { classs } = req.params;
  const {newClasss} = req.body; 
  const updateQuery = `UPDATE students SET classs= ? WHERE classs= ?`;

  db.query(updateQuery, [newClasss, classs], (err, results) => {
    if (err) {
      console.error('Error updating classes:', err);
      res.status(500).send('Error updating classes');
      return;
    }

    console.log(`Changed class for students from ${classs} to ${newClasss}`);
    res.status(200).send(`Changed class for students from ${classs} to ${newClasss}`);
  });
})
const updateDOB = (async(req, res) => {
  const { regNum } = req.params;
  const {dob} = req.body; 
  const updateQuery = `UPDATE students SET dob= ? WHERE regNum= ?`;

  db.query(updateQuery, [dob, regNum], (err, results) => {
    if (err) {
      console.error('Error updating dob:', err);
      res.status(500).send('Error updating dob');
      return;
    }

    // console.log(`Changed class for students from ${re} to ${newClasss}`);
    res.status(200).send(`Updated`);
  });
})
const UpdateAdmissionDate = (async(req, res) => {
  const { regNum } = req.params;
  const {admissionDate} = req.body; 
  const updateQuery = `UPDATE students SET admissionDate= ? WHERE regNum= ?`;

  db.query(updateQuery, [admissionDate, regNum], (err, results) => {
    if (err) {
      console.error('Error updating admissionDate:', err);
      res.status(500).send('Error updating admissionDate');
      return;
    }

    // console.log(`Changed class for students from ${re} to ${newClasss}`);
    res.status(200).send(`Updated`);
  });
})
const updateStudent =((req, res) => {
    const regNum = req.params.regNum;
    const studentData = req.body;
  console.log(studentData)
  const {class_id,class_name,...data} =studentData
    // Execute the SQL query to update student details
    const query = 'UPDATE students SET ? WHERE regNum = ?';
    db.query(query, [data, regNum], (err, result) => {
      if (err) {
        console.error('Error executing query: ' + err.stack);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      // Check if the student was found and updated
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Student not found' });
        return;
      }
  
      res.json({ message: 'Student details updated successfully' });
    });
  });

  const terminateStudent =(async(req, res) => {
    const { regNum } = req.params;
  
    const deleteQuery = 'DELETE FROM students WHERE regNum = ?';
  
    db.query(deleteQuery, [regNum], (err, results) => {
      if (err) {
        console.error('Error deleting student:', err);
        res.status(500).send('Error deleting student');
        return;
      }
  
      if (results.affectedRows === 0) {
        res.status(404).send('Student not found');
        return;
      }
  
      console.log(`Deleted student with registration number ${regNum}`);
      res.status(200).send(`Deleted student with registration number ${regNum}`);
    });
  });

module.exports = {
  registerUser,
  getUsers,
  markAttendance,
  checkAttendance,
  getCLassStudent,
  checkClassAttendance,
  getStudentByRegNum,
  updateStudent,
  updateStudentClass,
  updateWholeClass,
  updateDOB,
  UpdateAdmissionDate,
  terminateStudent
};