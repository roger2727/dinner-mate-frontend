import React from 'react'
import Home from './Home'
import MealTime from './MealTime'
import { Route, Routes } from "react-router-dom"
import Searched from './Searched'

const Pages = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/mealTime/:type" element={<MealTime />} />
                <Route path="/searched/:search" element={<Searched />} />
            </Routes>
        </>

    )
}

export default Pages