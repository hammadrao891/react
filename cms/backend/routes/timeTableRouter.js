const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const { getClasses, updateClasses, getWeekClasses, getSpecificClass, insertClass, checkClassMatch, classOccurences, checkClassTeacher, checkClassTeacherForUpdation, addTeacher, getTeachers } = require("../controllers/timeTableController");


router.get('/classes/monday',asyncHandler(getClasses))
router.put('/classes/monday',asyncHandler(updateClasses));
router.get('/classes/week',asyncHandler( getWeekClasses));
router.get('/classes/:classs',asyncHandler( getSpecificClass));
router.post('/insert-classes',asyncHandler(insertClass));
router.post('/check-class-match',asyncHandler(checkClassMatch));
router.get('/class-occurrences',asyncHandler(classOccurences));
router.get('/checkClassTeacher/:teacherId',asyncHandler(checkClassTeacher));
router.get('/checkClassTeacherForUpdation/:teacherName/:classs',asyncHandler(checkClassTeacherForUpdation));
router.post('/addTeacher',asyncHandler(addTeacher));
router.get('/getTeachers',asyncHandler( getTeachers));



module.exports = router