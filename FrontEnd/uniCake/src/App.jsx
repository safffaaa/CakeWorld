import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Home from "./pages/Home";
import AddRecipe from "./pages/AddRecipe";
import Mainnav from "./components/Mainnav";

const getAllflavr = async () => {
  try {
    const res = await axios.get("http://localhost:3001/cakes");
    return res.data; 
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; 
  }
};

const Layout = ({ children }) => {
  return (
    <>
      <Mainnav />
      {children}
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
    loader: getAllflavr,
  },
  {
    path: "/MyRecipe",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/MyFav",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/addCakes",
    element: (
      <Layout>
        <AddRecipe />
      </Layout>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
