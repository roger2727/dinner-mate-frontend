import React from 'react'
import Home from './Home'
import MealTime from './MealTime'
import { Route, Routes } from "react-router-dom"
import Searched from './Searched'
import Recipe from './Recipe'
import Login from '../components/Login'

const Pages = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/mealTime/:type" element={<MealTime />} />
                <Route path="/searched/:search" element={<Searched />} />
                <Route path="/recipe/:name" element={<Recipe />} />
                <Route path="/Login" element={<Login />} />
            </Routes>
        </>

    )
}

export default Pages