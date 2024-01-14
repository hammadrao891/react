const asyncHandler = require("express-async-handler");
const  db  = require("../db");
const path = require('path');
const puppeteer = require('puppeteer');
const ejs = require('ejs');
const fs = require('fs');

// Register User
const registerUser = asyncHandler(async (req, res) => {
    const { name,classs,current_fee_month,current_fee_year,regNum,fName,address,contact,MonthlyFeeDetails,mName,officeName,monthlyFee,fCnic,mCnic,homeLandmark,officeLandmark,village,homeContact,workContact,admissionFee,securityDeposit,annualCharges,fOccupation,mOccupation,dob,gender,admissionDate, previousDue,totalAmountDue,paymentStatus,feeMonth,paidAmount,fine,paymentDate,lastMonthStatus} = req.body;
console.log(req.body)
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
        const value=[regNum,previousDue,totalAmountDue,paymentStatus,feeMonth,paidAmount,fine,paymentDate,lastMonthStatus]
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

async function renderEjsTemplate(templatePath, data) {
  const template = fs.readFileSync(templatePath, 'utf-8');
  return ejs.render(template, data);
}
async function generatePDF(htmlContent, pdfFilePath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(htmlContent);

  await page.pdf({ path: pdfFilePath, format: 'A4' });

  await browser.close();

  console.log(`PDF generated successfully at: ${pdfFilePath}`);
}

 const generateChallan = asyncHandler(async (req, res) => {
  const data = req.body;
  console.log(data);

  const query =
    'SELECT fee.previousDue, fee.totalAmountDue, fee.paymentStatus, students.name, fee.feeMonth,students.fName,students.MonthlyFeeDetails,fee.fine, students.securityDeposit,fee.totalAmountDue,students.regNum, students.classs,students.admissionFee,students.annualCharges FROM fee JOIN students ON fee.regNum = students.regNum;';

  db.query(query, async (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      try {
        const ejsTemplatePath = 'challan.ejs'; // Replace with the actual path
        const ejsTemplatePath2 = 'singleChallan.ejs';
        const pdfFilePath = `combinedChallan.pdf`;

        const usersData = [];
        for (let i = 0; i < results.length; i++) {
          console.log(results[i+1])
          if(results[i+1]){
          const userData = {
            name1: `${results[i].name}`,
            fName1: `${results[i].fName}`,
            regNum1: `${results[i].regNum}`,
            // ... other properties
            previousDue1:`${results[i].previousDue}`,
            totalAmountDue1:data.MonthlyFeeDetails && data.admissionFee && data.annualCharges ? parseInt(results[i].annualCharges) +parseInt(data.miscAmount) + parseInt(results[i].previousDue) +  parseInt(results[i].MonthlyFeeDetails) + parseInt(results[i].admissionFee) + parseInt(results[i].fine)+ parseInt(results[i].securityDeposit) 
            :data.MonthlyFeeDetails ?parseInt(results[i].previousDue) +  parseInt(results[i].MonthlyFeeDetails)  + parseInt(results[i].fine)+ parseInt(results[i].securityDeposit)  
            :data.annualCharges ? parseInt(results[i].previousDue) +parseInt(results[i].annualCharges) + parseInt(results[i].fine)+ parseInt(results[i].securityDeposit)+parseInt(data.miscAmount)  
            :data.admissionFee && parseInt(results[i].previousDue) +   parseInt(results[i].admissionFee) + parseInt(results[i].fine)+ parseInt(results[i].securityDeposit) +parseInt(data.miscAmount) ,
            paymentStatus1:`${results[i].paymentStatus}`,
            feeMonth1:`${results[i].feeMonth}`,
            tutionFee1:`${results[i].MonthlyFeeDetails}`,
            fine1:`${results[i].fine}`,
            securityDeposit1:`${results[i].securityDeposit}`,
            class1:`${results[i].classs}`,
            admissionFee1:`${results[i].admissionFee}`,
            annualCharges1:`${results[i].annualCharges}`,

            name2: results[i + 1] ? `${results[i + 1].name}` : '',
            fName2: results[i + 1] ? `${results[i + 1].fName}` : '',
            regNum2: results[i + 1] ? `${results[i + 1].regNum}` : '',
            previousDue2:results[i + 1] ? `${results[i + 1].previousDue}`:'',
            totalAmountDue2:data.MonthlyFeeDetails && data.admissionFee && data.annualCharges ? parseInt(results[i+1].annualCharges) +parseInt(data.miscAmount) + parseInt(results[i+1].previousDue) +  parseInt(results[i+1].MonthlyFeeDetails) + parseInt(results[i+1].admissionFee) + parseInt(results[i+1].fine)+ parseInt(results[i+1].securityDeposit) 
            :data.MonthlyFeeDetails ?parseInt(results[i+1].previousDue) +  parseInt(results[i+1].MonthlyFeeDetails)  + parseInt(results[i+1].fine)+ parseInt(results[i+1].securityDeposit)  
            :data.annualCharges ? parseInt(results[i+1].previousDue) +parseInt(results[i+1].annualCharges) + parseInt(results[i+1].fine)+ parseInt(results[i+1].securityDeposit)+parseInt(data.miscAmount)  
            :data.admissionFee && parseInt(results[i+1].previousDue) +   parseInt(results[i+1].admissionFee) + parseInt(results[i+1].fine)+ parseInt(results[i+1].securityDeposit) +parseInt(data.miscAmount) ,
            paymentStatus2:results[i + 1] ? `${results[i+1].paymentStatus}`:'',
            feeMonth2:results[i + 1] ? `${results[i+1].feeMonth}`:'',
            tutionFee2:results[i + 1] ? `${results[i+1].MonthlyFeeDetails}` :'',
            fine2:results[i + 1] ? `${results[i+1].fine}`:'',
            securityDeposit2:results[i + 1] ?`${results[i+1].securityDeposit}`:'',
            class2:results[i + 1] ? `${results[i+1].classs}`:'',
            admissionFee2:results[i + 1] ?`${results[i+1].admissionFee}`:'',
            annualCharges2:results[i + 1] ?`${results[i+1].annualCharges}`:'',
            // ... other properties

            miscAmount: data.miscAmount,
            miscDescription: data.miscDescription,
            feeMonth: data.feeMonth,
          };
          usersData.push(userData);
          i++
        }
      }

        const htmlContents = await Promise.all(
          usersData.map((userData) =>
            renderEjsTemplate(ejsTemplatePath, { user: userData })
          )
          
        );
        
                   if(results.length%2 !== 0)
  {
    const userData = {
      name1: `${results[results.length-1].name}`,
      fName1: `${results[results.length-1].fName}`,
      regNum1: `${results[results.length-1].regNum}`,
      previousDue1:`${results[results.length-1].previousDue}`,
      totalAmountDue1:data.MonthlyFeeDetails && data.admissionFee && data.annualCharges ? parseInt(results[results.length-1].annualCharges) +parseInt(data.miscAmount) + parseInt(results[results.length-1].previousDue) +  parseInt(results[results.length-1].MonthlyFeeDetails) + parseInt(results[results.length-1].admissionFee) + parseInt(results[results.length-1].fine)+ parseInt(results[results.length-1].securityDeposit) 
      :data.MonthlyFeeDetails ?parseInt(results[results.length-1].previousDue) +  parseInt(results[results.length-1].MonthlyFeeDetails)  + parseInt(results[results.length-1].fine)+ parseInt(results[results.length-1].securityDeposit)  
      :data.annualCharges ? parseInt(results[results.length-1].previousDue) +parseInt(results[results.length-1].annualCharges) + parseInt(results[results.length-1].fine)+ parseInt(results[results.length-1].securityDeposit)+parseInt(data.miscAmount)  
      :data.admissionFee && parseInt(results[results.length-1].previousDue) +   parseInt(results[results.length-1].admissionFee) + parseInt(results[results.length-1].fine)+ parseInt(results[results.length-1].securityDeposit) +parseInt(data.miscAmount) ,
      paymentStatus1:`${results[results.length-1].paymentStatus}`,
      feeMonth1:`${results[results.length-1].feeMonth}`,
      tutionFee1:`${results[results.length-1].MonthlyFeeDetails}`,
      fine1:`${results[results.length-1].fine}`,
      securityDeposit1:`${results[results.length-1].securityDeposit}`,
      class1:`${results[results.length-1].classs}`,
      admissionFee1:`${results[results.length-1].admissionFee}`,
      annualCharges1:`${results[results.length-1].annualCharges}`,
      miscAmount:data.miscAmount,
      miscDescription:data.miscDescription,
      feeMonth:data.feeMonth   // Add more dynamic values as needed
  };
  

      const additionalHtmlContent =   renderEjsTemplate(ejsTemplatePath2, { user: userData })
      htmlContents.pop();
      htmlContents.push(additionalHtmlContent);
    

}
   

        await generateCombinedPDF(htmlContents, pdfFilePath);

        res.status(200).json('Success');
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  });
});

async function generateCombinedPDF(htmlContents, pdfFilePath) {
  // Combine multiple HTML contents into a single HTML string
  const combinedHtmlContent = `<html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Combined Challan</title>
      <style>
        body {
          width: 100%;
          margin: 0 auto;
          margin-left:4em
        }
      </style>
    </head>
    <body>` +
    htmlContents.map((content, index) => {
      return `<div${index !== 0 ? ' style="page-break-before: always;"' : ''}>${content}</div>`;
    }).join('') +
    `</body>
  </html>`;

  // Generate the combined PDF
  await generatePDF(combinedHtmlContent, pdfFilePath);
}

const downloadChallan= asyncHandler(async (req, res) => {
  const { fileName } = req.params;
  const filePath = `./challans/${fileName}`;

  // Set response headers
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);

  // Pipe the PDF to the response
  fs.createReadStream(filePath).pipe(res);
});

const generateAllChallans = asyncHandler(async (req, res) => {

      
    for(var i = 0;i<10;i++ ){
      console.log(i)
      generateFeeChallan("m", 'January', 2022)
    }
        res.status(200).json({ message: 'Fee challans generated for all students' });
  
  });


function generateFeeChallan(studentId, month, year) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT name FROM students WHERE regNum = ?';
    db.query(sql, [studentId], (err, result) => {
      if (err) {
        console.error('Error retrieving student name: ' + err.message);
        reject(err);
      }

      const studentName = result.length > 0 ? result[0].name : 'Unknown Student';

      const doc = new PDFDocument();
      const doc2 = new PDFDocumentt()
      const fileName = `Fee_Challan_${studentName}_${month}_${year}.pdf`;
      const filePath = path.join(__dirname, '..', 'challans', fileName);

      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      doc.fontSize(14).text('Fee Challan', { align: 'center' });
      doc.moveDown();

      // Create a table using text drawing
      const table = {
        headers: ['Description', 'Amount'],
        rows: [
          ['Monthly Tuition Fee', '$100'], // Add your data here
          ['Previous Due', '$50'],
          ['Total Amount Due', '$150'],
        ],
      };

      const startX = 50;
      const startY = doc.y;
      const cellWidth = 150;

      // Draw table headers
      table.headers.forEach((header, i) => {
        doc.text(header, startX + i * cellWidth, startY, { width: cellWidth, align: 'left' });
      });

      // Draw table rows
      table.rows.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          doc.text(cell, startX + colIndex * cellWidth, startY + (rowIndex + 1) * 20, { width: cellWidth, align: 'left' });
        });
      });

      doc.end();

      stream.on('finish', () => {
        resolve(filePath);
      });

      stream.on('error', (streamErr) => {
        reject(streamErr);
      });
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