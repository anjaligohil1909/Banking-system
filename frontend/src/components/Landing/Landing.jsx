import React from "react";
import { Link } from 'react-router-dom';
import landing_page from "../../images/landing_page.jpeg";

import ResponsiveAppBar from '../Navbar/Navbar';

function LandingPage() {
	const divStyle = {
		backgroundImage: `url(${landing_page})`,
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		minHeight: "100vh", // Set minimum height to fill the viewport
		position : 'relative',
	};

	const butStyle = {
		width: 260,
		height: 70,
		position: 'absolute',
		right: '5%', 
		top : '3%',
		opacity:0,
	};

	const handleClick = () => {
		//<ResponsiveAppBar/>
		<Link to='/navbar'></Link>
	  };

	return (
		<div className="landing-page" style={divStyle}>
			<button style={butStyle} onClick={handleClick}>
				
			</button>
		</div>
	);
}

export default LandingPage;
