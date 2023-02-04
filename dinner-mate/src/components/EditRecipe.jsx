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
    <form onSubmit={handleUpdate}>
      <h1>You want to make changes? We get it, update away...</h1>
      <Category />
      <input
        type="text"
        name="title"
        placeholder="Name your Connection here..."
        value={recipe.title}
        onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
      />
      <textarea
        name="ingredients"
        placeholder="Example: 
            Salt
            Chicken
            Salad"
        value={recipe.ingredients.join("\n")}
        onChange={(e) =>
          setRecipe({ ...recipe, ingredients: e.target.value.split("\n") })
        }
        required
      />
      <textarea
        name="Instructions"
        placeholder="Example: 
            Preheat oven to 350°F.
            In a large bowl, combine flour, sugar, and baking powder.
            Add in the butter, eggs, and milk. Mix until well combined."
        value={recipe.instructions}
        onChange={(e) => setRecipe({ ...recipe, instructions: e.target.value })}
        required
      />
      <select
        name="Serving Size"
        value={recipe.servingSize}
        onChange={(e) => setRecipe({ ...recipe, servingSize: e.target.value })}
        required
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
      </select>
      <input
        type="text"
        name="cookingTime"
        placeholder="Cooking Time (in minutes)"
        value={recipe.cookingTime}
        onChange={(e) => setRecipe({ ...recipe, cookingTime: e.target.value })}
      />
      <button type="submit">Update Recipe</button>
    </form>
  );
};

export default EditRecipe;
