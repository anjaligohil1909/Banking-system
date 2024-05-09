import React, { useState, useEffect } from "react";
import CardButton from "../CustomerDashboard/CardButton";
import "../CustomerDashboard/dashboard.css";
import axios from "axios";
import { Breadcrumbs, Typography, Divider } from "@mui/material";

function CustomerDetail() {
  const [custId, setCustId] = useState(localStorage.getItem('cust_id') || 'defaultCustId');
  const [accountDetails, setAccountDetails] = useState([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/accounts/?cust_id=${custId}`)
      .then((res) => {
        console.log(res);
        const newData = res.data.map((acc) => {
          if (acc.acc_type === 'C') {
            return { type: "Checkings", acc_no: acc.acc_no, bal: acc.balance };
          } else if (acc.acc_type === 'S') {
            return { type: "Savings", acc_no: acc.acc_no, bal: acc.balance };
          } else {
            return { type: "Loan", acc_no: acc.acc_no, bal: acc.balance };
          }
        });
        setAccountDetails(newData);
      })
      .catch((error) => {
        console.error('Error fetching account details:', error);
      });
  }, []);

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" mb={2}>
        <Typography variant="h4" color="text.primary">
          Customer Detials
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
        {accountDetails.map((account, idx) => {
          return ( <CardButton key={idx} accountDetails={account} showLink={false} />)
        })}
      </div>
    </>
  );
}

export default CustomerDetail