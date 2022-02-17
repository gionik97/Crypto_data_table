import React, {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  createContext,
} from "react";

export interface TableData {
  icon: string;
  id: string;
  marketCap: number;
  name: string;
  price: number;
  priceBtc: number;
  priceChange1d: number;
  rank: number;
  symbol: string;
  volume: number;
}

interface AppContextInterface {
  data: TableData[];
  setData: Dispatch<SetStateAction<any>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: Dispatch<SetStateAction<number>>;
  selectedCoinData: any;
  setSelectedCoinData: Dispatch<SetStateAction<any>>;
}

const contextDefaultValues: AppContextInterface = {
  data: [],
  setData: (): void => {},
  page: 0,
  setPage: (): void => {},
  rowsPerPage: 5,
  setRowsPerPage: (): void => {},
  selectedCoinData: [],
  setSelectedCoinData: (): void => {},
};

export const AppContext =
  createContext<AppContextInterface>(contextDefaultValues);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<TableData[]>(contextDefaultValues.data);
  const [page, setPage] = useState<number>(contextDefaultValues.page);
  const [rowsPerPage, setRowsPerPage] = useState<number>(
    contextDefaultValues.rowsPerPage
  );
  const [selectedCoinData, setSelectedCoinData] = useState(
    contextDefaultValues.selectedCoinData
  );
  //   console.log("data", data);
  console.log("selectedCoinData", selectedCoinData);
  const getData = async () => {
    const url =
      "https://api.coinstats.app/public/v1/coins?skip=0&limit=5&currency=USD";
    const response = await fetch(url);
    const apidata = await response.json();
    setData(apidata.coins);
  };

  useEffect(() => {
    getData();
  }, []);

  const value: AppContextInterface = {
    data,
    setData,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    selectedCoinData,
    setSelectedCoinData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
