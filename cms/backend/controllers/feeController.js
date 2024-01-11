const asyncHandler = require("express-async-handler");
const  db  = require("../db");



const individualFeeCollectionReport =asyncHandler( (req, res) => {
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

const feeCollectionReport =asyncHandler( (req, res) => {
    const regNum = req.params.regNum;
  
    const query = `
    SELECT fee.previousDue, fee.totalAmountDue, fee.paymentStatus, students.name
    FROM fee
    JOIN students ON fee.regNum = students.regNum
  `;

  // Use the connection db to execute the query
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
})

const getFeeDetailsP = asyncHandler(async(req, res) => {
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

const getFeeDetailsFeeHistory = asyncHandler(async(req, res) => {
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
const getStudents = asyncHandler(async(req, res) => {
  
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


const getFeeDetails = asyncHandler(async(req, res) => {
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

const modifyMonthlyFee = asyncHandler((req, res) => {
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
const ModifyPreviousDues = asyncHandler((req, res) => {
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


const collectFee = asyncHandler((req, res) => {
  const regNum = req.params.regNum;
const { feeMonth, paymentStatus, previousDue, totalAmountDue, paidAmount } = req.body;

const sql = 'INSERT INTO fee (regNum, feeMonth, paymentStatus, previousDue, totalAmountDue, paidAmount) VALUES (?, ?, ?, ?, ?, ?)';
const values = [regNum, feeMonth, paymentStatus, previousDue, totalAmountDue, paidAmount];

db.query(sql, values, (updateErr, updateResult) => {
  if (updateErr) {
    console.error('Error inserting into fee table:', updateErr);
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  if (updateResult.affectedRows === 0) {
    return res.status(404).json({ error: 'Student not found' });
  }

  res.json({ message: 'Fee details inserted successfully' });
});

});


module.exports={feeCollectionReport,
  modifyMonthlyFee,
individualFeeCollectionReport,
getFeeDetails,
getFeeDetailsP,
ModifyPreviousDues,
collectFee,
getFeeDetailsFeeHistory,
getStudents
}