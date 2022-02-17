import React, { useContext, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { TableData } from "../context/AppContext";
import { AppContext } from "../context/AppContext";

Chart.register(...registerables);

interface DataSets {
  label: string;
  data: number[];
  fill: boolean;
  borderColor: string;
}

interface CoinData {
  tableData: TableData;
  charDataPoins: number[];
}

export const ChartsPage = () => {
  const { selectedCoinData, setSelectedCoinData } = useContext(AppContext);
  const [hiddenLine, setHiddenLine] = useState<boolean>(false);

  const generateRandomColor = () => {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const createDataSets = (): DataSets[] => {
    const dataSetItems = selectedCoinData.map((item: CoinData) => {
      return {
        label: item.tableData.name,
        data: item.charDataPoins[0],
        fill: false,
        borderColor: generateRandomColor(),
        hidden: hiddenLine,
      };
    });
    return dataSetItems;
  };

  const data = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: createDataSets(),
  };

  const deleteCoinData = (selectedCoin: number) => {
    const updatedCoinData = [...selectedCoinData];
    updatedCoinData.splice(selectedCoin, 1);
    setSelectedCoinData(updatedCoinData);
  };

  const hideCoinDataSet = (selectedCoinName: string) => {};

  return (
    <Box
      sx={{
        height: "500px",
        width: "700px",
        textAlign: "center",
        padding: "50px 50px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        {selectedCoinData.map((item: CoinData, index: number) => {
          return (
            <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <img
                src={item.tableData.icon}
                style={{ width: 20, height: 20 }}
              />
              <Typography key={item.tableData.id}>
                {item.tableData.name} - {item.tableData.symbol}
              </Typography>
              <DeleteIcon onClick={() => deleteCoinData(index)} />
            </Box>
          );
        })}
      </Box>
      <Line data={data} />
      {selectedCoinData.map((item: any) => {
        return (
          <FormControlLabel
            key={item.id}
            control={<Checkbox defaultChecked />}
            label={item.tableData.name}
            onClick={() => hideCoinDataSet(item.tableData.name)}
          />
        );
      })}
    </Box>
  );
};
