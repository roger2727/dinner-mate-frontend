import React from 'react'
import Home from './Home'
import { Route, Routes, BrowserRouter } from "react-router-dom"

const Pages = () => {
    return (
        <>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/searched/:search" element={<Search />} />
            </Routes>

        </>

    )
}

export default Pages