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

export default function NewAccountPage() {
	const [salutation, setSalutation] = useState("");
	const [accountType, setAccountType] = useState("");
	const [fname, setfname] = useState("");
	const [lname, setlname] = useState("");
	const [email, setemail] = useState("");
	const [phno, setphno] = useState("");
	const [password, setpassword] = useState("");
	const [dob, setdob] = useState("");
	const [ssn, setssn] = useState("");
	const [balance, setbalance] = useState("");
	const [street, setstreet] = useState("");
	const [state, setstate] = useState("");
	const [city, setcity] = useState("");
	const [zipcode, setzipcode] = useState("");
	const [country, setcountry] = useState("");

	const handleSalutationChange = (event) => {
		setSalutation(event.target.value);
	};

	const handleAccountTypeChange = (event) => {
		setAccountType(event.target.value);
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

	const handlepasswordChange = (event) => {
		setpassword(event.target.value);
	};

	const handledobChange = (event) => {
		setdob(event.target.value);
	};

	const handlessnChange = (event) => {
		setssn(event.target.value);
	};

	const handlebalanceChange = (event) => {
		setbalance(event.target.value);
	};

	const handlestreetChange = (event) => {
		setstreet(event.target.value);
	};

	const handlecityChange = (event) => {
		setcity(event.target.value);
	};

	const handlestateChange = (event) => {
		setstate(event.target.value);
	};

	const handlezipcodeChange = (event) => {
		setzipcode(event.target.value);
	};

	const handlecountryChange = (event) => {
		setcountry(event.target.value);
	};

  const submitFormData = async (formData) => {
		console.log(formData);
		try {
			const response = await axios.post(
				"http://127.0.0.1:8000/api/register/",
				formData
			);
			return response.data; // Return response data
		} catch (error) {
			throw new Error("Failed to submit form data"); // Throw an error if request fails
		}
	};

  const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			
				const formData = {
					"customer":{
            "cust_fname": fname,
            "cust_lname": lname,
            "cust_email": email,
            "cust_password": password,
            "cust_dob": dob,
            "cust_phno": phno,
            "cust_ssn": ssn,
          },
          "account":{
            "acc_type": accountType,
            "balance": balance,
            "routing_no": "110000"
          },
          "address":{
            "city": city,
            "st_add": street,
            "state": state,
            "pos_code": zipcode,
            "country": country,
          },

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
				<Link underline="hover" color="inherit" href="/employee">
					Home
				</Link>
				<Typography color="text.primary">New Account</Typography>
			</Breadcrumbs>
			<Divider />
			<Typography variant="h4" gutterBottom mt={2}>
				Add New Customer
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
					<InputLabel id="type-of-account-label">Account Type</InputLabel>
					<Select
						labelId="type-of-account-label"
						id="type-of-account"
						value={accountType}
						label="Accout Type"
						fullWidth
						onChange={handleAccountTypeChange}
						required
					>
						<MenuItem value={"C"}>Checkings</MenuItem>
						<MenuItem value={"S"}>Savings</MenuItem>
					</Select>
				</FormControl>
				{/* <FormControl
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
        </FormControl> */}
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
				<FormControl sx={{ display: "block" }}>
					<TextField
						name="DOB"
						label="Date Of Birth"
						InputLabelProps={{ shrink: true, required: true }}
						type="date"
						value={dob}
						onChange={handledobChange}
					/>
					<TextField
						name="balance"
						label="Initial Balance"
						InputLabelProps={{ shrink: true, required: true }}
						value={balance}
						onChange={handlebalanceChange}
					/>
				</FormControl>
				<FormControl sx={{ display: "block", width: "100%" }}>
					<TextField
						required
						type="text"
						label="Email"
						value={email}
						onChange={handleEmailChange}
					></TextField>
					<TextField
						required
						type="text"
						label="Password"
						value={password}
						onChange={handlepasswordChange}
					></TextField>
				</FormControl>
				<FormControl sx={{ display: "block", width: "100%" }}>
					<TextField
						required
						type="text"
						label="Social Security Number"
						value={ssn}
						onChange={handlessnChange}
					></TextField>
					<TextField
						required
						type="text"
						label="Phone Number"
						value={phno}
						onChange={handlePhnoChange}
					></TextField>
				</FormControl>
				<FormControl sx={{ display: "inline", width: "100%" }}>
					<TextField
						required
						type="text"
						label="Street Address"
						value={street}
						onChange={handlestreetChange}
					></TextField>
					<TextField
						required
						type="text"
						label="City"
						value={city}
						onChange={handlecityChange}
					></TextField>
					{/* <TextField type="text" label="Apt No./Unit"></TextField> */}
				</FormControl>
				<FormControl sx={{ display: "block", width: "100%" }}>
					<TextField
						required
						type="text"
						label="State"
						value={state}
						onChange={handlestateChange}
					></TextField>
					<TextField
						required
						type="text"
						label="ZipCode"
						value={zipcode}
						onChange={handlezipcodeChange}
					></TextField>
					<TextField
						required
						type="text"
						label="Country"
						value={country}
						onChange={handlecountryChange}
					></TextField>
				</FormControl>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						gap: "1rem",
						margin: "10px",
					}}
				>
					<Button variant="contained" color="success" onClick={handleSubmit}>
						Submit
					</Button>
					<Button variant="outlined" color="error">
						Reset
					</Button>
				</div>
			</Box>
		</>
	);

	//     const [age, setAge] = React.useState('');

	//     const handleChange = (event) => {
	//       setAge(event.target.value);
	//     };

	//     const [salutation, setSalutation] = React.useState('');
	//     const handleSalutationChange = (event) => {
	//         setSalutation(event.target.value);
	//       };

	//     return (
	//         <>
	//         <Breadcrumbs aria-label="breadcrumb" mb={2}>
	//   <Link underline="hover" color="inherit" href="/">
	//     Home
	//   </Link>

	//   <Typography color="text.primary">New Account</Typography>
	// </Breadcrumbs>
	// <Divider/>
	// <Typography variant="h4" gutterBottom mt={2}>
	//         Add New Customer
	//       </Typography>

	//         <Box
	//         component='form'
	//       sx={{
	//         minWidth: 750,
	//         '& .MuiTextField-root': { m: 1, width: '50ch' }, width:'100%',
	//         // '& .MuiOutlinedInput-root': { m: 1, width: '50ch' },
	//         // '& .MuiInputLabel-root': { m: 1, width: '50ch' }

	//       }}
	//       noValidate
	//       autoComplete="off"
	//     >
	//         {/* <FormControl fullWidth={true} style={{display:"inline"}} sx={{ minWidth: 250}}> */}
	//         <InputLabel id="demo-simple-select-autowidth-label">Age</InputLabel>
	//         <Select
	//           labelId="demo-simple-select-autowidth-label"
	//           id="demo-simple-select-autowidth"
	//           value={age}
	//           onChange={handleChange}
	//           sx={{width:250}}
	//           label="Age"
	//         >
	//           <MenuItem value="">
	//             <em>None</em>
	//           </MenuItem>
	//           <MenuItem value={10}>Twenty</MenuItem>
	//           <MenuItem value={21}>Twenty one</MenuItem>
	//           <MenuItem value={22}>Twenty one and a half</MenuItem>
	//         </Select>
	//          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
	//       <TextField id="filled-basic" label="Filled" variant="filled" />
	//       {/* </FormControl> */}
	//         </Box>
	//         </>
	//     );
}
