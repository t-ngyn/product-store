import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { selectAllProducts } from "./ProductSlice";

export type CartItemState = {
  entities: CartItem[];
};

const initialState: CartItemState = {
  entities: [],
};

const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Pick<CartItem, "productId">>) => {
      const found = state.entities.find(
        (item) => item.productId === action.payload.productId
      );
      if (found) {
        found.quantity++;
      } else {
        state.entities.push({
          productId: action.payload.productId,
          quantity: 1,
        });
      }
    },
    remove: (state, action: PayloadAction<Pick<CartItem, "productId">>) => {
      const index = state.entities.findIndex(
        (item) => item.productId === action.payload.productId
      );
      if (index !== -1) {
        const item = state.entities[index];
        item.quantity--;
        if (item.quantity <= 0) {
          state.entities.splice(index, 1);
        }
      }
    },
    removeAll: (state, action: PayloadAction<Pick<CartItem, "productId">>) => {
      const index = state.entities.findIndex(
        (item) => item.productId === action.payload.productId
      );
      if (index !== -1) {
        state.entities.splice(index, 1);
      }
    },
    deleteAll: (state) => {
      state.entities = [];
    },
  },
});

export const cartItemsReducer = cartItemsSlice.reducer;

export const { add, remove, removeAll, deleteAll } = cartItemsSlice.actions;

export const cartItemsSelector = (state: AppState) => state.cartItems;
export const selectAllCartItems = createSelector(
  cartItemsSelector,
  (cartItems) => cartItems.entities
);

export const selectAllCartItemsCount = createSelector(
  selectAllCartItems,
  (cartItems) => cartItems.reduce((acc, item) => (acc += item.quantity), 0)
);

export const selectTotalCartCost = createSelector(
  [selectAllProducts, selectAllCartItems],
  (products, cartItems) =>
    cartItems.reduce((acc, item) => {
      const product = products.find((product) => product.id === item.productId);
      acc += item.quantity * (product?.price || 0);
      return acc;
    }, 0)
);

export default cartItemsSlice;
