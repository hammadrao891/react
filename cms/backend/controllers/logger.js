// logger.js
const  db = require('../db.js');

 const logAction = async (userId, action) => {
  try {
    await new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO logs (user_id, action) VALUES (?, ?)',
        [userId, action],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  } catch (error) {
    console.error('Logging Error:', error);
  }
};

module.exports=logAction