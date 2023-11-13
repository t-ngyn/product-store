import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "../slices/ProductSlice";
import { cartItemsReducer } from "../slices/CartItemSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    cartItems: cartItemsReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
