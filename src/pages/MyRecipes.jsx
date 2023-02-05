import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Rating from "../components/StarRating";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import Category from "../components/Category";

const MyRecipes = () => {
  const [myRecipes, setMyRecipes] = useState([]);
  const { userId } = useParams();
  const [currentUserId, setCurrentUserId] = useState("");
  const [hover, setHover] = useState(false)

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
        <Navbar />
        <Search />
        <Category />
        {myRecipes.length > 0 ? (
          <Grid>
              {myRecipes.map((recipes) => {
                  return (
                      <Card key={recipes._id}>
                          <Link to={"/recipe/" + recipes._id}>
                              <img src={recipes.image} alt="" />
                              <h4>{recipes.title}</h4>
                          </Link>
                          <EditDeleteContainer>
                            <EditButton onClick={() => handleUpdate(recipes._id)}>Edit</EditButton>
                            <DeleteButton onClick={() => handleDelete(recipes._id)}>Delete</DeleteButton>
                          </EditDeleteContainer>
                      </Card>
                  )
          })}
          </Grid>
        ) : (
          <h1>Looks like you don't have any recipes, either create one or browse
          around to find some you like.</h1>
        )}
      </>
    )
}

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
        opacity: 1;
        transition: opacity 0.5s ease-in-out;
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
const EditButton = styled.button`
  position: relative;
  justify-content: center;
  border: none;
  text-decoration: none;
  background-color: white;
  color: red;
  cursor: pointer;
  justify-content: space-between;
`;

const DeleteButton = styled.button`
  position: relative;
  justify-content: center;
  border: none;
  text-decoration: none;
  background-color: white;
  color: red;
  justify-content: space-between;
  cursor: pointer;
`;

const EditDeleteContainer = styled.div`
    display: flex;
    justify-content: center;
`


export default MyRecipes;
