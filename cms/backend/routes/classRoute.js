const express = require("express");
const router = express.Router();
const db = require("../db");


router.get('/class_names', (req, res) => {
    // Query to select all records from the class_names table
    const query = 'SELECT * FROM class_names';
  
    // Use the connection pool to execute the query
    db.query(query, (error, results) => {
      if (error) {
        // If there's an error, send an error response
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
  
      // If successful, send the fetched records as a JSON response
      res.json(results);
    });
  });

  module.exports = router