/// <reference types="vite/client" />

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
};

type CartItem = {
  productId: number;
  quantity: number;
};

type Pagination = { skip: number; limit: number };
