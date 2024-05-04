import React from "react";
import CardButton from "./CardButton";
import "./dashboard.css";

function CustomerDashboard() {
  return (
    <div className="cards-container">
      <CardButton accountDetails={["Checkings", "123456789", "$3000.0"]} />
      <CardButton accountDetails={["Saving", "987654321", "$1000.0"]} />
    </div>
  );
}

export default CustomerDashboard;
