import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import styled from "styled-components";

const UpdateRecipe = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({});
  const { recipeId } = useParams();

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const response = await fetch(
          `https://dinner-mate-backend-production.up.railway.app/public/${recipeId}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        const data = await response.json();
        setRecipe(data.recipe);
      } catch (err) {
        console.error(err);
      }
    };
    getRecipe();
  }, [recipeId]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await fetch(
        `https://dinner-mate-backend-production.up.railway.app/recipes/update/${recipeId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(recipe),
        }
      );
      navigate(`/recipe/${recipeId}`);
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <>
      <Navbar />
      <FormContainer onSubmit={handleUpdate}>
        <FormTitle>Make Some Changes</FormTitle>
        <FormLabel>
          Category:
          <FormSelect
            type="text"
            value={recipe.category}
            onChange={(event) =>
              setRecipe({ ...recipe, category: event.target.value })
            }
          >
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Dessert">Dessert</option>
          </FormSelect>
        </FormLabel>
        <FormLabel> 
          Name
          <FormInput
            type="text"
            value={recipe.title}
            onChange={(event) =>
              setRecipe({ ...recipe, title: event.target.value })
            }
          />
        </FormLabel>
        <FormLabel>
          Ingredients
          <FormTextarea
            value={recipe.ingredients}
            onChange={(event) =>
              setRecipe({ ...recipe, ingredients: event.target.value })
            }
          />
        </FormLabel>
        <FormLabel>
          Instructions:
          <FormTextarea
            value={recipe.instructions}
            onChange={(event) =>
              setRecipe({ ...recipe, instructions: event.target.value })
            }
          />
        </FormLabel>
        <FormLabel>
          Cooking Time
            <FormInput
              type="number"
              value={recipe.cookingTime}
              onChange={(event) =>
                setRecipe({ ...recipe, cookingTime: event.target.value })
              }
            />
        </FormLabel>
        <FormLabel>
          Serving Size
          <FormSelect
            type="number"
            value={recipe.servingSize}
            onChange={(event) =>
              setRecipe({ ...recipe, servingSize: event.target.value })
            }
          >
            <option value="">Serving Size</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </FormSelect>
        </FormLabel>
        <FormButton type="submit" onClick={handleUpdate}>
          Update
        </FormButton>
      </FormContainer>
    </>
  );
};

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  width: 100%;
  margin: 50px auto;
`;

const FormTitle = styled.h1`
  margin-bottom: 30px;
`;

const FormInput = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  padding: 10px;
  font-size: 16px;
  color: #333333;
  border: none;
  border-bottom: 1.5px solid #888888;
  &:focus { 
    outline: none; 
    border-bottom: 1.5px solid #f27121;
    transition: border-bottom 0.5s ease-in-out;
  }

`;

const FormTextarea = styled.textarea`
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
  font-size: 16px;
  color: #333333;
  border: none;
  min-height: 100px;
  border-bottom: 1.5px solid #888888;
  &:focus { 
    outline: none; 
    border-bottom: 1.5px solid #f27121;
    transition: border-bottom 0.5s ease-in-out;
  }
`;

const FormSelect = styled.select`
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  padding: 10px;
  font-size: 16px;
  color: #333333;
  border: none;
  border-bottom: 1px solid #888888;
  &:focus { 
    transition: border-bottom 0.2s ease-in-out;
    outline: none;
    border-bottom: 1.5px solid #f27121;

  }
`;

const FormButton = styled.button`
  width: 20%;
  height: 40px;
  background-color: #333333;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background: linear-gradient(to right, #f27121, #e94057);
  }
  @media (max-width: 600px) {
    font-size: 1rem;
    width: 50%;
  }
`;
const FormLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
  font-size: 16px;
  color: #333333;
`;

export default UpdateRecipe;
