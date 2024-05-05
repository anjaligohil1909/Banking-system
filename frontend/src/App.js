import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import CustomerDashboard from "./components/CustomerDashboard/CustomerDashboard";
import NewAccountPage from "./components/EmployeeDashboard/NewAccountPage";
import Login from "./components/Login/Login";
import Checkings from "./components/CustomerDashboard/Checkings";
import Savings from "./components/CustomerDashboard/Savings";
import Loans from "./components/CustomerDashboard/Loans";
import CustomerRequest from "./components/CustomerRequest/CustomerRequest";
import CustomerList from "./components/EmployeeDashboard/CustomerList";
import LoanRequests from "./components/EmployeeDashboard/LoanRequests";
import AllRequests from "./components/EmployeeDashboard/AllRequests";
import EmployeeDashboard from "./components/EmployeeDashboard/EmployeeDashboard";

const employeeSideBarList = {
  Dashboard: "",
  "Customer List": "customer-list",
  "New Account": "new-account",
  "Loan": "loan-requests",
  "View Request": "all-requests",
};

const customersSideBarList = {
  Dashboard: "",
  Checkings: "checkings",
  Savings: "savings",
  Loan: "loan",
  "Create Request": "create-request",
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="customer"
          element={<Navbar sideBarList={customersSideBarList} />}
        >
          <Route index element={<CustomerDashboard />} />
          <Route path="checkings" element={<Checkings />} />
          <Route path="savings" element={<Savings />} />
          <Route path="loan" element={<Loans />} />
          <Route path="create-request" element={<CustomerRequest />} />
        </Route>
        <Route
          path="employee"
          element={<Navbar sideBarList={employeeSideBarList} />}
        >
          <Route index element={<EmployeeDashboard />} />
          <Route path="new-account" element={<NewAccountPage />} />
          <Route path="customer-list" element={<CustomerList />} />
          <Route path="loan-requests" element={<LoanRequests />} />
          <Route path="all-requests" element={<AllRequests />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
