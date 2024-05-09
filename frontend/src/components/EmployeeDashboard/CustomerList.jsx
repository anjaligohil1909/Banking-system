import * as React from "react";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import TableComponent from "./Table";
import axios from "axios";

const columns = [
	{ id: "firstname", label: "First Name", align: "center", minWidth: 130 },
	{ id: "lastname", label: "Last Name", align: "center", minWidth: 130 },
	{ id: "email", label: "Email", align: "center", minWidth: 140 },
	{ id: "phoneno", label: "Phone No.", align: "center", minWidth: 130 }
];

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
			<TableComponent rows={rows} columns={columns} showLink={true}/>
		</>
	);
}

export default CustomerList;
