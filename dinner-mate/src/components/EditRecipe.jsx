import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Category from "../components/Category";

const EditRecipe = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({});
  const { recipeId } = useParams();

  const getRecipe = async () => {
    try {
      const res = await fetch(
        `https://dinner-mate-backend-production.up.railway.app/public/${recipeId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const data = await res.json();
      setRecipe(data.recipe);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
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
          body: JSON.stringify(recipe),
        }
      );
      navigate(`/recipe/${recipeId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="update-form">
      <label>
        Title:
        <input
          type="text"
          value={recipe.title}
          onChange={(event) =>
            setRecipe({ ...recipe, title: event.target.value })
          }
        />
      </label>
      <br />
      <label>
        Ingredients:
        <textarea
          value={recipe.ingredients}
          onChange={(event) =>
            setRecipe({ ...recipe, ingredients: event.target.value })
          }
        />
      </label>
      <br />
      <label>
        Instructions:
        <textarea
          value={recipe.instructions}
          onChange={(event) =>
            setRecipe({ ...recipe, instructions: event.target.value })
          }
        />
      </label>
      <br />
      <label>
        Category:
        <input
          type="text"
          value={recipe.category}
          onChange={(event) =>
            setRecipe({ ...recipe, category: event.target.value })
          }
        />
      </label>
      <br />
      <label>
        Cooking Time:
        <input
          type="number"
          value={recipe.cookingTime}
          onChange={(event) =>
            setRecipe({ ...recipe, cookingTime: event.target.value })
          }
        />
      </label>
      <br />
      <label>
        Serving Size:
        <input
          type="number"
          value={recipe.servingSize}
          onChange={(event) =>
            setRecipe({ ...recipe, servingSize: event.target.value })
          }
        />
      </label>
      <br />
      <button type="submit" onClick={handleUpdate}>
        Update Recipe
      </button>
    </form>
  );
};

export default EditRecipe;
