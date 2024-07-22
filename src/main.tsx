import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./Root.tsx";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/ErrorPage.tsx";
import Category from "./components/Category.tsx";
import { EUrlConstants } from "./common/constants.ts";

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
        path: EUrlConstants.PRODUCTS,
        element: <div>items</div>,
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
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>
);
