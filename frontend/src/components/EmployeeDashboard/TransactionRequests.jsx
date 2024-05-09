import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import axios from "axios";
import TableComponent from "./Table";
import { Button } from "@mui/material";

export default function TransactionRequests() {
  const [requestList, setRequestList] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/employee/transaction-requests")
      .then((res) => {
        console.log(res);
        setRequestList(res.data);
      });
  }, []);

  const columns = [
    {
      id: "fromaccno",
      label: "Sender Acc No.",
      align: "center",
      minWidth: 130,
    },
    {
      id: "toaccno",
      label: "Receiver Acc No.",
      align: "center",
      minWidth: 130,
    },
    { id: "amount1", label: "Amount", align: "center", minWidth: 130 },
    { id: "date", label: "Date", align: "center", minWidth: 130 },
    {
      id: "action",
      label: "Approve / Deny",
      align: "center",
      minWidth: 100,
      renderCell: (rowData) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={() => handleApproveClick(rowData)}
            sx={{ fontSize: "10px" }}
          >
            Approve
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleDenyClick(rowData)}
            sx={{ fontSize: "10px" }}
          >
            Decline
          </Button>
        </div>
      ),
    },
  ];

  const handleApproveClick = (rowData) => {
    console.log(rowData);
    axios.put()
  };
  const handleDenyClick = (rowData) => {
    console.log("I am clicked");
  };
  let rows = [];

  function formatData() {
    rows = requestList.map(({ sender_no, receiver_no, amount, datetime }) => {
      const date = new Date(datetime);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
      const day = String(date.getDate()).padStart(2, '0');

      datetime = `${year}-${month}-${day}`;

      const createData = (fromaccno, toaccno, amount1, date) => ({
        fromaccno,
        toaccno,
        amount1,
        date,
      });

      return createData(sender_no, receiver_no, amount, datetime);
    });
  }

  return (
    <>
      <h2 style={{ marginBottom: "2rem" }}>Pending Transactions</h2>
      <SearchBar />
      {requestList ? formatData() : null}
      <TableComponent rows={rows} columns={columns} showLink={false} />
    </>
  );
}
