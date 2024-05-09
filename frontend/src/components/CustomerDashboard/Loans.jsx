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
  const [custId, setCustId] = useState(localStorage.getItem('cust_id') || 'defaultCustId');
  const [accountDetails, setAccountDetails] = useState([]);
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/loans/${custId}`).then((res) => {
      console.log(res.data);
      const loanStartDate = moment(res.data.acc_no.date_open, "YYYY-MM-DD");

      let maturityDate = loanStartDate.clone().add(res.data.lmonths, "M");
      let nextPaymentDate = loanStartDate
        .clone()
        .add(1, "months")
        .format("MM/DD/YYYY");
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
      setAccountDetails([acct]);
    });
  }, []);
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
