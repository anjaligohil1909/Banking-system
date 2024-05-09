import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Button,
  CardActionArea,
  CardActions,
  Icon,
} from "@mui/material";

export default function CardButton({ accountDetails, showLink }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ backgroundColor: "#F0F8FF", width: "400px" }}>
      <CardActionArea sx={{ px: 5 }}>
        <CardContent>
          <Typography gutterBottom variant="h6">
            Account Type: {accountDetails.type}
          </Typography>
          <Typography gutterBottom variant="h6">
            Account Number: {accountDetails.acc_no}
          </Typography>
          {accountDetails.type == "Loan" ? (
            <>
              <Typography gutterBottom variant="h6">
                Principal amount: {accountDetails.bal}
              </Typography>
            </>
          ) : (
            <Typography gutterBottom variant="h6">
              Balance: {accountDetails.bal}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      {showLink==true ? <CardActions sx={{ float: "right", marginRight: 1 }}>
          <Button
            size="small"
            color="primary"
            onClick={() =>
              navigate(`/customer/${accountDetails.type.toLowerCase()}`)
            }
          >
            View Details
          </Button>
        </CardActions> : null}
    </Card>
  );
}
