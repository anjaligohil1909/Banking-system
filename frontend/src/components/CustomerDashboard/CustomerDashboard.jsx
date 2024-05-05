import React from "react";
import CardButton from "./CardButton";
import "./dashboard.css";

function CustomerDashboard() {
	return (
		<>
			<h1 style={{ marginLeft: "4rem" }}> Dashboard </h1>
			<div
				className="cards-container"
				style={{
          			marginTop:"-2rem",
					marginLeft: "4rem",
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "flex-start",
				}}
			>
				<CardButton accountDetails={["Checkings", "123456789", "$3000.00"]} />
				<CardButton accountDetails={["Savings", "987654321", "$10000.00"]} />
				<CardButton accountDetails={["Loan", "55555555", "$1000.00"]} />
			</div>
		</>
	);
}

export default CustomerDashboard;
