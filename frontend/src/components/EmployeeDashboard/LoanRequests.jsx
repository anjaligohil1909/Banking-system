import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import TableComponent from "./Table";
import axios from "axios";
import { Button } from "@mui/material";

export default function LoanRequests() {
  const [requestList, setRequestList] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/employee/loan-requests")
      .then((res) => {
        console.log(res);
        if (res.data.length != 0) {
			const custPromises = res.data.map((req) => {
            return axios
              .get(`http://127.0.0.1:8000/api/employee/request/${req.req_id}`)
              .then((req_data) => {
                console.log(req_data.data);
                req.cust_id = req_data.data[0].cust_id;
				console.log(req);
                return req;
              });
          });
		  console.log(custPromises);
          return Promise.all(custPromises);
        }
      }).then((reqWithCustId) => { 
		console.log(reqWithCustId)
		setRequestList(reqWithCustId);
	  });
  }, []);

  const columns = [
    { id: "customerid", label: "Customer ID", align: "center", minWidth: 130 },
    { id: "amount", label: "Amount", align: "center", minWidth: 130 },
    { id: "term", label: "Term", align: "center", minWidth: 140 },
    {
      id: "interestRate",
      label: "Interest Rate",
      align: "center",
      minWidth: 140,
    },
    { id: "type", label: "Type of Loan", align: "center", minWidth: 130 },
    {
      id: "action",
      label: "Approve / Deny",
      align: "center",
      minWidth: 100,
      renderCell: (rowData) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="success"
            //   onClick={() => handleButtonClick(rowData)}
            sx={{ fontSize: "10px" }}
          >
            Approve
          </Button>
          <Button
            variant="outlined"
            color="error"
            //   onClick={() => handleButtonClick(rowData)}
            sx={{ fontSize: "10px" }}
          >
            Decline
          </Button>
        </div>
      ),
    },
  ];

  let rows = [];

  function formatData() {
    rows = requestList.map(({ cust_id, ltype, lamount, lmonths, lrate }) => {
      const createData = (customerid, type, amount, term, interestRate) => ({
        customerid,
        type,
        amount,
        term,
        interestRate,
      });

      return createData(cust_id, ltype, lamount, lmonths, lrate);
    });
  }

  return (
    <>
      <h2 style={{ marginBottom: "2rem" }}>Pending Loan Requests</h2>
      <SearchBar />
      {requestList ? formatData() : null}
      <TableComponent rows={rows} columns={columns} showLink={false} />
    </>
  );
}
