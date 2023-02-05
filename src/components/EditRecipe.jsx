import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import styled from "styled-components";

const UpdateRecipe = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({});
  const [category, setCategory] = useState("");
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
        setCategory(data.recipe.category);
      } catch (err) {
        console.error(err);
      }
    };
    getRecipe();
  }, [recipeId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await fetch(
        `https://dinner-mate-backend-production.up.railway.app/recipes/update/${recipeId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            ...recipe,
            category: category,
          }),
        }
      );
      navigate(`/recipe/${recipeId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar />
      <StyledForm onSubmit={handleUpdate}>
        <h2>Edit Recipe</h2>
        <StyledLabel>
          Title:
          <StyledInput
            type="text"
            value={recipe.title}
            onChange={(event) =>
              setRecipe({ ...recipe, title: event.target.value })
            }
          />
        </StyledLabel>
        <StyledLabel>
          Ingredients:
          <StyledTextarea
            value={recipe.ingredients}
            onChange={(event) =>
              setRecipe({ ...recipe, ingredients: event.target.value })
            }
          />
        </StyledLabel>
        <StyledLabel>
          Instructions:
          <StyledTextarea
            value={recipe.instructions}
            onChange={(event) =>
              setRecipe({ ...recipe, instructions: event.target.value })
            }
          />
        </StyledLabel>
        <StyledLabel>
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Dessert">Dessert</option>
            <option value="Snack">Snack</option>
          </select>
        </StyledLabel>
        <StyledButton type="submit">Update Recipe</StyledButton>
      </StyledForm>
    </div>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px; ;
`;

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin: 20px 0; ;
`;

const StyledInput = styled.input`
  padding: 10px;
  font-size: 16px; ;
`;
const StyledTextarea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  height: 150px;
  width: 400px; ;
`;
const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer; ;
`;

export default UpdateRecipe;
