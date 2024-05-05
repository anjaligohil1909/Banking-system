import React from "react";
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

function Savings() {
  const navigate = useNavigate();
  const columns = [
    {
      id: "receivingacc",
      label: "Receiving Account No",
      align: "center",
      maxWidth: 80,
    },
    {
      id: "receivername",
      label: "Receiver Name",
      align: "center",
      maxWidth: 80,
    },
    { id: "amount", label: "Amount Sent($)", align: "center", maxWidth: 80 },
  ];

  function createData(receivingacc, receivername, amount) {
    return { receivingacc, receivername, amount };
  }

  const rows = [
    createData(3451234325, "Anjali", 30),
    createData(4567890123, "John", 50),
    createData(5678901234, "Emily", 20),
    createData(6789012345, "David", 40),
    createData(7890123456, "Sarah", 60),
    createData(8901234567, "Michael", 25),
    createData(9012345678, "Alice", 35),
    createData(1234567890, "Bob", 45),
    createData(2345678901, "Olivia", 55),
    createData(3456789012, "James", 65),
  ];

  return (
    <Box className="">
      <h2> Savings Account Details</h2>
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
                Account Number: 987654321
              </Typography>
              <Typography gutterBottom variant="h6">
                Routing Number: 6784567090
              </Typography>
              {/* <Typography gutterBottom variant="h6">Account Number: {accountNum} </Typography> */}
              {/* <Typography gutterBottom variant="h6">Routing Number: {routingNum} </Typography> */}
              <Divider />
              <Typography
                gutterBottom
                variant="h6"
                sx={{ marginTop: "1rem", fontWeight: 550 }}
              >
                Balance: $1000.00
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
          <TableComponent rows={rows} columns={columns} />
        </div>
      </div>
    </Box>
  );
}

export default Savings;
