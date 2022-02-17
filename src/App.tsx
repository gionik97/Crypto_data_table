import React, { useContext } from "react";
import { Sidebar } from "./components/sidebar/Sidebar";
import { TablePage } from "./pages/Table";
import { ChartsPage } from "./pages/Charts";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar />
      <Routes>
        <Route path="/" element={<TablePage />} />
        <Route path="/charts" element={<ChartsPage />} />
      </Routes>
    </Box>
  );
}

export default App;
