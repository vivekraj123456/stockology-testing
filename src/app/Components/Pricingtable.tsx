"use client";
import { useState } from "react";
import {
  Box,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

// Sample Data for Each Tab
const Equity = [
  {
    Our_charges: "Brokerage",
    Equidity_intraday: "0.02%",
    Equidity_Delivery: "0.2%",
    Equidity_Future: "0.02%",
    Equidity_Options: "₹25 per lot",
  },
  {
    Our_charges: "STT (Securities Transaction Tax)",
    Equidity_intraday: " 0.025% sell",
    Equidity_Delivery: "0.1% Buy | Sell",
    Equidity_Future: "0.02% Sell",
    Equidity_Options:
      "0.1% (on premium) Sell In case of Options Exercise 0.125% (on Settlement Price* Quantity) to be paid by the Buyer",
  },
  {
    Our_charges: "Transaction charges",
    Equidity_intraday: "NSE/BSE:0.00297%/0.00375%",
    Equidity_Delivery: "NSE/BSE:0.00297%/0.00375%",
    Equidity_Future:
      "(NSE)- Exchange transaction charge: 0.00173% - Clearing charge: 0.0005%",
    Equidity_Options:
      "(NSE)- Exchange transaction charge: 03503% - Clearing charge: 0.002%",
  },
  {
    Our_charges: "GST",
    Equidity_intraday: " 18% (on brokerage + transaction charges)",
    Equidity_Delivery: "18% (on brokerage + transaction charges)",
    Equidity_Future: "18% (on brokerage + transaction charges)",
    Equidity_Options: "18% (on brokerage + transaction charges)",
  },
  {
    Our_charges: "SEBI Charges",
    Equidity_intraday: "₹10/crore",
    Equidity_Delivery: "₹10/crore",
    Equidity_Future: "₹10/crore",
    Equidity_Options: "₹10/crore",
  },
  {
    Our_charges: "N.S.E. IPFT Charges",
    Equidity_intraday: "₹10/crore",
    Equidity_Delivery: "₹10/crore",
    Equidity_Future: "₹10/crore",
    Equidity_Options: "₹50/crore (on premium)",
  },
];

const Commodity = [
  {
    Our_charges: "Brokerage",
    Commodity_Future: "0.02%",
    Commodity_Options: "₹50 per lot",
  },
  {
    Our_charges: "CTT (Commodities Transaction Tax)",
    Commodity_Future: "0.01% Sell",
    Commodity_Options:
      "0.0418% Sell In case of Options Exercise: 0.125% (on Settlement Price* Quantity) to be paid by the Buyer",
  },
  {
    Our_charges: "Transaction Charges",
    Commodity_Future:
      "- Exchange Txn. charge: 0.0021% - Clearing charge: 0.003% - RMS charge: 0.005% (only NCDEX)",
    Commodity_Options:
      "- Exchange Txn. charge: 0.0418% - Clearing charge: 0.002%",
  },
  {
    Our_charges: "G.S.T.",
    Commodity_Future:
      "18% (on brokerage + transaction charges + clearing charges)",
    Commodity_Options:
      "18% (on brokerage + transaction charges + clearing charges)",
  },
  {
    Our_charges: "SEBI Charges",
    Commodity_Future: "₹10/crore",
    Commodity_Options: "₹10/crore",
  },
];

const Currency = [
  {
    Our_charges: "Brokerage",
    Currency_Future: "0.02%",
    Currency_Options: "₹20 per lot",
  },
  {
    Our_charges: "STT (Securities Transaction Tax)",
    Currency_Future: "No STT",
    Currency_Options: "No STT",
  },
  {
    Our_charges: "Transaction Charges",
    Currency_Future: " NSE Txn. charge: 0.00035% - Clearing charge: 0.0005%",
    Currency_Options: "NSE Txn. charge: 0.0311% - Clearing charge: 0.002%",
  },
  {
    Our_charges: "G.S.T.",
    Currency_Future:
      "18% (on brokerage + transaction charges + clearing charges)",
    Currency_Options:
      "18% (on brokerage + transaction charges + clearing charges)",
  },
  {
    Our_charges: "SEBI Charges",
    Currency_Future: "₹10/crore",
    Currency_Options: "₹10/crore ",
  },
];

export default function MyTabs() {
  const [value, setValue] = useState("1");

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="container mx-auto max-w-7xl">
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          {/* Tabs Navigation */}
          <Box sx={{ borderBottom: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="custom tabs"
              sx={{
                display: "flex",
                "& .MuiTabs-flexContainer": { width: "100%" },
                "& .MuiButtonBase-root": {
                  flexGrow: 1,
                  textAlign: "center",
                  fontSize: ["1rem", "1.5rem"],
                  fontWeight: "bold",
                  color: "#000",
                },
                "& .Mui-selected": { color: "#22C55E" },
                "& .MuiTabs-indicator": { backgroundColor: "#22C55E" },
              }}
            >
              <Tab label="Equity" value="1" />
              <Tab label="Commodity" value="2" />
              <Tab label="Currency " value="3" />
            </TabList>
          </Box>

          {/* Users Table */}
          <TabPanel value="1">
            {renderTable(Equity, [
              "Our charges",
              "Equidity intraday",
              " Equidity Delivery",
              "Equidity Future",
              "Equidity Options",
            ])}
          </TabPanel>

          {/* Stocks Table */}
          <TabPanel value="2">
            {renderTable(Commodity, [
              "Our charges",
              "Commodity Future",
              "Commodity Options",
            ])}
          </TabPanel>

          {/* Orders Table */}
          <TabPanel value="3">
            {renderTable(Currency, [
              "Our charges",
              "Currency Future",
              "Currency Options",
            ])}
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}


function renderTable(data: unknown[], headers: string[]) {
  return (
    <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#abf4c3" }}>
            {headers.map((header, index) => (
              <TableCell
                key={index}
                sx={{ fontWeight: "bold", fontSize: ["0.9rem", "1.1rem"] }}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              sx={{ "&:nth-of-type(odd)": { backgroundColor: "#fafafa" } }}
            >
              {Object.values(row as Record<string, unknown>).map((value, colIndex) => (
                <TableCell key={colIndex}>{value as React.ReactNode}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h1 className="p-4 text-sm sm:text-base text-light">
        {" "}
        <span className="font-semibold text-primary">
          *Condition Applied:
        </span>{" "}
        The above charges are applicable for clients registered online. Charges
        may vary for offline clients (who can avail of extended facilities like
        a higher margin and dedicated Relationship Manager/Dealer).
      </h1>
    </TableContainer>
  );
}