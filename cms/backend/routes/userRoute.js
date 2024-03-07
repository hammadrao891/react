const express = require("express");
const router = express.Router();
const {
  registerUser,
  getUsers,
  markAttendance,
  checkAttendance,
  getCLassStudent,
  checkClassAttendance,
  getStudentByRegNum,
  updateStudent,
  updateStudentClass,
  updateWholeClass,
  updateDOB,
  UpdateAdmissionDate,
  terminateStudent,
} = require("../controllers/userController");
const asyncHandler = require("express-async-handler")


router.post("/register",asyncHandler( registerUser));
router.get("/",asyncHandler(getUsers))
router.post("/markAttendance",asyncHandler(markAttendance))
router.get("/checkAttendance/:date",asyncHandler(checkAttendance))
router.get("/getClassStudents/:classs",asyncHandler(getCLassStudent))
router.get("/checkClassAttendance/:classs/:startDate/:endDate",asyncHandler(checkClassAttendance))
router.get("/getStudentByRegNum/:regNum",asyncHandler(getStudentByRegNum))
router.put('/students/:regNum',asyncHandler( updateStudent))
router.put('/updateClass/:regNum/:classs',asyncHandler(updateStudentClass))
router.put('/update-class/:classs',asyncHandler(updateWholeClass))
router.put('/updateDob/:regNum',asyncHandler(updateDOB))
router.put('/updateAdmissionDate/:regNum',asyncHandler(UpdateAdmissionDate))
router.delete('/terminateStudent/:regNum',asyncHandler(terminateStudent))

module.exports = router;
