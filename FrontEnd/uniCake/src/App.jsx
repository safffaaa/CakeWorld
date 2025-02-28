import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Home from "./pages/Home";
import AddRecipe from "./pages/AddRecipe";
import Mainnav from "./components/Mainnav";
import EditRecipe from "./pages/EditRecipe";
import SingleRecipe from "./pages/SingleRecipe";
import Profile from "./pages/Profile";

const getAllflavr = async () => {
  try {
    const res = await axios.get("http://localhost:8000/cakes");
    return res.data; 
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; 
  }
};

const getMyRecipe = async()=>{
   let user = JSON.parse(localStorage.getItem("user"))
   const allRecipe = await getAllflavr()
   return allRecipe.filter(item => item.createdBy === user._id)
}

const MyFavItem = async ()=>{
  return JSON.parse(localStorage.getItem("fav"))
}

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
    loader : getMyRecipe,
  },
  {
    path: "/MyFav",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
    loader : MyFavItem,
  },
  {
    path: "/addCakes",
    element: (
      <Layout>
        <AddRecipe />
      </Layout>
    ),
  },
  {
    path: "/editRecipe/:id",
    element:(
      <Layout>
        <EditRecipe/>
      </Layout>
    )
  },
  {
    path:"/sigleCake/:id",
    element:(
      <Layout>
        <SingleRecipe/>
      </Layout>
    )
  },
  {
    path:"/Profile/:id",
    element:(
      <Layout>
        <Profile/>
      </Layout>
    )
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
