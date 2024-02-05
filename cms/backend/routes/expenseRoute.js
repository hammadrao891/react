const express = require("express");
const router = express.Router();
const db = require("../db");


router.get('/expense-types/:exp_type_id', (req, res) => {
    const exp_type_id = req.params.exp_type_id;
    const query = `
      SELECT at.Acct_type_name
      FROM account_types at
      JOIN expense_types et ON at.Acct_type_id = et.Acct_type_id
      WHERE et.exp_type_id = ?;
    `;
  
    db.query(query, [exp_type_id], (err, results) => {
      if (err) {
        console.error('Error executing MySQL query: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      if (results.length === 0) {
        res.status(404).json({ error: 'Expense exp_type_id not found' });
        return;
      }
  
      res.json(results[0]);
    });
  });
  router.get('/transfers', (req, res) => {
    // SQL query to select all data from transfers table
    const query = `
    SELECT t.*, 
           af.Acct_type_name AS transfer_account_from_name, 
           at.Acct_type_name AS transfer_account_to_name
    FROM transfer t
    JOIN account_types af ON t.transfer_account_from = af.Acct_type_id
    JOIN account_types at ON t.transfer_account_to = at.Acct_type_id
  `;

  // Execute the query
  db.query(query, (error, results, fields) => {
    if (error) {
      console.error('Error fetching data from transfers table: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
  
      // Send the results as JSON response
      res.json(results);
    });
  });
  
  
router.get('/expense-types/:exp_type_id', (req, res) => {
    const exp_type_id = req.params.exp_type_id;
    const query = `
      SELECT at.Acct_type_name
      FROM account_types at
      JOIN expense_types et ON at.Acct_type_id = et.Acct_type_id
      WHERE et.exp_type_id = ?;
    `;
  
    db.query(query, [exp_type_id], (err, results) => {
      if (err) {
        console.error('Error executing MySQL query: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      if (results.length === 0) {
        res.status(404).json({ error: 'Expense exp_type_id not found' });
        return;
      }
  
      res.json(results[0]);
    });
  });
  router.get('/transfers/today', (req, res) => {
    // SQL query to select all data from transfers table
    const today = new Date().toISOString().split('T')[0];
  
    // SQL query to select transfer records for today only
    const query = `
      SELECT t.*, 
             af.Acct_type_name AS transfer_account_from_name, 
             at.Acct_type_name AS transfer_account_to_name
      FROM transfer t
      JOIN account_types af ON t.transfer_account_from = af.Acct_type_id
      JOIN account_types at ON t.transfer_account_to = at.Acct_type_id
      WHERE DATE(t.transfer_record_time) = ?
    `;
  
    // Execute the query with today's date
    db.query(query, [today], (error, results, fields) => {
      if (error) {
        console.error('Error fetching data from transfers table: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
    
      // Send the results as JSON response
      res.json(results);
    });
  });
  router.get('/expenses', (req, res) => {
    const query = `
      SELECT 
          e.expense_record_time,
          e.expense_desc,
          e.expense_amount,
          e.expense_pay_person,
          e.invoice_no,
          e.invoice_file_no,
          e.expense_pay_account,
          at.Acct_type_name AS account_type_name,
          et.expense_type_name
      FROM 
          expenses e
      JOIN 
          account_types at ON e.Acct_type_id = at.Acct_type_id
      JOIN 
          expense_types et ON e.expense_type_id = et.expense_type_id;
    `;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error executing MySQL query: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      res.json(results);
    });
  });
  // API endpoint to insert transfer data
router.post('/transfers', (req, res) => {
    
    const transferData = req.body;
  
    // Check if transfer_amount is greater than current_Bal for transfer_account_from
    const checkFromBalanceQuery = 'SELECT current_Bal FROM account_types WHERE Acct_type_id = ?';
    db.query(checkFromBalanceQuery, [transferData.transfer_account_from], (error, results, fields) => {
      if (error) {
        console.error('Error checking current balance for transfer_account_from: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      const fromCurrentBal = results[0].current_Bal;
      if (fromCurrentBal < transferData.transfer_amount) {
        res.status(200).json({ error: 'Insufficient balance in sending account' });
        return;
      }
    
      // Update current_Bal for transfer_account_from
      const updateFromBalanceQuery = `
      UPDATE account_types 
      SET 
        current_Bal = CASE 
            WHEN Acct_type_id = ? THEN current_Bal - ?
            ELSE current_Bal
        END,
        Current_Bal_Date = CASE 
            WHEN Acct_type_id = ? THEN ?
            ELSE Current_Bal_Date
        END
      WHERE Acct_type_id IN (?, ?)
    `;
    
    db.query(updateFromBalanceQuery, [transferData.transfer_account_from, transferData.transfer_amount, transferData.transfer_account_from, transferData.transfer_record_time, transferData.transfer_account_from, transferData.transfer_account_to], (error, results, fields) => {
      if (error) {
        console.error('Error updating balances for transfer_accounts: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
        // Insert transfer data into the transfer table
        const insertTransferQuery = 'INSERT INTO transfer SET ?';
        db.query(insertTransferQuery, transferData, (error, results, fields) => {
          if (error) {
            console.error('Error inserting data into transfer table: ', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
          }
        
          // Update current_Bal for transfer_account_to
          const updateFromBalanceQuery = `
          UPDATE account_types 
          SET 
            current_Bal = CASE 
                WHEN Acct_type_id = ? THEN current_Bal + ?
                ELSE current_Bal
            END,
            Current_Bal_Date = CASE 
                WHEN Acct_type_id = ? THEN ?
                ELSE Current_Bal_Date
            END
          WHERE Acct_type_id IN (?, ?)
        `;
        
        db.query(updateFromBalanceQuery, [transferData.transfer_account_to, transferData.transfer_amount, transferData.transfer_account_to, transferData.transfer_record_time, transferData.transfer_account_to, transferData.transfer_account_from], (error, results, fields) => {
          if (error) {
            console.error('Error updating balances for transfer_accounts: ', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
          }
  
            console.log('Transfer data inserted successfully');
            res.status(200).json({ message: 'Transfer data inserted successfully' });
          });
        });
      });
    });
  });



  router.get("/account_types",(req,res)=>{
    const query = 'SELECT * FROM account_types';
  
    db.query(query,(err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        
        res.json(results);
      }
    });
  })


  router.get("/expense_types",(req,res)=>{
    const query = 'SELECT * FROM expense_types';
  
    db.query(query,(err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        
        res.json(results);
      }
    });
  })

  router.post("/expenses/:expense_id",(req,res)=>{
    const query = 'SELECT * FROM expense_types';
  
    db.query(query,(err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        
        res.json(results);
      }
    });
  })

  router.put('/expense_reversal/:expense_id', (req, res) => {
    const expenseId = req.params.expense_id;

    // Retrieve expense_amount and Acct_type_id based on expense_id
    const selectQuery = `SELECT expense_amount, Acct_type_id FROM expenses WHERE exp_type_id  = ?`;

    db.query(selectQuery, [expenseId], (error, results) => {
        if (error) {
            console.error('Error retrieving expense data: ', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ error: 'Expense not found' });
            return;
        }

        const expenseAmount = results[0].expense_amount;
        const acctTypeId = results[0].Acct_type_id;

        // Update expense_reversal to 1
        const updateExpenseQuery = `UPDATE expenses SET expense_reversal = 1 WHERE exp_type_id = ?`;

        db.query(updateExpenseQuery, [expenseId], (error) => {
            if (error) {
                console.error('Error updating expense: ', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            // Update current_Bal in account_types table
            const updateAccountQuery = `UPDATE account_types SET current_Bal = current_Bal + ? WHERE Acct_type_id = ?`;

            db.query(updateAccountQuery, [expenseAmount, acctTypeId], (error) => {
                if (error) {
                    console.error('Error updating account balance: ', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }

                res.status(200).json({ message: 'Expense updated successfully' });
            });
        });
    });
});
router.post('/expenses', (req, res) => {
    // Assuming the request body contains the expense data
    const expenseData = req.body;

    // Check if expense_pay_account exists and get the corresponding current balance
    const checkBalanceQuery = 'SELECT current_Bal, Acct_type_name FROM account_types WHERE Acct_type_id = ?';
    db.query(checkBalanceQuery, [expenseData.Acct_type_id], (error, results, fields) => {
        if (error) {
            console.error('Error fetching current balance: ', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        
        const Acct_type_name=(results[0])

        // Check if current balance is sufficient for the expense
        const currentBalance = results[0].current_Bal;
        if (currentBalance < expenseData.expense_amount) {
            res.status(200).json({ error: 'Insufficient balance in the expense pay account' });
            return;
        }
        const checkBalanceQuery = 'SELECT expense_type_name FROM expense_types WHERE expense_type_id = ?';
        db.query(checkBalanceQuery, [expenseData.expense_type_id], (error, results, fields) => {
            if (error) {
                console.error('Error fetching current balance: ', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            const expense_type_id = results[0].expense_type_name
        // Update current balance by deducting the expense amount
        const updateBalanceQuery = 'UPDATE account_types SET current_Bal = current_Bal - ? WHERE Acct_type_id = ?';
        db.query(updateBalanceQuery, [expenseData.expense_amount, expenseData.Acct_type_id], (error, results, fields) => {
            if (error) {
                console.error('Error updating current balance: ', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            // Insert expense data into the expense table
            const insertExpenseQuery = 'INSERT INTO expenses SET ?';
            db.query(insertExpenseQuery, expenseData, (error, results, fields) => {
                if (error) {
                    console.error('Error inserting data into expense table: ', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }

                console.log('Expense data inserted successfully');
                res.status(200).json({ message: 'Expense data inserted successfully' });

                // Check if Acct_type_name is "STAFF LOAN"
                // const expense_type = Acct_type_name;
                if (expense_type_id === "STAFF LOAN") {
                    // Insert data into loans table
                    const insertLoanQuery = `INSERT INTO loans (return_amount, return_status, exp_id, loan_desc, remaining_amount) 
                                             VALUES (?, ?, (SELECT MAX(exp_type_id) FROM expenses), ?, ?)`;
                    const loanData = [
                        expenseData.expense_amount,
                        "NOT PAID",
                        expenseData.expense_desc,
                        expenseData.expense_amount
                    ];
                    db.query(insertLoanQuery, loanData, (error, results, fields) => {
                        if (error) {
                            console.error('Error inserting data into loans table: ', error);
                            return;
                        }
                        console.log('Loan data inserted successfully');
                    });
                }
            });
            })
        });
    });
});

  

  router.get('/expenses/:exp_type_id', (req, res) => {
    const exp_type_id = req.params.exp_type_id;
    
    // SQL query to find expense and retrieve expense_type_name and Acct_type_name
    const query = `
      
    SELECT e.*, et.expense_type_name, at.Acct_type_name, at.current_Bal
    FROM expenses e
    JOIN expense_types et ON e.expense_type_id = et.expense_type_id
    JOIN account_types at ON e.Acct_type_id = at.Acct_type_id
    WHERE e.exp_type_id = ?;
    
    `;
  
    // Execute the query with exp_type_id
    db.query(query, [exp_type_id], (error, results, fields) => {
      if (error) {
        console.error('Error finding expenses: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      // Send the results as JSON response
      res.json(results);
    });})


    router.post('/insert_balance_change', (req, res) => {
      const { Acct_type_id, balance_before, balance_after, expense_amount, time, expense_type_id,exp_type_id } = req.body;
      console.log(req.body)
      // SQL query to insert data into balance_change_history table
      const insertQuery = `
        INSERT INTO balance_change_history (Acct_type_id, balance_before, balance_after, expense_amount, time, expense_type_id,exp_type_id)
        VALUES (?, ?, ?, ?, ?, ?,?)
      `;
      const insertParams = [Acct_type_id, balance_before, balance_after, expense_amount, time, expense_type_id,exp_type_id];
    
      // SQL query to update current_Bal in account_types table
      const updateQuery = `
        UPDATE account_types
        SET current_Bal = ?
        WHERE Acct_type_id = ?
      `;
      const updateParams = [balance_after, Acct_type_id];
    
      // Execute both queries in a transaction
      db.beginTransaction(err => {
        if (err) {
          console.error('Error beginning transaction: ' + err);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
    
        // Insert data into balance_change_history table
        db.query(insertQuery, insertParams, (err, results) => {
          if (err) {
            db.rollback(() => {
              console.error('Error inserting into balance_change_history: ' + err);
              res.status(500).json({ error: 'Internal server error' });
            });
            return;
          }
    
          // Update current_Bal in account_types table
          db.query(updateQuery, updateParams, (err, results) => {
            if (err) {
              db.rollback(() => {
                console.error('Error updating current_Bal in account_types: ' + err);
                res.status(500).json({ error: 'Internal server error' });
              });
              return;
            }
    
            // Commit transaction
            db.commit(err => {
              if (err) {
                db.rollback(() => {
                  console.error('Error committing transaction: ' + err);
                  res.status(500).json({ error: 'Internal server error' });
                });
                return;
              }
              console.log('Transaction successfully committed.');
              res.status(200).json({ message: 'Data inserted and current_Bal updated successfully' });
            });
          });
        });
      });
    
});

router.get('/check_exp_id/:exp_id', (req, res) => {
  const { exp_id } = req.params;

  // SQL query to check if exp_id exists in balance_change_history
  const query = `
    SELECT COUNT(*) AS count FROM balance_change_history WHERE exp_type_id = ?
  `;
  const params = [exp_id];

  db.query(query, params, (err, results) => {
    if (err) {
      console.error('Error checking exp_id: ' + err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    const count = results[0].count;

    if (count > 0) {
      // exp_id exists in balance_change_history
      res.status(200).json({ exists: true });
    } else {
      // exp_id does not exist in balance_change_history
      res.status(200).json({ exists: false });
    }
  });
});
  

router.get('/balance_change_history_month', (req, res) => {
 

// Parse the time string to a Date object
const timeDate = new Date();

var month
if(timeDate.getMonth() < 9){
 month = "0" + (timeDate.getMonth() + 1) ;
}
else
month = (timeDate.getMonth() + 1) ;
console.log(month)

  const query = `
    SELECT b.*, at.Acct_type_name, et.expense_type_name
    FROM balance_change_history b
    JOIN account_types at ON b.Acct_type_id = at.Acct_type_id
    JOIN expense_types et ON b.expense_type_id = et.expense_type_id
    WHERE CONCAT(SUBSTRING(time, 4, 1), SUBSTRING(time, 5, 1)) = ?;
  `;

  db.query(query, month,(error, results) => {
    if (error) {
      console.error('Error executing query: ' + error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.status(200).json(results);
  });
});

router.get('/balance_change_history_today', (req, res) => {
  // Your time field value

// Parse the time string to a Date object
const timeDate = new Date();

// Get the month part (add 1 because months are zero-indexed)
var day
if(timeDate.getDate() < 9){
 day = "0" + timeDate.getDate() ;
}
else
{day =  timeDate.getDate() ;}
console.log(day)

  const query = `
    SELECT b.*, at.Acct_type_name, et.expense_type_name
    FROM balance_change_history b
    JOIN account_types at ON b.Acct_type_id = at.Acct_type_id
    JOIN expense_types et ON b.expense_type_id = et.expense_type_id
    WHERE CONCAT(SUBSTRING(time, 1, 1), SUBSTRING(time, 2, 1)) = ?;
  `;

  db.query(query, day,(error, results) => {
    if (error) {
      console.error('Error executing query: ' + error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.status(200).json(results);
  });
});
router.post('/loans', (req, res) => {
  const loanData = req.body;
console.log(loanData)

// const checkQuery =`SELECT COUNT(*) AS count_exp_id
// FROM loans
// WHERE exp_id = ?;
// `
// db.query(checkQuery, loanData.exp_type_id, (error, results) => {
//   if (error) {
//     console.error('Error ', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//     return;
//   }
  // console.log(results[0])
  // SQL query to insert data into the loans table
  const insertLoanQuery = `
    INSERT INTO loans (exp_id,return_date, return_status, remaining_amount, paid_amount,return_amount,loan_desc)
    VALUES (?, ?, ?, ?,?,?,?)
  `;
  const updateLoanQuery=` UPDATE loans
  SET return_date = ?,
      return_status = ?,
      remaining_amount = ?,
      paid_amount = ?,
      return_amount = ?,
      loan_desc = ?
  WHERE exp_id = ?`

  const loanValues = [loanData.exp_type_id,loanData.return_date,loanData.return_status, loanData.remaining_amount, loanData.paid_amount,loanData.return_amount,loanData.expense_desc];

  const updateLoanValues = [loanData.return_date,loanData.return_status, loanData.remaining_amount, loanData.paid_amount,loanData.return_amount,loanData.expense_desc,loanData.exp_type_id]

  // Execute the SQL query
  db.query(updateLoanQuery, updateLoanValues, (error, results) => {
    if (error) {
      console.error('Error inserting data into loans table: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    console.log('Loan data inserted successfully');
    res.status(200).json({ message: 'Loan data inserted successfully' });
  });
});
// })
router.get('/loans/:exp_id', (req, res) => {
  const exp_id = req.params.exp_id;

  // Query to fetch the latest expense details
  const query = `SELECT 
  e.exp_type_id,
  e.expense_desc,
  e.expense_amount,
  e.expense_record_time,
  et.expense_type_name,
  l.return_amount,
  l.return_status,
  l.remaining_amount
FROM 
  expenses e
LEFT JOIN 
  expense_types et ON e.expense_type_id = et.expense_type_id
LEFT JOIN 
  loans l ON e.exp_type_id = l.exp_id
WHERE 
  e.exp_type_id = ?
ORDER BY 
  l.id DESC
LIMIT 1;

    
  `;

  // Execute the query
  db.query(query, [exp_id], (err, results) => {
    if (err) {
      console.error('Error fetching expense details: ', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Expense not found' });
      return;
    }
    res.json(results[0]); // Return the latest expense details
  });
});

router.get('/loan_data', (req, res) => {
  const expId = req.params.expId;

  // SQL query to retrieve data from loans and expenses tables
  const query = `
    SELECT 
        l.*,
        e.expense_type_id,
        et.expense_type_name,
        e.Acct_type_id,
        e.expense_record_time,
        at.Acct_type_name
    FROM 
        loans l
    LEFT JOIN 
        expenses e ON l.exp_id = e.exp_type_id
    LEFT JOIN 
        expense_types et ON e.expense_type_id = et.expense_type_id
    LEFT JOIN 
        account_types at ON e.Acct_type_id = at.Acct_type_id
  `;

  // Execute the SQL query
  db.query(query, [expId], (error, results) => {
    if (error) {
      console.error('Error fetching data from loans and expenses tables: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.status(200).json(results);
  });
});

router.get('/loan_data_month', (req, res) => {

  const timeDate = new Date();

  var month
  if(timeDate.getMonth() < 9){
   month = "0" + (timeDate.getMonth() + 1) ;
  }
  else
  month = (timeDate.getMonth() + 1) ;
  console.log(month)
  
  // SQL query to retrieve data from loans and expenses tables
  const query = `
  SELECT 
  l.*,
  e.expense_type_id,
  et.expense_type_name,
  e.Acct_type_id,
  e.expense_record_time,
  at.Acct_type_name
FROM 
  loans l
LEFT JOIN 
  expenses e ON l.exp_id = e.exp_type_id
LEFT JOIN 
  expense_types et ON e.expense_type_id = et.expense_type_id
LEFT JOIN 
  account_types at ON e.Acct_type_id = at.Acct_type_id
WHERE 
  MONTH(STR_TO_DATE(SUBSTRING_INDEX(l.return_date, ' ', 1), '%d-%m-%Y')) = MONTH(CURRENT_DATE())
  AND YEAR(STR_TO_DATE(SUBSTRING_INDEX(l.return_date, ' ', 1), '%d-%m-%Y')) = YEAR(CURRENT_DATE());

  `;

  // Execute the SQL query
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching data from loans and expenses tables: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.status(200).json(results);
  });
});
module.exports=router