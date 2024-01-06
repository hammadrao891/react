const express = require("express");
const db = require("../db");
const { feeCollectionReport, individualFeeCollectionReport } = require("../controllers/feeController");
const router = express.Router();



router.get('/students/:regNum/fee', individualFeeCollectionReport)
router.get('/students/fee', feeCollectionReport)
module.exports=router