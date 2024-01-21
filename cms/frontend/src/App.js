import { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Forgot from "./pages/auth/Forgot";
import Reset from "./pages/auth/Reset";
import Dashboard from "./pages/dashboard/Dashboard";
import Sidebar from "./components/sidebar/Sidebar";
import Layout from "./components/layout/Layout";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddTender from "./pages/addTender/AddTender";
import AddStudent from "./pages/AddStudent";
import StudentInfo from "./pages/StudentInfo";
import CheckStudentInfo from "./pages/CheckStudentInfo";
import UpdateStudent from "./pages/UpdateStudent";
import UpdateLog from "./pages/UpdateLog";
import UpdateOptions from "./pages/UpdateOptions";
import UpdateStudentClass from "./pages/UpdateStudentClass";
import TransferWholeClass from "./pages/TransferWholeClass";
import UpdateDOB from "./pages/UpdateDOB";
import UpdateAdmissionDate from "./pages/UpdateAdmissionDate";
import TerminateStudent from "./pages/TermiateStudent";
import FeeCollectionAndModification from "./pages/FeeCollectionAndModification";
import CollectFee from "./pages/ColllectFee";
import GenerateSingleChallan from "./pages/GenerateSingleChallan";
import ModifyPreviousDues from "./pages/ModifyPreviousDues";
import ModifyMonthlyTutionFee from "./pages/ModifyMonthlyTutionFee";
import Reports from "./pages/Reports";
import Expenses from "./pages/Expenses";
import BackupFile from "./pages/BackupFile";
import GenerateFee from "./pages/GenerateFee";
import GenerateFeeAdmin from "./pages/GenerateFeeAdmin";
import CheckFeeGenerateReport from "./pages/CheckFeeGenerateReport";
import FeeCollectionReports from "./pages/FeeCollectionReports";
import ExpenseReports from "./pages/ExpenseReports";
import DailyStatusReports from "./pages/DailyStatusReports";
import MonthlyFeeCollection from "./pages/MonthlyFeeCollection";
import FeeCollectionByClass from "./pages/FeeCollectionByClass";
import TotalFeeCollectionSummaryByClassAndPaymentStatus from "./pages/TotalFeeCollectionSummaryByClassAndPaymentStatus";
import NotPaidDetailedByStudent from "./pages/NotPaidDetailedByStudent";
import TotalFeeCollectionDetailedByStudent from "./pages/TotalFeeCollectionDetailedByStudent";
import FeeCollectionAmountByClass from "./pages/FeeCollectionAmountByClass";
import TotalPaidAndUnPaidCount from "./pages/TotallPaidAndUnPaidCount";
import TodayFeeCollection from "./pages/TodayFeeCollection";
import MoreThan1MonthDefaulters from "./pages/MoreThan1MonthDefaulters";
import FreeStudentsReport from "./pages/FreeStudentsReport";
import EnterExpensesBankAccount from "./pages/EnterExpensesBankAccount";
import EnterExpenses from "./pages/EnterExpenses";
import AccountStatusAndTransfers from "./pages/AccountStatusAndTransfers";
import AccountTransfersHistory from "./pages/AccountTransfersHistory";
import ExpenseReversal from "./pages/ExpenseReversal";
import FeeReversal from "./pages/FeeReversal";
import BalanceChangeHistory from "./pages/BalanceChangeHIstory";
import BalanceChangeHistoryThisMonth from "./pages/BalanceChangeHistoryThisMonth";
import LoanReturn from "./pages/LoanReturn";
import CompleteLoansReport from "./pages/CompleteLoansReport";
import MonthlyLoansReturnReport from "./pages/MonthlyLoansReturnReport";
import EnterExpensesFeeCollectionAccount from "./pages/EnterExpensesFeeCollectionAccount";
import CompleteReportPaidAndUnpaid from "./pages/CompleteReportPaidAndUnpaidByClass";
import PaidReportByClass from "./pages/PaidReportByClass";
import NotPaidReportByClass from "./pages/NotPaidReportByClass";
import MainPage from "./pages/MainPage";
import TimeTable from "./pages/TimeTable";
import UpdateTimeTable from "./pages/updateTimeTable";
import CreateTimeTable from "./pages/CreateTimetable";

axios.defaults.withCredentials = true;

function App() {

  return (
    <BrowserRouter>
      {/* <ToastContainer /> */}
      <Routes>
     
        <Route
          path="/timetable"
          element={
            <Sidebar>
              <Layout>
                <TimeTable />
              </Layout>
            </Sidebar>
          }
          
        />
            <Route
          path="/create-timetable"
          element={
            <Sidebar>
              <Layout>
                <CreateTimeTable />
              </Layout>
            </Sidebar>
          }
          
        />
        <Route
          path="/update-timetable"
          element={
            <Sidebar>
              <Layout>
                <UpdateTimeTable />
              </Layout>
            </Sidebar>
          }
          
        />

        <Route
          path="/check-student-info"
          element={
            <Sidebar>
              <Layout>
                <CheckStudentInfo />
              </Layout>
            </Sidebar>
          }
          
        />
        <Route
          path="/complete-report-paid-and-unpaid-by-class"
          element={
            <Sidebar>
              <Layout>
                <CompleteReportPaidAndUnpaid />
              </Layout>
            </Sidebar>
          }
          
        />
        <Route
          path="/paid-report-by-class"
          element={
            <Sidebar>
              <Layout>
                <PaidReportByClass />
              </Layout>
            </Sidebar>
          }
          
        />
        <Route
          path="/not-paid-report-by-class"
          element={
            <Sidebar>
              <Layout>
                <NotPaidReportByClass />
              </Layout>
            </Sidebar>
          }
          
        />
        <Route
          path="/monthly-fee-collection"
          element={
            <Sidebar>
              <Layout>
                <MonthlyFeeCollection/>
              </Layout>
            </Sidebar>
          }
          
        /><Route
          path="/fee-collection-by-class"
          element={
            <Sidebar>
              <Layout>
                <FeeCollectionByClass />
              </Layout>
            </Sidebar>
          }
          
        />
        <Route
          path="/total-fee-collection-summary-by-class-and-payment-status"
          element={
            <Sidebar>
              <Layout>
                <TotalFeeCollectionSummaryByClassAndPaymentStatus />
              </Layout>
            </Sidebar>
          }
          
        />
        <Route
          path="/not-paid-detailed-by-student"
          element={
            <Sidebar>
              <Layout>
                <NotPaidDetailedByStudent />
              </Layout>
            </Sidebar>
          }
          
        />
        <Route
          path="/total-fee-collection"
          element={
            <Sidebar>
              <Layout>
                <TotalFeeCollectionDetailedByStudent />
              </Layout>
            </Sidebar>
          }
          
        />
        <Route
          path="/fee-collection-amount-by-class"
          element={
            <Sidebar>
              <Layout>
                <FeeCollectionAmountByClass />
              </Layout>
            </Sidebar>
          }
          
        />
        <Route
          path="/total-paid-and-unpaid-count"
          element={
            <Sidebar>
              <Layout>
                <TotalPaidAndUnPaidCount />
              </Layout>
            </Sidebar>
          }
          
        />
        <Route
          path="/today-fee-collection"
          element={
            <Sidebar>
              <Layout>
                <TodayFeeCollection />
              </Layout>
            </Sidebar>
          }
          
        />
        <Route
          path="/more-than-one-month-defaulters"
          element={
            <Sidebar>
              <Layout>
                <MoreThan1MonthDefaulters />
              </Layout>
            </Sidebar>
          }
          
        />
        <Route
          path="/free-students-report"
          element={
            <Sidebar>
              <Layout>
                <FreeStudentsReport />
              </Layout>
            </Sidebar>
          }
          
        />
        <Route
          path="/enter-expenses-bank-account"
          element={
            <Sidebar>
              <Layout>
                <EnterExpensesBankAccount />
              </Layout>
            </Sidebar>
          }
          
        />
         <Route
          path="/enter-expenses-fee-collection-account"
          element={
            <Sidebar>
              <Layout>
                <EnterExpensesFeeCollectionAccount />
              </Layout>
            </Sidebar>
          }
          
        />
        <Route
          path="/enter-expenses"
          element={
            <Sidebar>
              <Layout>
                <EnterExpenses />
              </Layout>
            </Sidebar>
          }
          
        />
        <Route
          path="/account-status-and-transfers"
          element={
            <Sidebar>
              <Layout>
                <AccountStatusAndTransfers />
              </Layout>
            </Sidebar>
          }
          
        />
        
        <Route
          path="/account-transfers-history"
          element={
            <Sidebar>
              <Layout>
                <AccountTransfersHistory />
              </Layout>
            </Sidebar>
          }
          
        />
        
        <Route
          path="/expense-reversal"
          element={
            <Sidebar>
              <Layout>
                <ExpenseReversal />
              </Layout>
            </Sidebar>
          }
          
        />
        <Route
          path="/fee-reversal"
          element={
            <Sidebar>
              <Layout>
                <FeeReversal />
              </Layout>
            </Sidebar>
          }
          
        />
        <Route
          path="/balance-change-history"
          element={
            <Sidebar>
              <Layout>
                <BalanceChangeHistory />
              </Layout>
            </Sidebar>
          }
          
        />
        <Route
          path="/balance-change-history-this-month-all"
          element={
            <Sidebar>
              <Layout>
                <BalanceChangeHistoryThisMonth />
              </Layout>
            </Sidebar>
          }
          
        />
        <Route
          path="/loan-return"
          element={
            <Sidebar>
              <Layout>
                <LoanReturn />
              </Layout>
            </Sidebar>
          }
          
        />
        <Route
          path="/complete-loans-report"
          element={
            <Sidebar>
              <Layout>
                <CompleteLoansReport />
              </Layout>
            </Sidebar>
          }
          
        />
        <Route
          path="/monthly-loans-return-report"
          element={
            <Sidebar>
              <Layout>
                <MonthlyLoansReturnReport />
              </Layout>
            </Sidebar>
          }
          
        />
        <Route
          path="/fee-collection-and-modification"
          element={
            <Sidebar>
              <Layout>
                <FeeCollectionAndModification />
              </Layout>
            </Sidebar>
          }
          
        />
        <Route
          path="/modify-monthly-tution-fee"
          element={
            <Sidebar>
              <Layout>
                <ModifyMonthlyTutionFee />
              </Layout>
            </Sidebar>
          }
          
          
        />
        <Route
          path="/collect-fee"
          element={
            <Sidebar>
              <Layout>
                <CollectFee />
              </Layout>
            </Sidebar>
          }
          
        />
        <Route
          path="/reports"
          element={
            <Sidebar>
              <Layout>
                <Reports />
              </Layout>
            </Sidebar>
          }
          
        />
        <Route
          path="/reports"
          element={
            <Sidebar>
              <Layout>
                <Reports />
              </Layout>
            </Sidebar>
          }
          
        />
        <Route
          path="/expenses"
          element={
            <Sidebar>
              <Layout>
                <Expenses />
              </Layout>
            </Sidebar>
          }
          
        />
        <Route
          path="/backup-file"
          element={
            <Sidebar>
              <Layout>
                <BackupFile />
              </Layout>
            </Sidebar>
          }
          
        />
        <Route
          path="/generate-fee"
          element={
            <Sidebar>
              <Layout>
                <GenerateFee />
              </Layout>
            </Sidebar>
          }
          
        />
         <Route
          path="/generate-fee-admin"
          element={
            <Sidebar>
              <Layout>
                <GenerateFeeAdmin />
              </Layout>
            </Sidebar>
          }
          
        /> 
        <Route
          path="/check-fee-generate-report"
          element={
            <Sidebar>
              <Layout>
                <CheckFeeGenerateReport />
              </Layout>
            </Sidebar>
          }
          
        />
        <Route
          path="/fee-collection-reports"
          element={
            <Sidebar>
              <Layout>
                <FeeCollectionReports />
              </Layout>
            </Sidebar>
          }
          
        />
        <Route
          path="/expense-reports"
          element={
            <Sidebar>
              <Layout>
                <ExpenseReports />
              </Layout>
            </Sidebar>
          }
          
        />
        <Route
          path="/daily-status-report"
          element={
            <Sidebar>
              <Layout>
                <DailyStatusReports />
              </Layout>
            </Sidebar>
          }
          
        />
        <Route
          path="/generate-single-challan"
          element={
            <Sidebar>
              <Layout>
                <GenerateSingleChallan />
              </Layout>
            </Sidebar>
          }
          
        />
        <Route
          path="/modify-previous-dues"
          element={
            <Sidebar>
              <Layout>
                <ModifyPreviousDues />
              </Layout>
            </Sidebar>
          }
          
        />
         <Route
          path="/add-student"
          element={
            <Sidebar>
              <Layout>
                <AddStudent />
              </Layout>
            </Sidebar>
          }
        />
         <Route
          path="/update-student"
          element={
            <Sidebar>
              <Layout>
                <UpdateStudent />
              </Layout>
            </Sidebar>
          }
        />
          <Route
          path="/update-student-class"
          element={
            <Sidebar>
              <Layout>
                <UpdateStudentClass />
              </Layout>
            </Sidebar>
          }
        />
         <Route
          path="/terminate-student"
          element={
            <Sidebar>
              <Layout>
                <TerminateStudent />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/update-student-admission-date"
          element={
            <Sidebar>
              <Layout>
                <UpdateAdmissionDate />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/transfer-whole-class"
          element={
            <Sidebar>
              <Layout>
                <TransferWholeClass />
              </Layout>
            </Sidebar>
          }
        />
         <Route
          path="/update-dob"
          element={
            <Sidebar>
              <Layout>
                <UpdateDOB />
              </Layout>
            </Sidebar>
          }
        />
        
         <Route
          path="/update-options"
          element={
            <Sidebar>
              <Layout>
                <UpdateOptions />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/update-log"
          element={
            <Sidebar>
              <Layout>
                <UpdateLog />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/student-information-management"
          element={
            <Sidebar>
              <Layout>
                <StudentInfo />
              </Layout>
            </Sidebar>
          }
        />
        <Route path="/" element={ <Sidebar>
              <Layout>
                <MainPage />
              </Layout>
            </Sidebar> } />
    
        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/add-employee" element={<AddEmployee />} /> */}
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/resetpassword/:resetToken" element={<Reset />} />

        <Route
          path="/dashboard"
          element={
            <Sidebar>
              <Layout>
                <StudentInfo />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/add-tender"
          element={
            <Sidebar>
              <Layout>
                <AddTender />
              </Layout>
            </Sidebar>
          }
        />
        
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
