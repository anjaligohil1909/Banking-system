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

export default function NewAccountPage() {
  const [salutation, setSalutation] = useState("");
  const handleSalutationChange = (event) => {
    setSalutation(event.target.value);
  };
  const [accountType, setAccountType] = useState("");
  const handleAccountTypeChange = (event) => {
    setAccountType(event.target.value);
  };

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" mb={2}>
        <Link underline="hover" color="inherit" href="/">
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
            <MenuItem value={"Checkings"}>Checkings</MenuItem>
            <MenuItem value={"Savings"}>Savings</MenuItem>
          </Select>
        </FormControl>
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
        <FormControl sx={{ display: "block" }}>
          <TextField
            name="DOB"
            label="Date Of Birth"
            InputLabelProps={{ shrink: true, required: true }}
            type="date"
          />
        </FormControl>
        <FormControl sx={{ display: "block", width: "100%" }}>
          <TextField required type="text" label="Email"></TextField>
          <TextField required type="text" label="Password"></TextField>
        </FormControl>
        <FormControl sx={{ display: "block", width: "100%" }}>
          <TextField required type="text" label="Social Security Number"></TextField>
          <TextField required type="text" label="Phone Number"></TextField>
        </FormControl>
        <FormControl sx={{ display: "inline", width: "100%" }}>
          <TextField required type="text" label="Street Address"></TextField>
          <TextField type="text" label="Apt No./Unit"></TextField>
        </FormControl>
        <FormControl sx={{ display: "block", width: "100%" }}>
          <TextField required type="text" label="City"></TextField>
          <TextField required type="text" label="State"></TextField>
          <TextField required type="text" label="ZipCode"></TextField>
        </FormControl>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            margin: "10px",
          }}
        >
          <Button variant="contained" color="success">
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
