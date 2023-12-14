const express = require('express');
const path = require('path');
const ejs = require('ejs');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.join(__dirname, 'views')); // Set the views directory

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/apply-color', (req, res) => {
  const color = req.body.color;

  // Render the result view and pass the color as a variable
  res.render('exp', { color });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
