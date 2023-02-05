import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import Category from "../components/Category";
import Navbar from "../components/Navbar";
import Search from "../components/Search";


//displays meal time selected by category.
const MealTime = () => {
  const [mealTime, setMealTime] = useState([]);
  const { category } = useParams();

  //fetches api data to filter recipe by category
  useEffect(() => {
    fetch(
      `https://dinner-mate-backend-production.up.railway.app/public/category/${category}`
    )
      .then((res) => res.json())
      .then((data) => setMealTime(data))
      .catch((err) => console.log(err));
  }, [category]);

  // returns components to display on this page, and maps out a recipe to each page. 
  return (
    <>
      <Navbar />
      <Search />
      <Category />
      <h3>{category}</h3>
        <Grid>
          {mealTime.map((recipe) => {
            return (
              <Card key={recipe._id}>
                <Link to={"/recipe/" + recipe._id}>
                  <img src={recipe.image} alt="" />
                  <h4>{recipe.title}</h4>
                </Link>
              </Card>
            );
          })}
        </Grid>
    </>
  );
};

// styling for components.
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(20rem, 1fr));
  grid-template-rows: repeat(3, minmax(20rem, 1fr));
  grid-gap: 3rem;
  overflow: hidden;
  @media (max-width: 1500px) {
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  }
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default MealTime;
