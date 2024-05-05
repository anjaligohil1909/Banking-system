import React from "react";
import CardButton from "./CardButton";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";

function Saving(props) {
	const { accountNum, routingNum, balance } = props;

	return (
		<Box className="">
			<h2> Savings Account</h2>
			<Card
				sx={{
					backgroundColor: "#F0F8FF",
					width: "fit-content",
					padding: "1rem",
				}}
			>
				<CardContent>
					<Typography gutterBottom variant="h6">Account Number: 123456789</Typography>
					<Typography gutterBottom variant="h6">Routing Number: 6784567090</Typography>
					{/* <Typography gutterBottom variant="h6">Account Number: {accountNum} </Typography> */}
					{/* <Typography gutterBottom variant="h6">Routing Number: {routingNum} </Typography> */}
					<Divider />
					<Typography gutterBottom variant="h6">Balance: $2000.00</Typography>
					{/* <Typography gutterBottom variant="h6">Balance: {balance} </Typography> */}
				</CardContent>
			</Card>
		</Box>
	);
}

export default Saving;
