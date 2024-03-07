const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { getExpenseType, transfers, getExpenseType2, getExpenseForToday, expenses, postTransfer, getAccountTypes, getExpenseTypes, getExpense, reverseExpense, postExpense, getExpenseByID, balanceChange, checkExpense, balanceChangeHistoryMonth, balanceChangeHistoryToday, postLoans, getSpecificLoan, getLoanData, getLoanDataMonth, getExpensesForToday, getExpensesForSpecificDate, getExpenseForSpecificMonth, getExpensesByAcctType, getExpenseByExpenseType } = require("../controllers/expenseController");


router.get('/expense-types/:exp_type_id',asyncHandler(getExpenseType));
router.get('/transfers',asyncHandler(transfers));  
router.get('/expense-types/:exp_type_id',asyncHandler(getExpenseType2));
router.get('/transfers/today',asyncHandler( getExpenseForToday));
router.get('/expenses',asyncHandler(expenses));
router.post('/transfers',asyncHandler( postTransfer));
router.get("/account_types",asyncHandler(getAccountTypes))
router.get("/expense_types",asyncHandler(getExpenseTypes))
router.post("/expenses/:expense_id",asyncHandler(getExpense))
router.put('/expense_reversal/:expense_id',asyncHandler(reverseExpense));
router.post('/expenses',asyncHandler( postExpense));
router.get('/expenses/:exp_type_id',asyncHandler(getExpenseByID))
router.post('/insert_balance_change',asyncHandler(balanceChange));
router.get('/check_exp_id/:exp_id',asyncHandler( checkExpense));
router.get('/balance_change_history_month',asyncHandler( balanceChangeHistoryMonth));
router.get('/balance_change_history_today',asyncHandler( balanceChangeHistoryToday));
router.post('/loans',asyncHandler( postLoans));
router.get('/loans/:exp_id',asyncHandler(getSpecificLoan));
router.get('/loan_data',asyncHandler( getLoanData));
router.get('/loan_data_month',asyncHandler(getLoanDataMonth));
router.get('/today',asyncHandler(getExpensesForToday));
router.get('/:date/:month/:year',asyncHandler( getExpensesForSpecificDate));
router.get('/:month/:year',asyncHandler( getExpenseForSpecificMonth));
router.get('/expenses_by_account_type/:month/:year/:Acct_type_id',asyncHandler(getExpensesByAcctType));
router.get('/expenses_by_expense_type/:month/:year/:expense_type_id',asyncHandler( getExpenseByExpenseType));
module.exports=router