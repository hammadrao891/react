import { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
import Reset from "./pages/auth/Reset";
import Dashboard from "./pages/dashboard/Dashboard";
import Sidebar from "./components/sidebar/Sidebar";
import Layout from "./components/layout/Layout";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { getLoginStatus } from "./services/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import AddTender from "./pages/addTender/AddTender";
import TenderDetail from "./components/tender/tenderDetail/TenderDetail";
import EditTender from "./pages/editTender/EditTender";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import AddVendor from "./pages/addTender/AddVendor";
import AddCategory from "./pages/addTender/AddCategory";
import AddEmployee from "./pages/addEmployee/AddEmployee";
import { AuthContext } from "./context/AuthContext";
import AddInventory from "./pages/AddInventory";
import AddRequisition from "./pages/AddRequisition";
import Inventory from "./pages/Inventory";
import ManageRequisition from "./pages/ManageRequisition";
import ApproveRequisitions from "./pages/ApproveRequisitions";
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

axios.defaults.withCredentials = true;

function App() {
  const {user} = useContext(AuthContext)
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.removeItem("user")
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  }, [dispatch]);

  return (
    <BrowserRouter>
      {/* <ToastContainer /> */}
      <Routes>
      <Route
          path="/add-inventory"
          element={
            <Sidebar>
              <Layout>
                <AddInventory />
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
         <Route
          path="/inventory"
          element={
            <Sidebar>
              <Layout>
                <Inventory />
              </Layout>
            </Sidebar>
          }
        />
         <Route
          path="/manage-requisition"
          element={
            <Sidebar>
              <Layout>
                <ManageRequisition />
              </Layout>
            </Sidebar>
          }
        />
         <Route
          path="/approve-requisitions"
          element={
            <Sidebar>
              <Layout>
                <ApproveRequisitions />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/add-requisition"
          element={
            <Sidebar>
              <Layout>
                <AddRequisition />
              </Layout>
            </Sidebar>
          }
        />
        <Route path="/" element={<Login />} />
       <Route path="/login" element={user ? <Sidebar>
              <Layout>
                <Dashboard />
              </Layout>
            </Sidebar> : <Login />}> </Route>
        <Route path="/register" element={<Register />} />
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
         {  user && user.userType === "AD" &&
          <Route
          path="/add-employee"
          element={
            <Sidebar>
              <Layout>
                <AddEmployee />
              </Layout>
            </Sidebar>
          }
        />}
        <Route
          path="/add-vendor"
          element={
            <Sidebar>
              <Layout>
                <AddVendor />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/add-category"
          element={
            <Sidebar>
              <Layout>
                <AddCategory />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/tender-detail/:id"
          element={
            <Sidebar>
              <Layout>
                <TenderDetail />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-tender/:id"
          element={
            <Sidebar>
              <Layout>
                <EditTender />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/profile"
          element={
            <Sidebar>
              <Layout>
                <Profile />
              </Layout>
            </Sidebar>
          }
        />
      
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
