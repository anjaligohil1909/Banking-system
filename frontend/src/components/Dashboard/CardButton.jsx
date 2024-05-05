import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AdbIcon from "@mui/icons-material/Adb";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Button,
  CardActionArea,
  CardActions,
  Icon,
} from "@mui/material";

export default function CardButton({accountDetails}) {
  const navigate = useNavigate();

  return (
    <Card sx={{  backgroundColor: "#F0F8FF"}}>
      <CardActionArea sx={{px:5}}>
        <div className="cardbtn-header">
          <Avatar
            alt="Anjali Gohil"
            src="/static/images/avatar/2.jpg"
            sx={{ backgroundColor: "black", color: "white" }}
          />
          <Typography variant="h6"> Anjali Gohil</Typography>
          </div>

        <CardContent>
          <Typography gutterBottom variant="h6">Account Type: {accountDetails[0]} </Typography>
          <Typography gutterBottom variant="h6">Account Number: {accountDetails[1]} </Typography>
          <Typography gutterBottom variant="h6">Balance: {accountDetails[2]} </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{float: "right", marginRight: 1}}>
        <Button size="small" color="primary" onClick={() => navigate(`/customer/${accountDetails[0].toLowerCase()}`)}>
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}
