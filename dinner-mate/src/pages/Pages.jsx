import React from 'react'
import Home from './Home'
import MealTime from './MealTime'
import { Route, Routes } from "react-router-dom"

const Pages = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/mealTime/:type" element={<MealTime />} />
            </Routes>
        </>

    )
}

export default Pages