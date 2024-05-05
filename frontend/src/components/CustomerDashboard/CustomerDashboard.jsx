import React from "react";
import CardButton from "./CardButton";
import "./dashboard.css";
import { Breadcrumbs, Link, Typography, Divider } from "@mui/material";
function CustomerDashboard() {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" mb={2}>
        <Typography variant="h4" color="text.primary">
          Dashboard
        </Typography>
      </Breadcrumbs>
      <Divider />

      <div
        className="cards-container"
        style={{
          marginTop: "-2rem",
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
