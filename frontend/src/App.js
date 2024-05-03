import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import LandingPage from "./components/Landing/Landing";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import NewAccountPage from "./pages/NewAccountPage";

const employeeSideBarList = {
  "New Account": "new-account",
  "Customer List": "/",
  "Loan" : "/",
  "View Request": "/",
};

function App() {
  return (
    <div classname="App">
      <Routes>
        <Route path="/" element={<Navbar sideBarList={employeeSideBarList} />}>
          <Route path="/new-account" element={<NewAccountPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
