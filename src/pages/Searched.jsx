import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Category from "../components/Category";
import styled from 'styled-components'
import Navbar from "../components/Navbar";
import Search from "../components/Search";

const RecipeTitle = () => {
  const [recipes, setRecipes] = useState([]);
  const { title } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `https://dinner-mate-backend-production.up.railway.app/public/search-title/${title}`
        );
        const data = await res.json();
        setRecipes(data.recipes);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [title]);

  return (
    <>
      <Navbar />
      <Search />
      <Category />
      <Grid>
        {recipes.map((recipe) => {
          return (
            <Card key={recipe._id}>
              <Link to={"/recipe/" + recipe._id}>
                <img src={recipe.image} alt={recipe.title} />
                <h4>{recipe.title}</h4>
              </Link>
            </Card>
          )
        })}
      </Grid>
    </>
  );
};

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


export default RecipeTitle;
