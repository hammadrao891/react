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

  // Use the connection pool to execute the query
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
})
module.exports={feeCollectionReport,
individualFeeCollectionReport}