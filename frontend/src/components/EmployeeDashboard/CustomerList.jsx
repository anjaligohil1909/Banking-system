import * as React from "react";
import SearchBar from "./SearchBar";
import TableComponent from "./Table";

const columns = [
  { id: "firstname", label: "First Name", align: "center", minWidth: 130 },
  { id: "lastname", label: "Last Name", align: "center", minWidth: 130 },
  { id: "email", label: "Email", align: "center", minWidth: 140 },
  { id: "phoneno", label: "Phone No.", align: "center", minWidth: 130 },
  {
    id: "noofacc",
    label: "Number of Accounts",
    align: "center",
    maxWidth: 100,
  },
];

function createData(firstname, lastname, email, phoneno, noofacc) {
  return { firstname, lastname, email, phoneno, noofacc };
}

const rows = [
  createData("Anjali", "Gohil", "anjali@gmail.com", 3451234325, 1),
  createData("John", "Doe", "john@example.com", 1234567890, 2),
  createData("Jane", "Smith", "jane@example.com", 9876543210, 3),
  createData("Alice", "Johnson", "alice@example.com", 5551234567, 1),
  createData("Bob", "Brown", "bob@example.com", 9998887777, 2),
  createData("Emily", "Davis", "emily@example.com", 1112223333, 1),
  createData("Michael", "Wilson", "michael@example.com", 4445556666, 3),
  createData("Sarah", "Anderson", "sarah@example.com", 7778889999, 2),
  createData("David", "Martinez", "david@example.com", 2223334444, 1),
  createData("Olivia", "Taylor", "olivia@example.com", 8889990000, 2),
  createData("James", "Lee", "james@example.com", 6667778888, 3),
  createData("Sophia", "Brown", "sophia@example.com", 3334445555, 1),
];

export default function CustomerList() {

  return (
    <>
      <h2 style={{ marginBottom: "2rem" }}>List of Customers</h2>
      <SearchBar />
      <TableComponent rows={rows} columns={columns}/>
    </>
  );
}
