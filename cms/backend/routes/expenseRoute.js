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
        res.status(404).json({ error: 'Expense type not found' });
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
        res.status(404).json({ error: 'Expense type not found' });
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
    const selectQuery = `SELECT expense_amount, Acct_type_id FROM expenses WHERE exp_type_id = ?`;
  
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
    console.log(expenseData)
    // SQL query to insert expense data into the expense table
    const query = 'INSERT INTO expenses SET ?';
  
    // Execute the query with the expense data
    db.query(query, expenseData, (error, results, fields) => {
      if (error) {
        console.error('Error inserting data into expense table: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
    
      console.log('Expense data inserted successfully');
      res.status(200).json({ message: 'Expense data inserted successfully' });
    });
  });
  router.post('/expenses/add', (req, res) => {
    // Assuming the request body contains the expense data
    const expenseData = req.body;
  console.log(expenseData)
    // Check if expense_pay_account exists and get the corresponding current balance
    const checkBalanceQuery = 'SELECT current_Bal FROM account_types WHERE Acct_type_id = ?';
    db.query(checkBalanceQuery, [expenseData.Acct_type_id], (error, results, fields) => {
      if (error) {
        console.error('Error fetching current balance: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      // Check if current balance is sufficient for the expense
      const currentBalance = results[0].current_Bal;
      if (currentBalance < expenseData.expense_amount) {
        res.status(200).json({ error: 'Insufficient balance in the expense pay account' });
        return;
      }
  
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
        });
      });
    });
  });
  

  router.get('/expenses/:exp_type_id', (req, res) => {
    const exp_type_id = req.params.exp_type_id;
    
    // SQL query to find expense and retrieve expense_type_name and Acct_type_name
    const query = `
      
    SELECT e.*, et.expense_type_name, at.Acct_type_name 
    FROM expenses e
    JOIN expense_types et ON e.expense_type_id = et.expense_type_id
    JOIN account_types at ON e.Acct_type_id = at.Acct_type_id
    WHERE e.exp_type_id = ?
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
  
module.exports=router