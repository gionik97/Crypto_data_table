import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import ListIcon from "@mui/icons-material/List";

export const TableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell width={60}>#</TableCell>
        <TableCell width={150}>name</TableCell>
        <TableCell width={130}>24h change</TableCell>
        <TableCell width={130}>price</TableCell>
        <TableCell width={130}>priceBtc</TableCell>
        <TableCell width={130}>marketCap</TableCell>
        <TableCell width={130}>volume</TableCell>
        <TableCell>
          <ListIcon />
        </TableCell>
      </TableRow>
    </TableHead>
  );
};
