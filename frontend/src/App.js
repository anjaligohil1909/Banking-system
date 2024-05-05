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

const employeeSideBarList = {
  Dashboard: "",
  "Customer List": "customer-list",
  "New Account": "new-account",
  Loan: "/",
  "View Request": "/",
};

const customersSideBarList = {
  Dashboard: "",
  Checkings: "checkings",
  Savings: "savings",
  Loans: "loans",
  "Create Request": "create-request",
};

function App() {
  return (
    <div classname="App">
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
          <Route path="new-account" element={<NewAccountPage />} />
          <Route path="customer-list" element={<CustomerList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
