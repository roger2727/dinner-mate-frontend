import React from 'react'
import Home from './Home'
import MealTime from './MealTime'
import { Route, Routes } from "react-router-dom"
import Searched from './Searched'
import Recipe from './Recipe'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import AddRecipe from '../components/AddRecipe'
import MyRecipes from './MyRecipes'

const Pages = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/mealTime/:type" element={<MealTime />} />
                <Route path="/searched/:search" element={<Searched />} />
                <Route path="/recipe/:name" element={<Recipe />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/addrecipe" element={<AddRecipe />} />
                <Route path="/myrecipes" element={<MyRecipes />} />
            </Routes>
        </>

    )
}

export default Pages