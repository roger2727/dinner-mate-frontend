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
        <Grid>
            {myRecipes.map((recipes) => {
                return (
                    <Card 
                    key={recipes._id}
                    hover={hover}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    >
                        <Link to={"/recipe/" + recipes._id}>
                            <img src={recipes.image} alt="" />
                            <h4>{recipes.title}</h4>
                        </Link>
                        <EditButton onClick={() => handleUpdate(recipes._id)} >Edit</EditButton>
                        <DeleteButton onClick={() => handleDelete(recipes._id)} >Delete</DeleteButton>
                    </Card>
                )
        })}
        </Grid>
      </>
    )
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(20rem, 1fr));
    grid-template-rows: repeat(3, minmax(20rem, 1fr));
    grid-gap: 3rem;

    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    }
`;

const Card = styled.div`
    img {
        width: 100%;
        border-radius: 2rem;
        opacity: ${(props) => (props.hover ? "0.5" : "1")}
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
  position: absolute;
  top: 1rem;
  right: 1rem;
  border-radius: 0.25rem;
  padding: 0.5rem;
  margin: 0.5rem;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 5rem;
  border-radius: 0.25rem;
  padding: 0.5rem;
  margin: 0.5rem;
`;

export default MyRecipes;
