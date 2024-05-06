import * as React from "react";
import { useState } from "react";
import SearchBar from "./SearchBar";
import TableComponent from "./Table";
import { Button } from "@mui/material";

const columns = [
  { id: "accountNum", label: "Account number", align: "center", minWidth: 130 },
  { id: "reqType", label: "Request type", align: "center", minWidth: 130 },
  { id: "newVal", label: "New value", align: "center", minWidth: 140 },
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
        //   onClick={() => handleButtonClick(rowData)}
          sx={{fontSize:"10px"}}
        >
          Approve
        </Button>
        <Button
          variant="outlined"
          color="error"
        //   onClick={() => handleButtonClick(rowData)}
          sx={{fontSize:"10px"}}
        >
          Decline
        </Button>
      </div>
    ),
  }
];

function createData(accountNum, reqType, newVal) {
  return { accountNum, reqType, newVal };
}

const rows = [
	createData("36787964", "Change name", "Mr Bruce Wayne"),
	createData("56783489", "Change phone number", "9395557867"),
	createData("987654321", "Change email", "rose@gmail.com"),
	createData("123456789", "Change email", "stark@yahoo.com"),
	createData("876543210", "Change name", "Ms Jessica Saunders"),
	createData("456789123", "Change email", "young@gmail.com"),
	createData("234567890", "Change phone number", "3938556702"),
	createData("543210987", "Change name", "Mr Alfred Old"),
	createData("439834843", "Change name", "Mrs Tulip Paul"),
	createData("578349224", "Change phone number", "7490274669"),
	createData("905378539", "Change name", "Ms Jessica Saunders"),
	createData("437939530", "Change email", "wayne@gmail.com"),
	createData("539034753", "Change name", "Mr Joe Gatto"),
	createData("434903458", "Change phone number", "3648967783"),
];

function ProfileEditRequests() {
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
      <h2 style={{ marginBottom: "2rem" }}>Pending Edit Requests</h2>
      <SearchBar />
      <TableComponent rows={rows} columns={columns} />
    </>
  );
}

export default ProfileEditRequests;
