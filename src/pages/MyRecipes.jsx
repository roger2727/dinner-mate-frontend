import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Rating from "../components/StarRating";
import { Link, useNavigate, useParams } from "react-router-dom";

const MyRecipes = () => {
  const [myRecipes, setMyRecipes] = useState([]);
  const { userId } = useParams();
  const [currentUserId, setCurrentUserId] = useState("");
  const navigate = useNavigate()

  const getMyRecipes = async () => {
    try {
      const res = await fetch(
        `https://dinner-mate-backend-production.up.railway.app/recipes/all`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      setMyRecipes(data.recipes);
      setCurrentUserId(data.userId);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMyRecipes();
  }, [userId]);

  const handleUpdate = (recipeId) => {
    navigate(`/editrecipe/${recipeId}`);
  }

  const handleDelete = async (recipeId) => {
    try {
      await fetch(`https://dinner-mate-backend-production.up.railway.app/recipes/delete/${recipeId}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      setMyRecipes(myRecipes.filter((recipe) => recipe.id !== recipeId))
    }
    catch (err) {
      console.error(err)
    }
  }

    return (
      <>
        <h1>My Recipes!</h1>
        <Grid>
            {myRecipes.map((recipes) => {
                return (
                    <Card key={recipes._id}>
                        <Link to={"/recipe/" + recipes._id}>
                            <img src={recipes.image} alt="" />
                            <h4>{recipes.title}</h4>
                            <Rating rating={recipes.rating} />
                        </Link>
                        <button onClick={() => handleUpdate(recipes._id)} >Edit</button>
                        <button onClick={() => handleDelete(recipes._id)} >Delete</button>
                    </Card>
                )
        })}
        </Grid>
      </>
    )
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 3rem;
`;

const Card = styled.div`
    img {
        width: 20vw;
        border-radius: 2rem;
        align-items: center;
    }
    a {
        text-decoration: none;
    }
    h4 {
        text-align: center;
        padding: 1rem;
    }
    button {
        align-items: center;
        border-radius: 0.25rem;
        padding: 0.5rem;
        margin: 0.5rem;
    }
`;

export default MyRecipes;
