import React from "react";
import CardButton from "./CardButton";
import "./dashboard.css";

function CustomerDashboard() {
  return (
    <>
    <h1 style={{marginLeft: "4rem"}}> Dashboard </h1>
    <div className="cards-container">
      <CardButton accountDetails={["Checkings", "123456789", "$3000.0"]} />
      <CardButton accountDetails={["Savings", "987654321", "$1000.0"]} />
    </div>
    </>
  );
}

export default CustomerDashboard;
