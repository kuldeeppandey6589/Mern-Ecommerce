import { createBrowserRouter, RouterProvider } from "react-router";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Productdetails from "./pages/Productdetails";


const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/product/:id", element: <Productdetails /> },
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}