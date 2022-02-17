import React, { useState, useContext, useEffect, useRef } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { TableData } from "../../context/AppContext";
import { AppContext } from "../../context/AppContext";

export const TableContent = () => {
  const { data, setData, page, rowsPerPage, setSelectedCoinData } =
    useContext(AppContext);
  const [displayOptions, setDisplayOptions] = useState<boolean>(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>();
  const [rowId, setRowId] = useState<string | undefined>();
  const [chartData, setChartData] = useState<any>();
  const [selectedCoinTableData, setSelectedCoinTableData] =
    useState<TableData>();
  const didMount = useRef(false);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const displayRowOptions = (selectedRow: number) => {
    if (displayOptions) {
      setDisplayOptions(false);
    } else {
      setDisplayOptions(true);
    }
    setSelectedRowIndex(selectedRow);
  };

  const deleteRow = (selectedRow: number) => {
    setDisplayOptions(false);
    const updatedData = [...data];
    console.log(selectedRow);
    updatedData.splice(selectedRow, 1);
    setData(updatedData);
  };

  const getChartData = async () => {
    const url = `https://api.coinstats.app/public/v1/charts?period=1m&coinId=${rowId}`;
    const response = await fetch(url);
    const apidata = await response.json();
    setChartData([apidata]);
  };

  const selectedCoinDataPoints = () => {
    return chartData.map((item: any) => {
      const arr = item.chart.map((mappedItem: any) => {
        return mappedItem[1];
      });
      return [...arr];
    });
  };

  const onCompareChart = (selectedCoin: TableData) => {
    setDisplayOptions(false);
    setRowId(selectedCoin.id);
    setSelectedCoinTableData(selectedCoin);
  };

  useEffect(() => {
    if (chartData) {
      setSelectedCoinData((oldArray: []) => [
        ...oldArray,
        {
          tableData: selectedCoinTableData,
          charDataPoins: selectedCoinDataPoints(),
        },
      ]);
    }
  }, [chartData]);

  useEffect(() => {
    if (didMount.current) {
      getChartData();
    } else {
      didMount.current = true;
    }
  }, [rowId]);

  return (
    <TableBody>
      {(rowsPerPage > 0
        ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : data
      ).map((row: TableData, index: number) => {
        return (
          <TableRow
            key={row.rank}
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            <TableCell component="th" scope="row">
              {index + 1}
            </TableCell>
            <TableCell
              sx={{
                fontSize: 12,
              }}
            >
              <img
                style={{
                  width: 20,
                  height: 20,
                  verticalAlign: "bottom",
                  marginRight: 5,
                }}
                src={row.icon}
              />
              {row.name} {row.symbol}
            </TableCell>
            <TableCell
              sx={{
                ...(row.priceChange1d > 0
                  ? { color: "green" }
                  : { color: "red" }),
              }}
            >
              {row.priceChange1d}
            </TableCell>
            <TableCell>{row.price}</TableCell>
            <TableCell>{row.priceBtc}</TableCell>
            <TableCell>{row.marketCap}</TableCell>
            <TableCell>{row.volume}</TableCell>
            <TableCell sx={{ position: "relative" }}>
              <MoreHorizIcon
                sx={{ cursor: "pointer" }}
                onClick={() => displayRowOptions(row.rank)}
              />
              {displayOptions && selectedRowIndex === row.rank && (
                <Box
                  sx={{
                    position: "absolute",
                    background: "aliceblue",
                    top: 40,
                    left: -15,
                    zIndex: 1,
                  }}
                >
                  <Button onClick={() => deleteRow(index)}>x</Button>
                  <Button
                    onClick={() => onCompareChart(row)}
                    sx={{ fontSize: 11 }}
                  >
                    Add to compare
                  </Button>
                </Box>
              )}
            </TableCell>
          </TableRow>
        );
      })}
      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
};
