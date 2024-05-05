import * as React from "react";
import Paper from "@mui/material/Paper";
import {
	Table,
	TableBody,
	TableHead,
	TableRow,
	TableCell,
	TableContainer,
	TablePagination,
	styled,
} from "@mui/material";
import { useState } from "react";
import SearchBar from "./SearchBar";

const columns = [
	{ id: "accountNum", label: "Account Number", align: "center", minWidth: 130 },
	{ id: "amount", label: "Amount", align: "center", minWidth: 130 },
	{ id: "term", label: "Term", align: "center", minWidth: 140 },
	{ id: "type", label: "Type of Loan", align: "center", minWidth: 130 },
	{
		id: "Action",
		label: "Approve / Deny",
		align: "center",
		maxWidth: 100,
	},
];

// function createData(firstname, lastname, email, phoneno, noofacc) {
// 	return { firstname, lastname, email, phoneno, noofacc };
// }

function createData(accountNum, amount, term, type) {
	return { accountNum, amount, term, type };
}

const rows = [
	createData("36787964", "$35000", "10 years", "Student"),
	createData("36787964", "$35000", "10 years", "Personal"),
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
			<h2 style={{ marginBottom: "2rem" }}>Pending Approvals</h2>
			<SearchBar />
			<Paper sx={{ width: "100%", overflow: "hidden" }}>
				<TableContainer sx={{ maxHeight: 440 }}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								{columns.map((column) => (
									<TableCell
										key={column.id}
										align={column.align}
										style={{
											minWidth: column.minWidth,
											backgroundColor: "#7CB9E8",
											color: "white",
										}}
									>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{rows
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row) => {
									return (
										<TableRow
											hover
											role="checkbox"
											tabIndex={-1}
											key={row.email}
										>
											{columns.map((column) => {
												const value = row[column.id];
												return (
													<TableCell key={column.id} align={column.align}>
														{column.format && typeof value === "number"
															? column.format(value)
															: value}
													</TableCell>
												);
											})}
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</>
	);
}
