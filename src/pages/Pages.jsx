import React from "react";
import Home from "./Home";
import MealTime from "./MealTime";
import { Route, Routes } from "react-router-dom";
import Searched from "./Searched";
import Navbar from "../components/Navbar"
import Recipe from "./Recipe";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import AddRecipe from "../components/AddRecipe";
import MyRecipes from "./MyRecipes";
import EditRecipe from "../components/EditRecipe";
import AddImage from "../components/AddImage";

const Pages = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mealTime/:category" element={<MealTime />} />
        <Route path="/searched/:search" element={<Searched />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/addrecipe" element={<AddRecipe />} />
        <Route path="/myrecipes" element={<MyRecipes />} />
        <Route path="/editrecipe/:recipeId" element={<EditRecipe />} />
        <Route path="add-image/:recipeId" element={<AddImage />} />
        <Route path="search-title/:title" element={<Searched />} />
      </Routes>
    </>
  );
};

export default Pages;
