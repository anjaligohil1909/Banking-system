import * as React from "react";
import SearchBar from "./SearchBar";
import TableComponent from "./Table";
import { Button } from "@mui/material";

const columns = [
	{ id: "accountNum", label: "Account Number", align: "center", minWidth: 130 },
	{ id: "amount", label: "Amount", align: "center", minWidth: 130 },
	{ id: "term", label: "Term", align: "center", minWidth: 140 },
	{ id: "type", label: "Type of Loan", align: "center", minWidth: 130 },
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

function createData(accountNum, amount, term, type) {
	return { accountNum, amount, term, type };
}

const rows = [
	createData("987654321", "$70000", "15 years", "Student"),
	createData("123456789", "$90000", "20 years", "Personal"),
	createData("876543210", "$120000", "25 years", "Home"),
	createData("456789123", "$60000", "12 years", "Student"),
	createData("234567890", "$80000", "18 years", "Personal"),
	createData("543210987", "$100000", "28 years", "Home"),
	createData("987654321", "$140000", "30 years", "Home"),
	createData("987654321", "$45000", "8 years", "Personal"),
	createData("987654321", "$110000", "22 years", "Personal"),
	createData("987654321", "$75000", "13 years", "Student"),
	createData("987654321", "$130000", "27 years", "Home"),
	createData("987654321", "$50000", "9 years", "Personal"),
];

export default function LoanRequests() {

	return (
		<>
			<h2 style={{ marginBottom: "2rem" }}>Pending Loan Requests</h2>
			<SearchBar />
			<TableComponent rows={rows} columns={columns}/>
		</>
	);
}
