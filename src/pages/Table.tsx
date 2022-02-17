import React, { useState, useContext } from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { TableHeader } from "../components/tableHeader/TableHeader";
import { TableContent } from "../components/tableContent/TableContent";
import { TableFooterForPgn } from "../components/tableFooterForPgn/TableFooterForPgn";

export const TablePage = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHeader />
        <TableContent />
        <TableFooterForPgn />
      </Table>
    </TableContainer>
  );
};
