import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Link, useParams } from "react-router-dom";

// const mealTime = () => {

//     const [mealTime, setMealTime] = useState([])
//     const { category } = useParams()

//     const getMealTime = async (category) => {
//         const res = await fetch(`https://dinner-mate-backend-production.up.railway.app/public/${category}`)
//         const data = await res.json()
//         setMealTime(data.category)
//     }

//     useEffect(() => {
//         getMealTime(category)
//     },[category])

const MealTime = () => {
  const [mealTime, setMealTime] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    fetch(
      `https://dinner-mate-backend-production.up.railway.app/public/category/${category}`
    )
      .then((res) => res.json())
      .then((data) => setMealTime(data))
      .catch((err) => console.log(err));
  }, [category]);

  return (
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
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  img {
    width: 50%;
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