import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import CartDetailsTable from "./CartDetailsTable";
import { deleteAll, selectTotalCartCost } from "../slices/CartItemSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

export interface ICartSummaryProps {}

export function CartSummary() {
  const dispatch = useAppDispatch();
  const totalCartCost = useAppSelector(selectTotalCartCost);

  return (
    <Stack gap={2}>
      <Typography variant="h4" component="div" className="text-center">
        My Cart
      </Typography>
      <Button onClick={() => dispatch(deleteAll())}>Clear Cart</Button>
      <CartDetailsTable />
      <Box textAlign="center">Total: ${totalCartCost.toFixed(2)}</Box>
    </Stack>
  );
}
