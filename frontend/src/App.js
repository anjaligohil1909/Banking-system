import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import LandingPage from "./components/Landing/Landing";
import { Route, Routes } from "react-router-dom";
import Checkings from "./components/Dashboard/Checkings";

function App() {
  return (
    <div classname="App">
      <Navbar />
        <Routes>
          {/* <Route path="/" element={<Checkings />} /> */}
        </Routes>
    </div>
  );
}

export default App;
