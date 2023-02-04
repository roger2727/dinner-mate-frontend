import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Rating from "../components/StarRating";
import "./Recipes.css";

const Recipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [showIngredients, setShowIngredients] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `https://dinner-mate-backend-production.up.railway.app/public/${id}`
      );
      const data = await res.json();
      setRecipe(data.recipe);
    }
    fetchData();
  }, [id]);

  const handleIngredientsClick = () => {
    setShowIngredients(!showIngredients);
    setShowInstructions(false);
  };

  const handleInstructionsClick = () => {
    setShowInstructions(!showInstructions);
    setShowIngredients(false);
  };

  return (
    <>
      <div>
        <div className="recipe-details">
          <div className="image">
            <h2>{recipe.title}</h2>
            <div className="recipe-image">
              <img src={recipe.image} alt={recipe.title} />
            </div>

            <Rating rating={recipe.rating} />
          </div>
          <div className="recipe-info">
            <button onClick={handleIngredientsClick}>Ingredients</button>
            <button onClick={handleInstructionsClick}>Instructions</button>
            {showIngredients && (
              <ul>
                {recipe.ingredients &&
                  recipe.ingredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                  ))}
              </ul>
            )}
            {showInstructions && (
              <ol>
                {recipe.instructions &&
                  recipe.instructions.map((instruction) => (
                    <li key={instruction}>{instruction}</li>
                  ))}
              </ol>
            )}
            <p>Category: {recipe.category}</p>
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
            <p>Serving Size: {recipe.servingSize}</p>
          </div>
        </div>
      </div>
    </>
  );
};

// const Button = styled.button`
//   padding: 1rem 2rem;
//   color: #313131;
//   background: white;
//   border: 2px solid black;
//   margin-right: 2rem;
//   font-weight: 600;
// `;

// const Info = styled.div`
//   margin-left: 10rem;
// `;

export default Recipe;
