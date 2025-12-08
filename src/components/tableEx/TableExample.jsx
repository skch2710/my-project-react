import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const TableExample = (props) => {
  const { data } = props;

  return (
    <TableContainer component={Paper} style={{ maxWidth: 500, margin: "auto", marginTop: 50 }}>
      <Table>
        <TableHead style={{ backgroundColor: "#b3d3f3ff"}}>
          <TableRow style={{ border: "1.5px solid black" }}>
            <TableCell style={{ fontWeight: "bold" , padding: "0px 8px 0px 8px" }}>Name</TableCell>
            <TableCell align="right" style={{ fontWeight: "bold" , padding: "0px 8px 0px 8px" }}>Age</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.age}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableExample;
