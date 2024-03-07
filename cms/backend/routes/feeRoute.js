const express = require("express");
const { feeCollectionReport, individualFeeCollectionReport, modifyMonthlyFee, getFeeDetailsP, ModifyPreviousDues, collectFee, getFeeDetailsFeeHistory, getStudents, getStudentFeeDetails, payFee, getFeeDetails2, overallFeeDetails, generateChallan, downloadChallan, generateAllChallans, unpaid } = require("../controllers/feeController");
const { getFeeDetails } = require("../controllers/feeController");
const router = express.Router();
const asyncHandler = require("express-async-handler")


router.get('/last-fee/:regNum',asyncHandler(getStudentFeeDetails))
router.get('/students/:regNum/fee',asyncHandler(individualFeeCollectionReport))
router.get('/students/fee',asyncHandler( feeCollectionReport))
router.get('/student-details/:regNum',asyncHandler(getFeeDetails))
router.get('/student-details-previousDue/:regNum',asyncHandler(getFeeDetailsP))
router.put('/update-monthly-fee/:regNum',asyncHandler(modifyMonthlyFee))
router.put('/update-previous-due/:regNum',asyncHandler(ModifyPreviousDues))
router.put('/collect-fee/:regNum',asyncHandler(collectFee))
router.get("/student-fee-history/:regNum",asyncHandler(getFeeDetailsFeeHistory))
router.get("/getStudents",asyncHandler(getStudents))
router.post("/payFee",asyncHandler(payFee))
router.get("/getFeeDetails/:studentId/:month/:year",asyncHandler(getFeeDetails2))
router.get("/overallFeeDetails/:studentId",asyncHandler(overallFeeDetails))
router.post("/generateFeeChallan/",asyncHandler(generateChallan))
router.post("/downloadChallan/:filename",asyncHandler(downloadChallan))
router.get("/unpaid",asyncHandler(unpaid))
router.post("/downloadChallanForAll/",asyncHandler(generateAllChallans))










module.exports=router