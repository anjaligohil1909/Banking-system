import * as React from "react";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import TableComponent from "./Table";
import axios from "axios";

const columns = [
	{ id: "firstname", label: "First Name", align: "center", minWidth: 130 },
	{ id: "lastname", label: "Last Name", align: "center", minWidth: 130 },
	{ id: "email", label: "Email", align: "center", minWidth: 140 },
	{ id: "phoneno", label: "Phone No.", align: "center", minWidth: 130 },
	// {
	//   id: "noofacc",
	//   label: "Number of Accounts",
	//   align: "center",
	//   maxWidth: 100,
	// },
];

// const rows = [
//   createData("Anjali", "Gohil", "anjali@gmail.com", 3451234325),
//   createData("John", "Doe", "john@example.com", 1234567890),
//   createData("Jane", "Smith", "jane@example.com", 9876543210),
//   createData("Alice", "Johnson", "alice@example.com", 5551234567),
//   createData("Bob", "Brown", "bob@example.com", 9998887777),
//   createData("Emily", "Davis", "emily@example.com", 1112223335),
//   createData("Michael", "Wilson", "michael@example.com", 4445556666),
//   createData("Sarah", "Anderson", "sarah@example.com", 7778889999),
//   createData("David", "Martinez", "david@example.com", 2223334444),
//   createData("Olivia", "Taylor", "olivia@example.com", 8889990000),
//   createData("James", "Lee", "james@example.com", 6667778888),
//   createData("Sophia", "Brown", "sophia@example.com", 3334445555),
// ];

let rows = [];

function CustomerList() {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [dataList, setDataList] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"http://127.0.0.1:8000/api/customers/"
				);
				setData(response.data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	// const example = [
	//   {
	//       "cust_id": "C0001",
	//       "cust_fname": "John",
	//       "cust_lname": "Doe",
	//       "cust_email": "john.doe@example.com",
	//       "cust_password": "password123",
	//       "cust_dob": "1990-01-01T00:00:00Z",
	//       "cust_phno": 1234567890
	//   },
	//   {
	//       "cust_id": "C0002",
	//       "cust_fname": "Jane",
	//       "cust_lname": "Smith",
	//       "cust_email": "jane.smith@example.com",
	//       "cust_password": "password456",
	//       "cust_dob": "1985-05-15T00:00:00Z",
	//       "cust_phno": 9876543210
	//   },
	//   {
	//       "cust_id": "C0003",
	//       "cust_fname": "Michael",
	//       "cust_lname": "Johnson",
	//       "cust_email": "michael.johnson@example.com",
	//       "cust_password": "password789",
	//       "cust_dob": "1992-12-10T00:00:00Z",
	//       "cust_phno": 5555555555
	//   }]

	function formatData() {
		rows = data.map(({ cust_fname, cust_lname, cust_email, cust_phno }) => {
			const createData = (firstname, lastname, email, phoneno) => ({
				firstname,
				lastname,
				email,
				phoneno,
			});

			return createData(cust_fname, cust_lname, cust_email, cust_phno);
		});
		console.log(rows);
	}

	return (
		<>
			<h2 style={{ marginBottom: "2rem" }}>List of Customers</h2>
			<SearchBar />
			{data ? formatData() : null}
			<TableComponent rows={rows} columns={columns} />
		</>
	);
}

export default CustomerList;
