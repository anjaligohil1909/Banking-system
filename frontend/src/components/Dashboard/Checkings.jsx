import { Box, Toolbar } from "@mui/material";
import React from "react";
import CardButton from "./CardButton";
import "./dashboard.css";

function Checkings() {
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
    >
      <Toolbar />
      <div className="cards-container">
        <CardButton accountDetails={["Checkings", "123456789", "$3000.0"]} />
        <CardButton accountDetails={["Saving", "987654321", "$1000.0"]} />
      </div>
    </Box>
  );
}

export default Checkings;
