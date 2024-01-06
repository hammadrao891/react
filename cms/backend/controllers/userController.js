const asyncHandler = require("express-async-handler");
const  db  = require("../db");
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Register User
const registerUser = asyncHandler(async (req, res) => {
    const { name,classs,current_fee_month,current_fee_year,regNum,fName,address,contact,MonthlyFeeDetails,mName,officeName,monthlyFee,fCnic,mCnic,homeLandmark,officeLandmark,village,homeContact,workContact,admissionFee,securityDeposit,annualCharges,fOccupation,mOccupation,dob,gender,admissionDate} = req.body;
console.log(req.body)
    // if (!name || !classs) {
    //   return res.status(400).json({ error: 'Name and classs are required' });
    // }
  
    const sql = 'INSERT INTO students (name, classs, current_fee_month, current_fee_year, regNum, fName, address, contact, MonthlyFeeDetails, mName, officeName, monthlyFee, fCnic, mCnic, homeLandmark, officeLandmark, village, homeContact, workContact, admissionFee, securityDeposit, annualCharges, fOccupation, mOccupation, dob, gender,admissionDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);'
    const values = [name, classs,current_fee_month,current_fee_year,regNum,fName,address,contact,MonthlyFeeDetails,mName,officeName,monthlyFee,fCnic,mCnic,homeLandmark,officeLandmark,village,homeContact,workContact,admissionFee,securityDeposit,annualCharges,fOccupation,mOccupation,dob,gender,admissionDate];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error registering student: ' + err.message);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      res.status(201).json({ message: 'Student registered successfully', studentId: result.insertId });
    });
});

const markAttendance = asyncHandler(async(req,res)=>{
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

  const checkClassAttendance = asyncHandler(async(req,res)=>{
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
  
const getCLassStudent = asyncHandler(async(req,res)=>{
  const {classs} = req.params;
  const q = "select * from students where classs=?";
  const values = [classs]
  console.log(classs)
  db.query(q,values,(err,data)=>{
    if(err) return res.send(err);
    return res.json(data)
  })  

})
const getStudentByRegNum = asyncHandler(async(req,res)=>{
  const {regNum} = req.params;
  const q = "select * from students where regNum=?";
  const values = [regNum]
  console.log(regNum)
  db.query(q,values,(err,data)=>{
    if(err) return res.send(err);
    return res.json(data)
  })  

})
const getUsers = asyncHandler(async(req,res)=>{
const q = "select * from students";
db.query(q,(err,data)=>{
  if(err) return res.send(err);
  return res.json(data)
}
    

)


})
const unpaid = asyncHandler(async(req,res)=>{
  const query = 'SELECT * FROM student WHERE MonthlyFeeDetails = 0';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
})

const checkAttendance = asyncHandler(async(req,res)=>{
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

const payFee = asyncHandler(async(req,res)=>
{
  const { studentId, month, year } = req.body;

  if (!studentId || !month || !year) {
    return res.status(400).json({ error: 'Student ID, month, and year are required' });
  }

  const sql = 'INSERT INTO fees (student_id, month, year, status) VALUES (?, ?, ?, "paid")';
  const values = [studentId, month, year];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error paying fee: ' + err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.status(201).json({ message: 'Fee paid successfully', feeId: result.insertId });
  });
})


const getFeeDetails = asyncHandler(async(req,res)=>{
  const { studentId, month, year } = req.params;

  if (!studentId || !month || !year) {
    return res.status(400).json({ error: 'Student ID, month, and year are required' });
  }

  const sql = 'SELECT * FROM fees WHERE student_id = ? AND month = ? AND year = ?';

  db.query(sql, [studentId, month, year], (err, result) => {
    if (err) {
      console.error('Error checking fee: ' + err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const feeStatus = result.length > 0 ? result[0].status : 'unpaid';
    res.status(200).json({ feeStatus });
  });
})

const overallFeeDetails = asyncHandler(async(req,res)=>{
  const { studentId } = req.params;

  if (!studentId) {
    return res.status(400).json({ error: 'Student ID is required' });
  }

  const sql = 'SELECT month, year, status FROM fees WHERE student_id = ?';

  db.query(sql, [studentId], (err, result) => {
    if (err) {
      console.error('Error checking overall fee: ' + err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const overallFeeRecord = {};

    result.forEach(row => {
      const { month, year, status } = row;

      if (!overallFeeRecord[year]) {
        overallFeeRecord[year] = {};
      }

      overallFeeRecord[year][month] = status;
    });

    res.status(200).json({ overallFeeRecord });
  });

})

const generateChallan = asyncHandler(async(req,res)=>{
  const { studentId, month, year } = req.params;

  if (!studentId || !month || !year) {
    return res.status(400).json({ error: 'Student ID, month, and year are required' });
  }

  const sql = 'SELECT name FROM students WHERE id = ?';
  db.query(sql, [studentId], (err, result) => {
    if (err) {
      console.error('Error retrieving student name: ' + err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const studentName = result.length > 0 ? result[0].name : 'Unknown Student';

    const doc = new PDFDocument();
    const fileName = `Fee_Challan_${studentName}_${month}_${year}.pdf`;
    const filePath = `./challans/${fileName}`;

    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(14).text('Fee Challan', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Student: ${studentName}`);
    doc.fontSize(12).text(`Month: ${month}`);
    doc.fontSize(12).text(`Year: ${year}`);
    doc.moveDown();

    doc.end();

    res.status(200).json({ downloadLink: `http://localhost:3000/downloadChallan/${fileName}` });
  });
  
})

const downloadChallan= asyncHandler(async (req, res) => {
  const { fileName } = req.params;
  const filePath = `./challans/${fileName}`;

  // Set response headers
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);

  // Pipe the PDF to the response
  fs.createReadStream(filePath).pipe(res);
});

const generateAllChallans = asyncHandler(async (req,res)=>{
  const { month, year } = req.params;

  if (!month || !year) {
    return res.status(400).json({ error: 'Month and year are required' });
  }

  const sql = 'SELECT id FROM students';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error retrieving student IDs: ' + err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    const promises = result.map(row => generateFeeChallan(row.id, month, year));

    Promise.all(promises)
      .then(() => {
        res.status(200).json({ message: 'Fee challans generated for all students' });
      })
      .catch(error => {
        console.error('Error generating fee challans: ' + error.message);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });
})

function generateFeeChallan(studentId, month, year) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT name FROM students WHERE id = ?';
    db.query(sql, [studentId], (err, result) => {
      if (err) {
        console.error('Error retrieving student name: ' + err.message);
        reject(err);
      }

      const studentName = result.length > 0 ? studentId : 'Unknown Student';

      const doc = new PDFDocument();
      const fileName = `Fee_Challan_${studentName}_${month}_${year}.pdf`;
      const filePath = path.join(__dirname,"..","challans", fileName);

      doc.pipe(fs.createWriteStream(filePath));

      doc.fontSize(14).text('Fee Challan', { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text(`Student: ${studentName}`);
      doc.fontSize(12).text(`Month: ${month}`);
      doc.fontSize(12).text(`Year: ${year}`);
      doc.moveDown();

      doc.end();

      resolve();
    });
  });
}

const getPaidStudents =asyncHandler((req,res) => {
  const month = 3;
  const year = 2023;

  // Execute the SQL query to get students by fee payment in month 5 and year 2023
  const query = 'SELECT * FROM students WHERE current_fee_month = ? AND current_fee_year = ?';
  db.query(query, [month, year], (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Send the results as JSON
    res.json(results);
  });
});
const updateStudentClass = asyncHandler(async(req,res)=>{
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
const updateWholeClass = asyncHandler(async(req, res) => {
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
const updateDOB = asyncHandler(async(req, res) => {
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
const UpdateAdmissionDate = asyncHandler(async(req, res) => {
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
const updateStudent =asyncHandler((req, res) => {
    const regNum = req.params.regNum;
    const studentData = req.body;
  console.log(studentData)
    // Execute the SQL query to update student details
    const query = 'UPDATE students SET ? WHERE regNum = ?';
    db.query(query, [studentData, regNum], (err, result) => {
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

  const terminateStudent =asyncHandler(async(req, res) => {
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
  unpaid,
  markAttendance,
  checkAttendance,
  payFee,
  getFeeDetails,
  overallFeeDetails,
  generateChallan,
  downloadChallan,
  generateAllChallans,
  getCLassStudent,
  checkClassAttendance,
 getStudentByRegNum,
 getPaidStudents,
 updateStudent,
 updateStudentClass,
 updateWholeClass,
 updateDOB,
 UpdateAdmissionDate,
 terminateStudent
};