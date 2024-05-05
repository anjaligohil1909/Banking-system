import React from "react";
import CardButton from "./CardButton";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";

function Loan(props) {
	const { accountNum, loanAmt, intRate, term, amtDisbursed, intAcc, monthlyPay } = props;

	return (
		<Box className="">
			<h2>Loan Details</h2>
			<Card
				sx={{
					backgroundColor: "#F0F8FF",
					width: "fit-content",
					padding: "1rem",
				}}
			>
				<CardContent>
					<Typography gutterBottom variant="h6">Account Number: 578578534</Typography>
          {/* <Typography gutterBottom variant="h6">Account Number: {accountNum} </Typography> */}
          <Divider />
					<Typography gutterBottom variant="h6">Amount Approved: $35,000.00</Typography>
          <Typography gutterBottom variant="h6">Interest Rate: 6.8%</Typography>
          <Typography gutterBottom variant="h6">Term: 5 years</Typography>
          {/* <Typography gutterBottom variant="h6">Amount Approved: {loanAmt} </Typography> */}
          {/* <Typography gutterBottom variant="h6">Interest Rate: {intRate} </Typography> */}
          {/* <Typography gutterBottom variant="h6">Term: {term} </Typography> */}
          <Divider />
          <Typography gutterBottom variant="h6">Amount Disbursed: $15,000.00</Typography>
          <Typography gutterBottom variant="h6">Interest Accumulated: $2,000.00</Typography>
          {/* <Typography gutterBottom variant="h6">Amount Disbursed: {amtDisbursed} </Typography> */}
          {/* <Typography gutterBottom variant="h6">Interest Accumulated: {intAcc} </Typography> */}
          <Divider />
          <Typography gutterBottom variant="h6">Monthly Payment: $150.00</Typography>
					{/* <Typography gutterBottom variant="h6">Monthly Payment: {monthlyPay} </Typography> */}
				</CardContent>
			</Card>
		</Box>
	);
}

export default Loan;
