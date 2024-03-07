const  db  = require("../db");
const fs = require("fs")
const ejs = require("ejs")
const puppeteer = require("puppeteer")



const individualFeeCollectionReport =( (req, res) => {
    const regNum = req.params.regNum;
  
      const query = `
      SELECT fee.previousDue, fee.totalAmountDue, fee.paymentStatus,students.name
      FROM fee
      JOIN students ON fee.regNum = students.regNum
      WHERE students.regNum = ?;
      `;
      
  
      // Execute the query with the provided student ID
      db.query(query, [regNum], (err, results) => {
        // Handle query results
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else if (results.length === 0) {
          res.status(404).json({ error: 'Student not found or no fee information available' });
        } else {
          res.json(results[0]);
        }
  
      });
})

const feeCollectionReport =( (req, res) => {
    const regNum = req.params.regNum;
  
    const query = `
    SELECT fee.previousDue, fee.totalAmountDue, fee.paymentStatus, students.name
    FROM fee
    JOIN students ON fee.regNum = students.regNum
  `;

  // Use the db db to execute the query
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
})

const getFeeDetailsP = (async(req, res) => {
  const regNum = req.params.regNum;

  const sql = `
  SELECT students.regNum,
  students.name,
  students.fName,
  students.classs,
  students.annualCharges,
  students.admissionFee,
students.securityDeposit,
  
  fee.feeMonth,
  students.MonthlyFeeDetails,
  fee.previousDue,
  fee.paymentStatus,
  fee.totalAmountDue
  
  
  FROM fee
  JOIN students ON fee.regNum = students.regNum
  WHERE students.regNum = ?;
  `;

  db.query(sql, [regNum], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const studentDetails = result[0];
    res.json(studentDetails);
  });
});

const getFeeDetailsFeeHistory = (async(req, res) => {
  const regNum = req.params.regNum;

  const sql = `
  SELECT students.regNum,
  students.name,
  students.fName,
  students.classs,
  students.annualCharges,
  students.admissionFee,
  students.securityDeposit,
  
  fee.feeMonth,
  students.MonthlyFeeDetails,
  fee.previousDue,
  fee.paymentStatus,
  fee.totalAmountDue
  
  
  FROM fee
  JOIN students ON fee.regNum = students.regNum
  WHERE students.regNum = ?;
  `;

  db.query(sql, [regNum], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const studentDetails = result;
    res.json(studentDetails);
  });
});
const getStudents = (async(req, res) => {
  
  const sqlQuery = `
  SELECT
  s.regNum,
  s.name ,
  s.fName,
  s.classs,
  s.MonthlyFeeDetails ,
  f.previousDue,
  f.totalAmountDue,
  f.paymentStatus
FROM students s
JOIN fee f ON s.regNum = f.regNum;

  `;

  // Execute the SQL query
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});


const getFeeDetails = (async(req, res) => {
  const regNum = req.params.regNum;

  const sql = `
    SELECT students.regNum,
        students.name,
        students.fName,
        students.classs,
        students.MonthlyFeeDetails,
        fee.previousDue
    FROM fee
    JOIN students ON fee.regNum = students.regNum
    WHERE students.regNum = ?
  `;

  db.query(sql, [regNum], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const studentDetails = result[0];
    res.json(studentDetails);
  });
});

const modifyMonthlyFee = ((req, res) => {
  const regNum = req.params.regNum;
  const newMonthlyFeeDetails = req.body.newMonthlyFeeDetails;

  const updateSql = `
    UPDATE students
    SET MonthlyFeeDetails = ?
    WHERE regNum = ?
  `;

  db.query(updateSql, [newMonthlyFeeDetails, regNum], (updateErr, updateResult) => {
    if (updateErr) {
      console.error('Error updating MonthlyFeeDetails:', updateErr);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({ message: 'MonthlyFeeDetails updated successfully' });
  });
});
const ModifyPreviousDues = ((req, res) => {
  const regNum = req.params.regNum;
  const previousDue = req.body.previousDue;

  const updateSql = `
    UPDATE fee
    SET previousDue = ?
    WHERE regNum = ?
  `;

  db.query(updateSql, [previousDue, regNum], (updateErr, updateResult) => {
    if (updateErr) {
      console.error('Error updating MonthlyFeeDetails:', updateErr);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({ message: 'MonthlyFeeDetails updated successfully' });
  });
});

const getStudentFeeDetails = (async (req, res) => {
  const regNum = req.params.regNum;

  // SQL query to fetch the last record
  const sql = `
  SELECT f.*, s.*
  FROM fee f
  JOIN students s ON f.regNum = s.regNum
  WHERE f.regNum = ?
  ORDER BY f.feeId DESC
  LIMIT 1
;`;

  // Execute the query
  db.query(sql, [regNum], (err, result) => {
    if (err) {
      console.error('Error fetching last fee record:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'No fee record found' });
    }

    return res.json(result[0]); // Return the first (and only) row
  });
});
const collectFee = ((req, res) => {
  const regNum = req.params.regNum;
  console.log(req.body)
const { feeMonth, paymentStatus,  totalAmountDue, paidAmount,fine } = req.body;

const sql = `UPDATE fee SET paymentStatus = ?,paidAmount = ? , fine = ? , totalAmountDue=? WHERE regNum = ? and feeMonth=?`;
const values = [paymentStatus, paidAmount,fine,totalAmountDue ,regNum, feeMonth ];
const previousDueQuery = `UPDATE students SET previousDue = ? where regNum=?`;

db.query(sql, values, (updateErr, updateResult) => {
  if (updateErr) {
    console.error('Error inserting into fee table:', updateErr);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
  
  
});
// let amountDue = totalAmountDue-paidAmount;
db.query(previousDueQuery,[totalAmountDue,regNum], (updateErr, updateResult) => {
  if (updateErr) {
    console.error('Error inserting into  table:', updateErr);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
  
  
})
res.json({ message: 'Fee details inserted successfully' });
});
const payFee = (async(req,res)=>
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

const getFeeDetails2 = (async(req,res)=>{
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
const overallFeeDetails = (async(req,res)=>{
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

const generateChallan = (async (req, res) => {
  const { annualCharges, admissionFee, MonthlyFeeDetails, miscAmount, miscDescription, feeMonth } = req.body;

  const query = 'SELECT name, fName, MonthlyFeeDetails, securityDeposit, regNum, classs, admissionFee, annualCharges,previousDue FROM students where status = "active"';

  try {
    const results = await new Promise((resolve, reject) => {
      db.query(query, (error, results) => {
        if (error) {
          console.error('Error executing query:', error);
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    const feeData = results.map(result => {
      const totalAmountDue =
      (MonthlyFeeDetails && admissionFee && annualCharges ? 
        (parseInt(result?.annualCharges) || 0) +
        (parseInt(miscAmount) || 0) +
        (parseInt(result?.previousDue) || 0) +
        (parseInt(result?.MonthlyFeeDetails) || 0) +
        (parseInt(result?.admissionFee) || 0) +
        (parseInt(result?.fine) || 0) +
        (parseInt(result?.securityDeposit) || 0) :
    
        (MonthlyFeeDetails ? 
            (parseInt(result.previousDue) || 0) +
            (parseInt(result?.MonthlyFeeDetails) || 0) +
            (parseInt(result?.fine) || 0) +
            (parseInt(result?.securityDeposit) || 0) :
    
            (annualCharges ? 
                (parseInt(result.previousDue) || 0) +
                (parseInt(result?.annualCharges) || 0) +
                (parseInt(result?.fine) || 0) +
                (parseInt(result?.securityDeposit) || 0) +
                (parseInt(miscAmount) || 0) :
    
                (admissionFee ? 
                    (parseInt(result.previousDue) || 0) +
                    (parseInt(result?.admissionFee) || 0) +
                    (parseInt(result?.fine) || 0) +
                    (parseInt(result?.securityDeposit) || 0) +
                    (parseInt(miscAmount) || 0) :
                    0
                )
            )
        )) 
      
      return [result.regNum, totalAmountDue, feeMonth, "not paid", 0, 0];
    });
    const shiftQuery = `INSERT INTO feeHistory
    SELECT * FROM fee ;
    `
    const truncateQuery="delete from fee where feeMonth != ? ";
    const insertQuery = "INSERT INTO fee (regNum, totalAmountDue, feeMonth, paymentStatus, paidAmount, fine) VALUES ?";
    // const insertIntoFeeHistoryQuery = "INSERT INTO feeHistory (regNum, totalAmountDue, feeMonth, paymentStatus, paidAmount, fine) VALUES ?";
    await new Promise((resolve, reject) => {
      db.query(shiftQuery, (error, results, fields) => {
        if (error) {
          console.error('Error inserting data into fee table:', error);
          reject(error);
        } else {
          console.log('Inserted', results.affectedRows, 'rows into the fee table.');
          resolve();
        }
      });
    });
    await new Promise((resolve, reject) => {
      
      db.query(insertQuery, [feeData], (error, results, fields) => {
        if (error) {
          console.error('Error inserting data into fee table:', error);
          reject(error);
        } else {
          console.log('Inserted', results.affectedRows, 'rows into the fee table.');
          resolve();
        }
      });
    });
   
    await new Promise((resolve, reject) => {
      db.query(truncateQuery,[feeMonth], (error, results, fields) => {
        if (error) {
          console.error('Error inserting data into fee table:', error);
          reject(error);
        } else {
          console.log('Inserted', results.affectedRows, 'rows into the fee table.');
          resolve();
        }
      });
    });

    
    const ejsTemplatePath = 'challan.ejs'; // Replace with the actual path
    const ejsTemplatePath2 = 'singleChallan.ejs';
    const pdfFilePath = `combinedChallan.pdf`;

    // Generate HTML contents for each student's challan
    const usersData = [];
    for (let i = 0; i < results.length; i++) {
      // if(results[i+1]){
      const userData = {
        name1: `${results[i].name}`,
        fName1: `${results[i].fName}`,
        regNum1: `${results[i].regNum}`,
        // ... other properties
        previousDue1:0,
        totalAmountDue1:(MonthlyFeeDetails && admissionFee && annualCharges ? 
          (parseInt(results[i]?.annualCharges) || 0) +
          (parseInt(miscAmount) || 0) +
          (parseInt(results[i]?.previousDue) || 0) +
          (parseInt(results[i]?.MonthlyFeeDetails) || 0) +
          (parseInt(results[i]?.admissionFee) || 0) +
          (parseInt(results[i]?.fine) || 0) +
          (parseInt(results[i]?.securityDeposit) || 0) :
      
          (MonthlyFeeDetails ? 
              (parseInt(results[i].previousDue) || 0) +
              (parseInt(results[i]?.MonthlyFeeDetails) || 0) +
              (parseInt(results[i]?.fine) || 0) +
              (parseInt(results[i]?.securityDeposit) || 0) :
      
              (annualCharges ? 
                  (parseInt(results[i].previousDue) || 0) +
                  (parseInt(results[i]?.annualCharges) || 0) +
                  (parseInt(results[i]?.fine) || 0) +
                  (parseInt(results[i]?.securityDeposit) || 0) +
                  (parseInt(miscAmount) || 0) :
      
                  (admissionFee ? 
                      (parseInt(results[i].previousDue) || 0) +
                      (parseInt(results[i]?.admissionFee) || 0) +
                      (parseInt(results[i]?.fine) || 0) +
                      (parseInt(results[i]?.securityDeposit) || 0) +
                      (parseInt(miscAmount) || 0) :
                      0
                  )
              )
          )) ,
        paymentStatus1:`${results[i].paymentStatus}`,
        feeMonth1:`${results[i].feeMonth}`,
        tutionFee1:`${results[i]?.MonthlyFeeDetails}`,
        fine1:0,
        securityDeposit1: results[i].securityDeposit ? `${results[i]?.securityDeposit}` : 0,
        class1:`${results[i].classs}`,
        admissionFee1:`${results[i]?.admissionFee}`,
        annualCharges1:results[i].annualCharges ? `${results[i]?.annualCharges}` : 0,

        name2: results[i + 1] ? `${results[i + 1].name}` : '',
        fName2: results[i + 1] ? `${results[i + 1].fName}` : '',
        regNum2: results[i + 1] ? `${results[i + 1].regNum}` : '',
        previousDue2:0,
        tutionFee2:`${results[i+1]?.MonthlyFeeDetails}`,
        totalAmountDue2:(MonthlyFeeDetails && admissionFee && annualCharges ? 
          (parseInt(results[i+1]?.annualCharges) || 0) +
          (parseInt(miscAmount) || 0) +
          (parseInt(results[i+1]?.previousDue) || 0) +
          (parseInt(results[i+1]?.MonthlyFeeDetails) || 0) +
          (parseInt(results[i+1]?.admissionFee) || 0) +
          (parseInt(results[i+1]?.fine) || 0) +
          (parseInt(results[i+1]?.securityDeposit) || 0) :
      
          (MonthlyFeeDetails ? 
              (parseInt(results[i+1]?.previousDue) || 0) +
              (parseInt(results[i+1]?.MonthlyFeeDetails) || 0) +
              (parseInt(results[i+1]?.fine) || 0) +
              (parseInt(results[i+1]?.securityDeposit) || 0) :
      
              (annualCharges ? 
                  (parseInt(results[i+1]?.previousDue) || 0) +
                  (parseInt(results[i+1]?.annualCharges) || 0) +
                  (parseInt(results[i+1]?.fine) || 0) +
                  (parseInt(results[i+1]?.securityDeposit) || 0) +
                  (parseInt(miscAmount) || 0) :
      
                  (admissionFee ? 
                      (parseInt(results[i+1]?.previousDue) || 0) +
                      (parseInt(results[i+1]?.admissionFee) || 0) +
                      (parseInt(results[i+1]?.fine) || 0) +
                      (parseInt(results[i+1]?.securityDeposit) || 0) +
                      (parseInt(miscAmount) || 0) :
                      0
                  )
              )
          )),
        securityDeposit2:results[i + 1] ?`${results[i+1]?.securityDeposit}`:'',
        class2:results[i + 1] ? `${results[i+1].classs}`:'',
        admissionFee2:results[i + 1] ?`${results[i+1]?.admissionFee}`:0,
        annualCharges2:results[i + 1] ?`${results[i+1]?.annualCharges}`:0,

        miscAmount: miscAmount,
        miscDescription: miscDescription,
        feeMonth: feeMonth,
      };

      usersData.push(userData);
      i++;
    // }
  }
    const htmlContents = await Promise.all(usersData.map(userData =>
      renderEjsTemplate(ejsTemplatePath, { user: userData })
    ));
    // Handle the case of odd number of students
    if (results.length % 2 !== 0) {
      const lastStudentIndex = results.length - 1;
      const lastUserData = {
        name1: `${results[lastStudentIndex].name}`,
        fName1: `${results[lastStudentIndex].fName}`,
        regNum1: `${results[lastStudentIndex].regNum}`,
        previousDue1: 0,
        totalAmountDue1: (MonthlyFeeDetails && admissionFee && annualCharges ? 
          (parseInt(results[lastStudentIndex]?.annualCharges) || 0) +
          (parseInt(miscAmount) || 0) +
          (parseInt(results[lastStudentIndex]?.previousDue) || 0) +
          (parseInt(results[lastStudentIndex]?.MonthlyFeeDetails) || 0) +
          (parseInt(results[lastStudentIndex]?.admissionFee) || 0) +
          (parseInt(results[lastStudentIndex]?.fine) || 0) +
          (parseInt(results[lastStudentIndex]?.securityDeposit) || 0) :
      
          (MonthlyFeeDetails ? 
              (parseInt(results[lastStudentIndex].previousDue) || 0) +
              (parseInt(results[lastStudentIndex]?.MonthlyFeeDetails) || 0) +
              (parseInt(results[lastStudentIndex]?.fine) || 0) +
              (parseInt(results[lastStudentIndex]?.securityDeposit) || 0) :
      
              (annualCharges ? 
                  (parseInt(results[lastStudentIndex].previousDue) || 0) +
                  (parseInt(results[lastStudentIndex]?.annualCharges) || 0) +
                  (parseInt(results[lastStudentIndex]?.fine) || 0) +
                  (parseInt(results[lastStudentIndex]?.securityDeposit) || 0) +
                  (parseInt(miscAmount) || 0) :
      
                  (admissionFee ? 
                      (parseInt(results[lastStudentIndex].previousDue) || 0) +
                      (parseInt(results[lastStudentIndex]?.admissionFee) || 0) +
                      (parseInt(results[lastStudentIndex]?.fine) || 0) +
                      (parseInt(results[lastStudentIndex]?.securityDeposit) || 0) +
                      (parseInt(miscAmount) || 0) :
                      0
                  )
              )
          )),
        paymentStatus1: `${results[lastStudentIndex].paymentStatus}`,
        feeMonth1: `${results[lastStudentIndex].feeMonth}`,
        tutionFee1: `${results[lastStudentIndex]?.MonthlyFeeDetails}`,
        fine1: 0,
        securityDeposit1: `${results[lastStudentIndex]?.securityDeposit}`,
        class1: `${results[lastStudentIndex].classs}`,
        admissionFee1: `${results[lastStudentIndex]?.admissionFee}`,
        annualCharges1: `${results[lastStudentIndex]?.annualCharges}`,
        miscAmount: miscAmount,
        miscDescription: miscDescription,
        feeMonth: feeMonth
      };
      
      // usersData.push(lastUserData);
      const additionalHtmlContent =  await renderEjsTemplate(ejsTemplatePath2, { user: lastUserData })
      htmlContents.pop()
      htmlContents.push(additionalHtmlContent)

    }

    

    // Generate combined PDF with HTML contents
    await generateCombinedPDF(htmlContents, pdfFilePath);

    res.status(200).json('Success');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
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
          margin-left: 4em;
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




const downloadChallan= (async (req, res) => {
  const { fileName } = req.params;
  const filePath = `./challans/${fileName}`;

  // Set response headers
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);

  // Pipe the PDF to the response
  fs.createReadStream(filePath).pipe(res);
});

const generateAllChallans = (async (req, res) => {

      
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




const getPaidStudents =((req,res) => {
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

const unpaid = (async(req,res)=>{
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


module.exports={
  feeCollectionReport,
  unpaid,
  modifyMonthlyFee,
  individualFeeCollectionReport,
  getFeeDetails,
  getFeeDetailsP,
  ModifyPreviousDues,
  collectFee,
  getFeeDetailsFeeHistory,
  getStudents,getStudentFeeDetails,payFee,getFeeDetails2,overallFeeDetails,generateChallan,downloadChallan,getPaidStudents,generateAllChallans
}