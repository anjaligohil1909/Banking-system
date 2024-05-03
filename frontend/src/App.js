import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import LandingPage from "./components/Landing/Landing";
import { Route, Routes } from "react-router-dom";
import Checkings from "./components/Dashboard/Checkings";
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
