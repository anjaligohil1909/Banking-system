import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AttachMoneyOutlined from "@mui/icons-material/AttachMoneyOutlined";
import { Button, Divider, Stack, Paper } from "@mui/material";
import KeyBoardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyBoardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function AccountTile({ index, accountDetails }) {
  const [expanded, setExpanded] = useState([]);

  const handleExpandClick = (idx) => {
    debugger;
    if (expanded.includes(idx)) {
      let newOpenArray = expanded.filter((item) => item !== idx);
      setExpanded(newOpenArray);
    } else {
      let newOpenArray = [...expanded];
      newOpenArray.push(idx);
      setExpanded(newOpenArray);
    }
  };

  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <Card sx={{ backgroundColor: "#F0F8FF", maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {Array.from(accountDetails.accountType)[0]}
          </Avatar>
        }
        title={accountDetails.accountType + " Loan"}
        subheader={USDollar.format(accountDetails.principalAmt)}
      />
      <CardContent>
        <Stack sx={{ width: "100%" }}>
          <Stack
            spacing={{ xs: 3, sm: 4 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ flexGrow: 1 }}
            >
              Interest Rate
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ flexGrow: 1, textAlign: "right" }}
            >
              {(accountDetails.intRate * 100).toFixed(2) + "%"}
            </Typography>
          </Stack>
          <Stack
            spacing={{ xs: 3, sm: 4 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ flexGrow: 1 }}
            >
              Maturity Date
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ flexGrow: 1, textAlign: "right" }}
            >
              {accountDetails.maturityDate}
            </Typography>
          </Stack>
          <Stack
            spacing={{ xs: 3, sm: 4 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ flexGrow: 1 }}
            >
              Next Payment Date
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ flexGrow: 1, textAlign: "right" }}
            >
              {accountDetails.nextPaymentDate}
            </Typography>
          </Stack>
          <Stack
            spacing={{ xs: 3, sm: 4 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ flexGrow: 1 }}
            >
              Installment Amount
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ flexGrow: 1, textAlign: "right" }}
            >
              {USDollar.format(accountDetails.installmentAmt)}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          variant="outlined"
          startIcon={<AttachMoneyOutlined />}
          color="success"
        >
          Make Payment
        </Button>
        <IconButton onClick={() => handleExpandClick(index)}>
          {expanded.includes(index) ? (
            <KeyBoardArrowUpIcon />
          ) : (
            <KeyBoardArrowDownIcon />
          )}
        </IconButton>
      </CardActions>
      <Collapse in={expanded.includes(index)} timeout="auto">
        <Divider />
        <CardContent>
          <Stack sx={{ width: "100%" }}>
            <Stack
              spacing={{ xs: 3, sm: 4 }}
              direction="row"
              useFlexGap
              flexWrap="wrap"
            >
              <Typography sx={{ flexGrow: 1 }}>Account Number</Typography>
              <Typography sx={{ flexGrow: 1, textAlign: "right" }}>
                {accountDetails.accountNumber}
              </Typography>
            </Stack>
            <Stack
              spacing={{ xs: 3, sm: 4 }}
              direction="row"
              useFlexGap
              flexWrap="wrap"
            >
              <Typography sx={{ flexGrow: 1 }}>Loan Start Date</Typography>
              <Typography sx={{ flexGrow: 1, textAlign: "right" }}>
                {accountDetails.loanStartDate}
              </Typography>
            </Stack>
            <Stack
              spacing={{ xs: 3, sm: 4 }}
              direction="row"
              useFlexGap
              flexWrap="wrap"
            >
              <Typography sx={{ flexGrow: 1 }}>Loan Term</Typography>
              <Typography sx={{ flexGrow: 1, textAlign: "right" }}>
                {accountDetails.term}
              </Typography>
            </Stack>
            <Stack
              spacing={{ xs: 3, sm: 4 }}
              direction="row"
              useFlexGap
              flexWrap="wrap"
            >
              <Typography sx={{ flexGrow: 1 }}>Loan Approved By</Typography>
              <Typography sx={{ flexGrow: 1, textAlign: "right" }}>
                {accountDetails.loanApprovedBy}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default AccountTile;
