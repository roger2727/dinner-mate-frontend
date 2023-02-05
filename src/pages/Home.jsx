
import TodayPicks from "../components/TodayPicks"
import Trending from "../components/Trending"
import Category from "../components/Category"
import Search from "../components/Search"
import Navbar from "../components/Navbar"


import React from "react";
// renders home page with components created.
function Home() {

    return (
        <>
            <Navbar />
            <Search />
            <Category />
            <TodayPicks />
            <Trending />
        </>
    )

}

export default Home;
