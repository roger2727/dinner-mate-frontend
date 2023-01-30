import React from 'react'
import Home from './Home'
import mealTime from './MealTime'
import { Route, Routes } from "react-router-dom"

const Pages = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/MealTime" element={<mealTime />} />
            </Routes>
        </>

    )
}

export default Pages