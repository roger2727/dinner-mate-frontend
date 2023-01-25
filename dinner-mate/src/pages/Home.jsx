import TodayPicks from "../components/TodayPicks";
import Trending from "../components/Trending";

import React from "react";

function Home() {
  return (
    <>
      <Category />
      <TodayPicks />
      <Trending />
    </>
  );
}

export default Home;
