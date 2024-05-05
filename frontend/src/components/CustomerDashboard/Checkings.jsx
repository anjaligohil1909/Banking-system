import React from "react";
import CardButton from "./CardButton";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";

function Checkings() {
  return (
    <Box className="">
      <h2> Checking Account</h2>
      <Card sx={{  backgroundColor: "#F0F8FF", width: "fit-content", padding: "1rem"}}>
        <CardContent>
          <Typography gutterBottom variant="h6">Account Number: 123456789 </Typography>
          <Typography gutterBottom variant="h6">Routing Number: 0011223344 </Typography>
          <Divider/>
          <Typography gutterBottom variant="h6">Balance: 0011223344 </Typography>

        </CardContent>
      
    </Card>
    </Box>
  );
}

export default Checkings;
