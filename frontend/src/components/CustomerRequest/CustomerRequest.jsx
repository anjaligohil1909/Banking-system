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
import axios from "axios";

export default function CustomerRequest() {
	const [salutation, setSalutation] = useState("");
	const [requestType, setRequestType] = useState("");
	const [loanType, setLoanType] = useState("");
	const [degreeType, setDegreeType] = useState("");
	const [transactionAmount, setTransactionAmount] = useState("");
	const [acctNo, setacctNo] = useState("");
	const [fname, setfname] = useState("");
	const [lname, setlname] = useState("");
	const [email, setemail] = useState("");
	const [phno, setphno] = useState("");
	const [loanAmt, setloanAmt] = useState(0);
	const [term, setterm] = useState(0);
	const [uName, setuName] = useState("");
	const [uID, setuID] = useState("");
	const [gradDate, setgradDate] = useState("");
	const [builtYear, setbuiltYear] = useState("");
	const [insAcctNo, setinsAcctNo] = useState("");
	const [insYearly, setinsYearly] = useState("");

	const handleSalutationChange = (event) => {
		setSalutation(event.target.value);
	};

	const handlefnameChange = (event) => {
		setfname(event.target.value);
	};

	const handlelnameChange = (event) => {
		setlname(event.target.value);
	};

	const handleEmailChange = (event) => {
		setemail(event.target.value);
	};

	const handlePhnoChange = (event) => {
		setphno(event.target.value);
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

	const handleTransactionChange = (event) => {
		setTransactionAmount(event.target.value);
	};

	const handleAcctNoChange = (event) => {
		setacctNo(event.target.value);
	};

	const handleloanAmtChange = (event) => {
		setloanAmt(event.target.value);
	};

	const handletermChange = (event) => {
		setterm(event.target.value);
	};

	const handleuNameChange = (event) => {
		setuName(event.target.value);
	};

	const handleuIDChange = (event) => {
		setuID(event.target.value);
	};

	const handlegradDateChange = (event) => {
		setgradDate(event.target.value);
	};

	const handlebuiltYearChange = (event) => {
		setbuiltYear(event.target.value);
	};

	const handleinsYearlyChange = (event) => {
		setinsYearly(event.target.value);
	};

	const handleinsAcctNoChange = (event) => {
		setinsAcctNo(event.target.value);
	};

	const submitFormData = async (formData) => {
		console.log(formData);
		try {
			const response = await axios.post(
				"http://127.0.0.1:8000/api/customer/create_request/",
				formData
			);
			return response.data; // Return response data
		} catch (error) {
			throw new Error("Failed to submit form data"); // Throw an error if request fails
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		// fields = ['req_id', 'request_type', 'status', 'created_at', 'cust_id']
		// fields = ['req_id', 'ltype', 'lamount', 'lmonths', 'lpay', 'lrate']

		try {
			const formData = {
				request_type: requestType,
				status: "Pending",
				cust_id: "C0006",
				created_at: "2023-05-09T09:15:00.000Z",
				ltype:loanType,
				lamount:loanAmt,
				lmonths:term*12,
				lpay:500.00,
				lrate:6.00,

			};

			const responseData = await submitFormData(formData);
			console.log("Response:", responseData);

			// Reset form data or perform any other actions after successful submission
		} catch (error) {
			console.error("Error:", error);
			// Handle error, display error message, etc.
		}
	};

	return (
		<>
			<Breadcrumbs aria-label="breadcrumb" mb={2}>
				<Link underline="hover" color="inherit" href="/customer">
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
						{/* <MenuItem value={"Name"}>Change name</MenuItem>
						<MenuItem value={"Phone"}>Change mobile number</MenuItem>
						<MenuItem value={"Email"}>Change email address</MenuItem>
						<MenuItem value={"Address"}>Change address</MenuItem> */}
						<MenuItem value={"Personal"}>Edit personal details</MenuItem>
					</Select>
				</FormControl>
				{requestType == "Personal" ? (
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
								value={fname}
								onChange={handlefnameChange}
								required
							/>
							<TextField
								required
								id="outlined-basic"
								label="Last Name"
								variant="outlined"
								value={lname}
								onChange={handlelnameChange}
							/>
						</FormControl>
					</>
				) : null}

				{requestType == "Personal" ? (
					<>
						<FormControl sx={{ display: "block", width: "100%" }}>
							<TextField
								required
								type="text"
								label="New Email Address"
								value={email}
								onChange={handleEmailChange}
							></TextField>
						</FormControl>
					</>
				) : null}
				{requestType == "Personal" ? (
					<>
						<FormControl sx={{ display: "block", width: "100%" }}>
							<TextField
								required
								type="text"
								label="New Phone Number"
								value={phno}
								onChange={handlePhnoChange}
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
								value={transactionAmount}
								onChange={handleTransactionChange}
							></TextField>
							<TextField
								required
								type="text"
								label="Account Number"
								value={acctNo}
								onChange={handleAcctNoChange}
							></TextField>
						</FormControl>
					</>
				) : null}
				{/* {requestType == "Personal" ? (
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
				) : null} */}
				{requestType == "Loan" ? (
					<>
						<FormControl sx={{ display: "block", width: "100%" }}>
							<TextField
								required
								type="text"
								label="Amount"
								value={loanAmt}
								onChange={handleloanAmtChange}
							></TextField>
							<TextField
								required
								type="text"
								label="Maximum term (in years)"
								value={term}
								onChange={handletermChange}
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
								<MenuItem value={"H"}>Home loan</MenuItem>
								<MenuItem value={"S"}>Student loan</MenuItem>
								<MenuItem value={"P"}>Personal loan</MenuItem>
							</Select>
						</FormControl>
						{loanType == "H" ? (
							<>
								<FormControl sx={{ display: "inline" }}>
									<TextField
										id="outlined-basic"
										label="House built year"
										variant="outlined"
										value={builtYear}
										onChange={handlebuiltYearChange}
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
										value={insAcctNo}
										onChange={handleinsAcctNoChange}
									></TextField>
								</FormControl>
								{/* <FormControl sx={{ display: "inline", width: "100%" }}>
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
								</FormControl> */}
								<FormControl sx={{ display: "block", width: "100%" }}>
									<TextField
										required
										type="text"
										label="Yearly Premium"
										value={insYearly}
										onChange={handleinsYearlyChange}
									></TextField>
								</FormControl>
							</>
						) : null}
						{loanType == "S" ? (
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
										<MenuItem value={"G"}>Graduate degree</MenuItem>
										<MenuItem value={"U"}>Undergraduate degree</MenuItem>
									</Select>
								</FormControl>
								<FormControl sx={{ display: "block", width: "100%" }}>
									<TextField
										required
										type="text"
										label="University Name"
										value={uName}
										onChange={handleuNameChange}
									></TextField>
									<TextField
										required
										type="text"
										label="University ID"
										value={uID}
										onChange={handleuIDChange}
									></TextField>
								</FormControl>
								<FormControl sx={{ display: "block" }}>
									<TextField
										name="graduationDate"
										label="Expected Graduation"
										InputLabelProps={{ shrink: true, required: true }}
										type="month"
										value={gradDate}
										onChange={handlegradDateChange}
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
							<Button
								variant="contained"
								color="success"
								onClick={handleSubmit}
							>
								Request
							</Button>
							{console.log(transactionAmount)}
							{console.log(acctNo)}
							{console.log(salutation)}
							{console.log(fname)}
							{console.log(lname)}
							{console.log(email)}
							{console.log(phno)}
							{console.log(loanAmt)}
							{console.log(term)}
							{console.log(loanType)}
							{console.log(degreeType)}
							{console.log(uID)}
							{console.log(uName)}
							{console.log(gradDate)}

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
