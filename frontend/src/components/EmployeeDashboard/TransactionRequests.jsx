import * as React from "react";
import { useState } from "react";
import SearchBar from "./SearchBar";
import TableComponent from "./Table";
import { Button } from "@mui/material";

const columns = [
  { id: "fromname", label: "Sender Name", align: "center", minWidth: 130 },
  { id: "fromaccno", label: "Sender Acc No.", align: "center", minWidth: 130 },
  { id: "toname", label: "Receiver Name", align: "center", minWidth: 140 },
  { id: "toaccno", label: "Receiver Acc No.", align: "center", minWidth: 130 },
  { id: "amount", label: "Amount", align: "center", minWidth: 130 },
  {
    id: "action",
    label: "Approve / Deny",
    align: "center",
    minWidth: 100,
    renderCell: (rowData) => (
      <div style={{
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
        alignItems: "center",
        justifyContent: "center"
        }}>
        <Button
          variant="contained"
          color="success"
          onClick={() => handleButtonClick(rowData)}
          sx={{fontSize:"10px"}}
        >
          Approve
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => handleButtonClick(rowData)}
          sx={{fontSize:"10px"}}
        >
          Decline
        </Button>
      </div>
    ),
  }
];

const handleButtonClick = (rowData) => {
  console.log("I am clicked");
};

function createData(fromname, fromaccno, toname, toaccno, amount, action) {
  return { fromname, fromaccno, toname, toaccno, amount, action };
}

const rows = [
  createData("Anjali", 3451234325, "John", 1234567890, 30),
  createData("John", "Doe", "john@example.com", 1234567890, 2),
  createData("Jane", "Smith", "jane@example.com", 9876543210, 3),
  createData("Alice", "Johnson", "alice@example.com", 5551234567, 1),
  createData("Bob", "Brown", "bob@example.com", 9998887777, 2),
  createData("Emily", "Davis", "emily@example.com", 1112223333, 1),
  createData("Michael", "Wilson", "michael@example.com", 4445556666, 3),
  createData("Sarah", "Anderson", "sarah@example.com", 7778889999, 2),
  createData("David", "Martinez", "david@example.com", 2223334444, 1),
  createData("Olivia", "Taylor", "olivia@example.com", 8889990000, 2),
  createData("James", "Lee", "james@example.com", 6667778888, 3),
  createData("Sophia", "Brown", "sophia@example.com", 3334445555, 1),
];

export default function TransactionRequests() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <h2 style={{ marginBottom: "2rem" }}>Pending List of Customers</h2>
      <SearchBar />
      <TableComponent rows={rows} columns={columns} />
    </>
  );
}
