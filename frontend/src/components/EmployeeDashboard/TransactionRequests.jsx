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
  createData("Tanay", 3451234325, "Ethan", 1234567890, 50),
  createData("Anjali", 3451234325, "Ethan", 1234567890, 30),
  createData("Emma", 5647890321, "Michael", 9087654321, 25),
  createData("Sophia", 1239874560, "Matthew", 2345678901, 35),
  createData("Olivia", 6785432190, "Ethan", 7890123456, 28),
  createData("Isabella", 9876543210, "David", 6543210987, 32),
  createData("Ava", 1234509876, "James", 8901234567, 29),
  createData("Mia", 8765432109, "Benjamin", 4321098765, 31),
  createData("Charlotte", 3456789012, "Logan", 2109876543, 27),
  createData("Amelia", 5432109876, "Lucas", 8765432109, 33),
  createData("Harper", 8901234567, "Alexander", 5678901234, 26)
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
      <h2 style={{ marginBottom: "2rem" }}>Pending Transactions</h2>
      <SearchBar />
      <TableComponent rows={rows} columns={columns} />
    </>
  );
}
