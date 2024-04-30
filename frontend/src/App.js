import logo from './logo.svg';
import './App.css';
import ResponsiveAppBar from './components/Navbar/Navbar';
import LandingPage from './components/Landing/Landing';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
	
	  return (
		
     //<div classname = "App">
	  
	  <div>
		{/* <LandingPage/> */}
		<ResponsiveAppBar/>
		<Routes>
        		<Route path="/" component={LandingPage} />
       			<Route path="/navbar" component={ResponsiveAppBar} />
		</Routes>
	</div>
	  
  );
}

export default App;
