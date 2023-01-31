
import TodayPicks from "../components/TodayPicks"
import Trending from "../components/Trending"
import Category from "../components/Category"
import Search from "../components/Search"


import React from "react";

function Home() {

    return (
        <>
            <Search />
            <Category />
            <TodayPicks />
            <Trending />
        </>
    )

}

export default Home;
