const dotenv = require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const userRoute = require("./routes/userRoute");
const feeRoute = require("./routes/feeRoute");
const expenseRoute = require("./routes/expenseRoute");
const timeTableRoute = require("./routes/timeTableRouter");
const classRoute = require("./routes/classRoute.js")
// const  verifyToken =require('./middleware/authMiddleware.js');
const authRoute = require('./routes/authRoute.js');

const cookieParser = require("cookie-parser");


const cors = require("cors");
const { verifyToken } = require("./middleware/authMiddleware.js");


const app = express();


app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://school-management-system-frontend.vercel.app',
      'http://localhost:3002',
      'http://localhost:3001',
    ],
    credentials: true,
  })
);
// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes Middleware
app.use('/api/users', userRoute);
app.use('/api/fee', feeRoute);
app.use('/api/timeTable', timeTableRoute);
app.use('/api/expense', expenseRoute);
app.use('/auth', authRoute);
app.use('/api/class', classRoute);
// app.use("/api/class",cla)
// Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});
const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
