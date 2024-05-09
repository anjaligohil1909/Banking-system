import React, { useState, useEffect } from "react";
import {
  Box,
  Divider,
  Typography,
  Breadcrumbs,
  Link,
  Chip,
  Stack,
} from "@mui/material";
import AttachMoneyOutlined from "@mui/icons-material/AttachMoneyOutlined";
import NoteAddOutlined from "@mui/icons-material/NoteAddOutlined";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import AccountTile from "./AccountTile";
import Dummy from "./Dummy";
import moment from "moment";

function Loan(props) {
  const cust_id = "C0001";
  const [accountDetails, setAccountDetails] = useState([]);
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/loans/${cust_id}`).then((res) => {
      console.log(res.data);
      const loanStartDate = moment(res.data.acc_no.date_open, "YYYY-MM-DD");

      let maturityDate = loanStartDate.clone().add(res.data.lmonths, "M");
      let nextPaymentDate = loanStartDate
        .clone()
        .add(1, "months")
        .format("MM/DD/YYYY");
      debugger;
      let acct = {
        id: res.data.id,
        accountType: res.data.ltype,
        accountNumber: res.data.acc_no.acc_no,
        principalAmt: res.data.lamount,
        intRate: res.data.lrate,
        term: res.data.lmonths + " Months",
        maturityDate: maturityDate.format("MM/DD/YYYY"),
        nextPaymentDate: nextPaymentDate,
        installmentAmt: 500,
        loanStartDate: loanStartDate.format("MM/DD/YYYY"),
        loanApprovedBy: "User ABC",
      };
      debugger;
      setAccountDetails([acct]);
    });
  }, []);
  // const accountDetails = [
  //   {
  //     accountType: "Personal",
  //     accountNumber: 123456,
  //     principalAmt: 100000,
  //     intRate: 0.065,
  //     term: "5 years",
  //     maturityDate: "12/31/2029",
  //     nextPaymentDate: "5/31/2025",
  //     installmentAmt: 500,
  //     loanStartDate: "1/1/2024",
  //     loanApprovedBy: "User ABC",
  //   },
  //   // {
  //   //   accountType: "Home",
  //   //   accountNumber: 13579,
  //   //   principalAmt: 1000000,
  //   //   intRate: 0.075,
  //   //   term: "30 years",
  //   //   maturityDate: "12/31/2054",
  //   //   nextPaymentDate: "5/31/2025",
  //   //   installmentAmt: 2500,
  //   //   loanStartDate: "1/1/2024",
  //   //   loanApprovedBy: "User XYZ",
  //   // },
  // ];
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" mb={2}>
        <Link
          underline="hover"
          color="inherit"
          component={RouterLink}
          to="/customer"
        >
          Dashboard
        </Link>
        <Typography color="text.primary">Loans</Typography>
      </Breadcrumbs>
      <Divider />
      <Box>
        <Typography variant="h4" gutterBottom mt={2}>
          Loan Details
        </Typography>
        {/* <Stack direction="row" spacing={1} pb={2}>
          <Chip
            color="success"
            icon={<AttachMoneyOutlined />}
            label="Make Payment"
            component="a"
            clickable
            href="/customer/create-request"
          />
          <Chip
            color="primary"
            icon={<NoteAddOutlined />}
            label="New Loan"
            component="a"
            clickable
            href="/customer/create-request"
          />
        </Stack> */}
        <Stack direction="row" spacing={3}>
          {accountDetails.map((item, idx) => {
            return <AccountTile key={idx} index={idx} accountDetails={item} />;
          })}
        </Stack>
        {/* DO NOT DELETE FOLLOWING */}
        {/* <Stack direction="row" spacing={3}>
          {accountDetails.map((item, idx) => {
            return <Dummy key={idx} index={idx}></Dummy>;
          })}
        </Stack> */}
      </Box>
    </>
  );
}

export default Loan;
