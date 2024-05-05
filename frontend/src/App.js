import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import CustomerDashboard from "./components/Dashboard/CustomerDashboard";
import NewAccountPage from "./pages/NewAccountPage";
import Login from "./components/Login/Login";
import Checkings from "./components/Dashboard/Checkings";
import Savings from "./components/Dashboard/Savings";
import Loans from "./components/Dashboard/Loans";
import CustomerRequest from "./components/CustomerRequest/CustomerRequest";
import EmployeeDashboard from "./components/Employee/EmployeeDashboard";

const employeeSideBarList = {
  "New Account": "new-account",
  "Customer List": "/",
  Loan: "/",
  "View Request": "/",
};

const customersSideBarList = {
  Checkings: "checkings",
  Saving: "savings",
  Loan: "loans",
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
          <Route path="loans" element={<Loans />} />
          <Route path="create-request" element={<CustomerRequest />} />
        </Route>
        <Route
          path="employee"
          element={<Navbar sideBarList={employeeSideBarList} />}
        >
          <Route index element={<EmployeeDashboard />} />
          <Route path="new-account" element={<NewAccountPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
