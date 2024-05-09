import React, { useState, useEffect } from "react";
import axios from "axios";
import CardButton from "./CardButton";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import TableComponent from "../EmployeeDashboard/Table";
import { useNavigate } from "react-router-dom";

function Checkings() {
  const navigate = useNavigate();
  const cust_id = "C0001";
  const [accountDetails, setAccountDetails] = useState([{}]);
  const [transactionDetails, setTransactionDetails] = useState([{}]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/customer/${cust_id}/checkings-account/`)
      .then((res) => {
        console.log(res);
        setAccountDetails(res.data);
        if (res.data.length != 0) {
          axios
            .get(
              `http://127.0.0.1:8000/api/customer/${res.data[0].acc_no}/transactions`
            )
            .then((transactionData) => {
              console.log(transactionData.data);
              if (transactionData.data.length != 0) {
                const newTransactions = transactionData.data.map(
                  (transaction) => {
                    if (transaction.sender_no === res.data[0].acc_no) {
                      transaction.type = "Debit";
                      transaction.acc = transaction.receiver_no;
                    } else {
                      transaction.type = "Credit";
                      transaction.acc = transaction.sender_no;
                    }
                    return transaction;
                  }
                );
                setTransactionDetails(newTransactions);
              }
            });
        }
      });
  }, []);

  const columns = [
    {
      id: "transactiontype",
      label: "Transaction Type",
      align: "center",
      maxWidth: 80,
    },
    {
      id: "receivingacc",
      label: "To/From",
      align: "center",
      maxWidth: 80,
    },
    { id: "amount", label: "Amount Sent($)", align: "center", maxWidth: 80 },
  ];



  let rows = [];

  function formatData() {
		rows = transactionDetails.map(({ type, acc, amount }) => {
			const createData = (transactiontype, receivingacc, amount) => ({
				transactiontype,
				receivingacc,
				amount
			});

			return createData(type, acc, amount);
		});
		console.log(rows);
	}

  return (
    <Box className="">
      <h2> Checkings Account Details</h2>
      <div style={{ display: "flex", flexDirection: "row", gap: "2rem" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "3rem",
          }}
        >
          <Card
            sx={{
              backgroundColor: "#F0F8FF",
              width: "fit-content",
              padding: "1rem",
              height: "fit-content",
              marginTop: "3rem",
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h6">
                Account Number: {accountDetails[0].acc_no}
              </Typography>
              <Typography gutterBottom variant="h6">
                Routing Number: 100220110
              </Typography>
              {/* <Typography gutterBottom variant="h6">Account Number: {accountNum} </Typography> */}
              {/* <Typography gutterBottom variant="h6">Routing Number: {routingNum} </Typography> */}
              <Divider />
              <Typography
                gutterBottom
                variant="h6"
                sx={{ marginTop: "1rem", fontWeight: 550 }}
              >
                Balance: $3000.00
              </Typography>
              {/* <Typography gutterBottom variant="h6">Balance: {balance} </Typography> */}
            </CardContent>
          </Card>
          <Button
            variant="contained"
            color="success"
            sx={{ width: "80%", alignSelf: "center" }}
            onClick={() => navigate("/customer/create-request")}
          >
            Initiate a Transaction
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "60%",
            marginLeft: "auto",
            marginRight: "1rem",
          }}
        >
          <h3 style={{ margin: 0 }}> Recent Transactions </h3>
          {transactionDetails? formatData(): null}
          <TableComponent rows={rows} columns={columns} />
          
        </div>
      </div>
    </Box>
  );
}

export default Checkings;
