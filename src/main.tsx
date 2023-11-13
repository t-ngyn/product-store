import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import { ProductList } from "./components/ProductList.tsx";
import { CartSummary } from "./components/CartSummary.tsx";
import { SkipProvider } from "./contexts/SkipContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ProductList />,
      },
      {
        path: "/cart",
        element: <CartSummary />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <SkipProvider>
      <RouterProvider router={router} />
    </SkipProvider>
  </Provider>
);
