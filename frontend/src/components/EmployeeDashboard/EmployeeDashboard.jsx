import React from "react";
import {
  Stack,
  Breadcrumbs,
  Divider,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import DashboardTile from "./DashboardTile";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";

const custData = [
  { x: "Jan", y: Math.round((Math.random() * 100) / 2) },
  { x: "Feb", y: Math.round((Math.random() * 100) / 2) },
  { x: "Mar", y: Math.round((Math.random() * 100) / 2) },
  { x: "Apr", y: Math.round((Math.random() * 100) / 2) },
  { x: "May", y: Math.round((Math.random() * 100) / 2) },
  { x: "Jun", y: Math.round((Math.random() * 100) / 2) },
  { x: "Jul", y: Math.round((Math.random() * 100) / 2) },
  { x: "Aug", y: Math.round((Math.random() * 100) / 2) },
  { x: "Sep", y: Math.round((Math.random() * 100) / 2) },
  { x: "Oct", y: Math.round((Math.random() * 100) / 2) },
  { x: "Nov", y: Math.round((Math.random() * 100) / 2) },
  { x: "Dec", y: Math.round((Math.random() * 100) / 2) },
];

function EmployeeDashboard() {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" mb={2}>
        <Typography variant="h4" color="text.primary">
          Dashboard
        </Typography>
      </Breadcrumbs>
      <Divider />
      <Box my={2}>
        <Stack direction="row" spacing={2}>
          <DashboardTile
            bgColor={"#879a86"}
            textColor={"white"}
            title={Math.round((Math.random() * 100) / 2)}
            body={"Loan Requests"}
            linkTo={"/employee/loan-requests"}
          />
          <DashboardTile
            bgColor={"#6e97da"}
            textColor={"white"}
            title={Math.round((Math.random() * 100) / 2)}
            body={"Transaction Requests"}
            linkTo={"/employee/transaction-requests"}
          />
          <DashboardTile
            bgColor={"#48858b"}
            textColor={"white"}
            title={Math.round((Math.random() * 100) / 2)}
            body={"Loan Processed"}
            linkTo={"/"}
          />
        </Stack>
        <Box mt={5}>
          <Typography variant="h4" align="left">
            {" "}
            Customer Summary
          </Typography>
          <Divider />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3, lg: 6 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={2} sm={4} md={6}>
              <LineChart
                dataset={custData}
                xAxis={[{ scaleType: "band", dataKey: "x" }]}
                series={[{ dataKey: "y" }]}
                width={500}
                height={300}
              />
              <Typography variant="title" style={{ margin: "33%" }}>
                Number of Customers
              </Typography>
            </Grid>
            <Grid item xs={2} sm={4} md={6}>
              <PieChart
                series={[
                  {
                    data: [
                      {
                        id: 0,
                        value: Math.round((Math.random() * 100) / 2),
                        label: "Savings",
                      },
                      {
                        id: 1,
                        value: Math.round((Math.random() * 100) / 2),
                        label: "Checkings",
                      },
                      {
                        id: 2,
                        value: Math.round((Math.random() * 100) / 2),
                        label: "Loans",
                      },
                    ],
                    outerRadius: 120,
                    cy: 130,
                    highlightScope: { faded: "global", highlighted: "item" },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },
                  },
                ]}
                width={450}
                height={300}
              />
              <Typography variant="title" style={{ margin: "30%" }}>
                Types of Accounts
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default EmployeeDashboard;
