import React from "react";
import CardButton from "./CardButton";

function Checkings() {
  return (
    <div className="cards-container">
      <CardButton accountDetails={["Checkings", "123456789", "$3000.0"]} />
    </div>
  );
}

export default Checkings;
