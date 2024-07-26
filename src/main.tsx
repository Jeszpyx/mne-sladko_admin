import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./Root.tsx";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/ErrorPage.tsx";
import Category from "./components/Category/Category.tsx";
import { EUrlConstants } from "./common/constants.ts";
import { Toaster } from "sonner";
import CategoryEdit from "./components/Category/CategoryEdit.tsx";
import Products from "./components/Products/Products.tsx";
import ProductCreateUpdate from "./components/Products/ProductCreateUpdate.tsx";
import '@mantine/dropzone/styles.css';
import '@mantine/carousel/styles.css';
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: EUrlConstants.CATEGORY,
        element: <Category />,
      },
      {
        path: EUrlConstants.CATEGORY_EDIT,
        element: <CategoryEdit />,
      },
      {
        path: EUrlConstants.PRODUCTS,
        element: <Products />,
      },
      {
        path: EUrlConstants.PRODUCTS_CREATE,
        element: <ProductCreateUpdate type={"create"} />,
      },
      {
        path: EUrlConstants.PRODUCTS_EDIT,
        element: <ProductCreateUpdate type={"update"} />,
      },
      {
        path: EUrlConstants.SETTINGS,
        element: <div>settings</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <MantineProvider defaultColorScheme="dark">  */}
    <MantineProvider>
      <Toaster
        position="bottom-center"
        richColors
        closeButton
        duration={2500}
      />
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>
);
