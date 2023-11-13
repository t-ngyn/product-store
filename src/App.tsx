import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Outlet, useNavigate } from "react-router-dom";

import "./App.css";
import { selectAllCartItemsCount } from "./slices/CartItemSlice";
import { useAppSelector } from "./hooks";

function App() {
  const navigate = useNavigate();
  const cartItemsCount = useAppSelector(selectAllCartItemsCount);

  return (
    <Box className="flex">
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            onClick={() => navigate("/", { replace: true })}
            className="cursor-pointer text-left grow"
          >
            Product Store
          </Typography>
          <Box>
            <Button
              sx={{ color: "#fff" }}
              onClick={() => navigate("/cart", { replace: true })}
            >
              View Cart {cartItemsCount > 0 && `(${cartItemsCount})`}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3, pt: 5 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default App;
