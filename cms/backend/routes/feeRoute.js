const express = require("express");
const db = require("../db");
const { feeCollectionReport, individualFeeCollectionReport, modifyMonthlyFee, getFeeDetailsP, ModifyPreviousDues, collectFee, getFeeDetailsFeeHistory, getStudents, getStudentFeeDetails } = require("../controllers/feeController");
const { getFeeDetails } = require("../controllers/feeController");
const router = express.Router();


router.get('/last-fee/:regNum',getStudentFeeDetails)
router.get('/students/:regNum/fee', individualFeeCollectionReport)
router.get('/students/fee', feeCollectionReport)
router.get('/student-details/:regNum',getFeeDetails)
router.get('/student-details-previousDue/:regNum',getFeeDetailsP)
router.put('/update-monthly-fee/:regNum',modifyMonthlyFee)
router.put('/update-previous-due/:regNum',ModifyPreviousDues)
router.put('/collect-fee/:regNum',collectFee)
router.get("/student-fee-history/:regNum",getFeeDetailsFeeHistory)
router.get("/getStudents",getStudents)











module.exports=router