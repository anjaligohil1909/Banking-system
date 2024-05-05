import * as React from "react";
import {
	Typography,
	Box,
	Divider,
	Link,
	Breadcrumbs,
	TextField,
	FormControl,
	MenuItem,
	InputLabel,
	Select,
} from "@mui/material";

import Button from "@mui/material/Button";
import { useState } from "react";

export default function CustomerRequest() {
	const [salutation, setSalutation] = useState("");
	const [requestType, setRequestType] = useState("");
	const [loanType, setLoanType] = useState("");
	const [degreeType, setDegreeType] = useState("");

	const handleSalutationChange = (event) => {
		setSalutation(event.target.value);
	};

	const handleRequestTypeChange = (event) => {
		setRequestType(event.target.value);
	};

	const handleLoanTypeChange = (event) => {
		setLoanType(event.target.value);
	};

	const handleDegreeTypeChange = (event) => {
		setDegreeType(event.target.value);
	};

	return (
		<>
			<Breadcrumbs aria-label="breadcrumb" mb={2}>
				<Link underline="hover" color="inherit" href="/">
					Home
				</Link>
				<Typography color="text.primary">New request</Typography>
			</Breadcrumbs>
			<Divider />
			<Typography variant="h4" gutterBottom mt={2}>
				Create Request
			</Typography>
			<Box
				component="form"
				sx={{
					minWidth: 750,
					"& .MuiTextField-root": { m: 1, width: "50ch" },
					width: "100%",
					display: "block",
				}}
				noValidate
				autoComplete="off"
			>
				<FormControl
					style={{ width: "250px", margin: "8px", display: "block" }}
				>
					<InputLabel id="type-of-request-label">Request Type</InputLabel>
					<Select
						labelId="type-of-request-label"
						id="type-of-request"
						value={requestType}
						label="Request Type"
						fullWidth
						onChange={handleRequestTypeChange}
						required
					>
						<MenuItem value={"Loan"}>Request loan</MenuItem>
						<MenuItem value={"Transaction"}>Make a transaction</MenuItem>
						<MenuItem value={"Name"}>Change name</MenuItem>
						<MenuItem value={"Phone"}>Change mobile number</MenuItem>
						<MenuItem value={"Email"}>Change email address</MenuItem>
						<MenuItem value={"Address"}>Change address</MenuItem>
					</Select>
				</FormControl>
				{requestType == "Name" ? (
					<>
						<FormControl
							style={{ width: "250px", margin: "8px", display: "block" }}
						>
							<InputLabel id="demo-simple-select-label">Salutation</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={salutation}
								label="Salutation"
								fullWidth
								onChange={handleSalutationChange}
								required
							>
								<MenuItem value={"Mr"}>Mr</MenuItem>
								<MenuItem value={"Mrs"}>Mrs</MenuItem>
								<MenuItem value={"Ms"}>Ms</MenuItem>
							</Select>
						</FormControl>

						<FormControl sx={{ display: "inline" }}>
							<TextField
								id="outlined-basic"
								label="First Name"
								variant="outlined"
								required
							/>
							<TextField
								required
								id="outlined-basic"
								label="Last Name"
								variant="outlined"
							/>
						</FormControl>
					</>
				) : null}

				{requestType == "Email" ? (
					<>
						<FormControl sx={{ display: "block", width: "100%" }}>
							<TextField
								required
								type="text"
								label="New Email Address"
							></TextField>
						</FormControl>
					</>
				) : null}
				{requestType == "Phone" ? (
					<>
						<FormControl sx={{ display: "block", width: "100%" }}>
							<TextField
								required
								type="text"
								label="New Phone Number"
							></TextField>
						</FormControl>
					</>
				) : null}
				{requestType == "Transaction" ? (
					<>
						<FormControl sx={{ display: "block", width: "100%" }}>
							<TextField
								required
								type="text"
								label="Transaction Amount"
							></TextField>
							<TextField
								required
								type="text"
								label="Account Number"
							></TextField>
						</FormControl>
					</>
				) : null}
				{requestType == "Address" ? (
					<>
						<FormControl sx={{ display: "inline", width: "100%" }}>
							<TextField
								required
								type="text"
								label="Street Address"
							></TextField>
							<TextField type="text" label="Apt No./Unit"></TextField>
						</FormControl>
						<FormControl sx={{ display: "block", width: "100%" }}>
							<TextField required type="text" label="City"></TextField>
							<TextField required type="text" label="State"></TextField>
							<TextField required type="text" label="ZipCode"></TextField>
						</FormControl>
					</>
				) : null}
				{requestType == "Loan" ? (
					<>
						<FormControl sx={{ display: "block", width: "100%" }}>
							<TextField required type="text" label="Amount"></TextField>
							<TextField
								required
								type="text"
								label="Maximum term (in years)"
							></TextField>
						</FormControl>
						<FormControl
							style={{ width: "250px", margin: "8px", display: "block" }}
						>
							<InputLabel id="type-of-request-label">Loan Type</InputLabel>
							<Select
								labelId="type-of-request-label"
								id="type-of-request"
								value={loanType}
								label="Loan Type"
								fullWidth
								onChange={handleLoanTypeChange}
								required
							>
								<MenuItem value={"Home"}>Home loan</MenuItem>
								<MenuItem value={"Student"}>Student loan</MenuItem>
								<MenuItem value={"Personal"}>Personal loan</MenuItem>
							</Select>
						</FormControl>
						{loanType == "Home" ? (
							<>
								<FormControl sx={{ display: "inline" }}>
									<TextField
										id="outlined-basic"
										label="House built year"
										variant="outlined"
										required
									/>
								</FormControl>
								<Typography variant="h5" gutterBottom mt={2}>
									Home Insurance company details
								</Typography>

								<FormControl sx={{ display: "block", width: "100%" }}>
									<TextField required type="text" label="Name"></TextField>
								</FormControl>
								<FormControl sx={{ display: "block", width: "100%" }}>
									<TextField
										required
										type="text"
										label="Account Number"
									></TextField>
								</FormControl>
								<FormControl sx={{ display: "inline", width: "100%" }}>
									<TextField
										required
										type="text"
										label="Street Address"
									></TextField>
									<TextField type="text" label="Unit/Floor"></TextField>
								</FormControl>
								<FormControl sx={{ display: "block", width: "100%" }}>
									<TextField required type="text" label="City"></TextField>
									<TextField required type="text" label="State"></TextField>
									<TextField required type="text" label="ZipCode"></TextField>
								</FormControl>
								<FormControl sx={{ display: "block", width: "100%" }}>
									<TextField
										required
										type="text"
										label="Yearly Premium"
									></TextField>
								</FormControl>
							</>
						) : null}
						{loanType == "Student" ? (
							<>
								<FormControl
									style={{ width: "250px", margin: "8px", display: "block" }}
								>
									<InputLabel id="type-of-request-label">
										Degree Level
									</InputLabel>
									<Select
										labelId="type-of-request-label"
										id="type-of-request"
										value={degreeType}
										label="Degree Type"
										fullWidth
										onChange={handleDegreeTypeChange}
										required
									>
										<MenuItem value={"Home"}>Graduate degree</MenuItem>
										<MenuItem value={"Student"}>Undergraduate degree</MenuItem>
									</Select>
								</FormControl>
								<FormControl sx={{ display: "block", width: "100%" }}>
									<TextField
										required
										type="text"
										label="University Name"
									></TextField>
									<TextField
										required
										type="text"
										label="University ID"
									></TextField>
								</FormControl>
								<FormControl sx={{ display: "block" }}>
									<TextField
										name="graduationDate"
										label="Expected Graduation"
										InputLabelProps={{ shrink: true, required: true }}
										type="month"
									/>
								</FormControl>
							</>
						) : null}
					</>
				) : null}
				{requestType != "" ? (
					<>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								gap: "1rem",
								margin: "10px",
							}}
						>
							<Button variant="contained" color="success">
								Request
							</Button>
							<Button variant="outlined" color="error">
								Reset
							</Button>
						</div>
					</>
				) : null}
			</Box>
		</>
	);
}