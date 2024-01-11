const express = require("express");
const router = express.Router();
const {
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
  terminateStudent,
} = require("../controllers/userController");
// const protect = require("../middleWare/authMiddleware");
// const User = require("../models/userModel")


router.post("/register", registerUser);
router.get("/",getUsers)
router.post("/markAttendance",markAttendance)
router.get("/unpaid",unpaid)
router.get("/checkAttendance/:date",checkAttendance)
router.post("/payFee",payFee)
router.get("/getFeeDetails/:studentId/:month/:year",getFeeDetails)
router.get("/overallFeeDetails/:studentId",overallFeeDetails)
router.post("/generateFeeChallan/",generateChallan)
router.post("/downloadChallan/:filename",downloadChallan)
router.post("/downloadChallanForAll/",generateAllChallans)
router.get("/getClassStudents/:classs",getCLassStudent)
router.get("/checkClassAttendance/:classs/:startDate/:endDate",checkClassAttendance)
router.get("/getStudentByRegNum/:regNum",getStudentByRegNum)
router.get("/getPaidStudents",getPaidStudents)
router.put('/students/:regNum', updateStudent)
router.put('/updateClass/:regNum/:classs',updateStudentClass)
router.put('/update-class/:classs',updateWholeClass)
router.put('/updateDob/:regNum',updateDOB)
router.put('/updateAdmissionDate/:regNum',UpdateAdmissionDate)
router.delete('/terminateStudent/:regNum',terminateStudent)
module.exports = router;
