import {
  createSelector,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { AppState } from "../store";
import StoreAPI from "../apis/StoreAPI";

export type ProductState = {
  entities: Product[];
};

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (params: Pagination) => {
    const response = await StoreAPI.getProducts(params);
    return response?.products;
  }
);

const initialState: ProductState = {
  entities: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.entities.push(...action.payload);
    });
  },
});

export const productsReducer = productsSlice.reducer;

export const productsSelector = (state: AppState) => state.products;
export const selectAllProducts = createSelector(
  productsSelector,
  (products) => products.entities
);

export default productsSlice;
