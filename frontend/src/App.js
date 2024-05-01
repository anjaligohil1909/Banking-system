import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import LandingPage from "./components/Landing/Landing";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div classname="App">
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
