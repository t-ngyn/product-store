import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, IconButton, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectAllProducts } from "../slices/ProductSlice";
import {
  add,
  remove,
  removeAll,
  selectAllCartItems,
} from "../slices/CartItemSlice";
import { useMemo } from "react";

export default function CartDetailsTable() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectAllCartItems);
  const products = useAppSelector(selectAllProducts);

  const cartItems = useMemo(
    () =>
      items.map((item) =>
        Object.assign(
          { quantity: item.quantity },
          products.find((product) => product.id === item.productId)
        )
      ),
    [items, products]
  );

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Stack direction="row" alignItems="center">
                  <Box sx={{ maxWidth: 300 }}>{row.title}</Box>
                  <IconButton
                    onClick={() => dispatch(removeAll({ productId: row.id }))}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </TableCell>
              <TableCell component="th" scope="row">
                ${row.price.toFixed(2)}
              </TableCell>
              <TableCell align="center">
                <Stack direction="row" alignItems="center">
                  <IconButton
                    onClick={() => dispatch(remove({ productId: row.id }))}
                  >
                    <RemoveCircleOutline />
                  </IconButton>
                  {row.quantity}
                  <IconButton
                    onClick={() => dispatch(add({ productId: row.id }))}
                  >
                    <AddCircleOutline />
                  </IconButton>
                </Stack>
              </TableCell>
              <TableCell align="right">
                ${(row.quantity * row.price).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
