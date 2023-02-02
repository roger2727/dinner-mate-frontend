import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Category from './Category'

const AddRecipe = () => {
    const[addRecipe, setAddRecipe] = useState({
        title: '',
        ingredients: [],
        instructions: [],
        category: '',
        cookingTime: '',
        servingSize: '',
        rating: '',

    })

    const [recipeId , setRecipeId] = useState('')
    const navigate = useNavigate()

    const onChange = (e) => {
        if (e.target.name === "ingredients" || e.target.name === "instructions") {
            const value = e.target.value;
            setAddRecipe({
                ...addRecipe,
                [e.target.name]: value.split("\n"),
            })
        }
        else {
            setAddRecipe({ ...addRecipe, [e.target.name]: e.target.value })
        }
    }
    
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
            //url
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({
                        ...addRecipe,
                        createdAt: new Date(),
                    }),
                }
        )
        if (response.ok) {
            console.log(response);
            const json = await response.json();
            setRecipeId(json.recipe._id);
            navigate(`/upload-image/${json.recipe._id}`);
        }
        else {
            const error = await response.json();
            console.error(error);
        }
        } 
        catch (err) {
          console.error(err);
        }
    }

    return (
        
        <form onSubmit={onSubmit}>
            <h1>Add your own delight here!</h1>
            <Category />
            <input
            type="text"
            name= "title"
            placeholder="Name your Conction here..."
            value={addRecipe.title}
            onChange={onChange}
            required
            />
            <textarea
            name="ingredients"
            placeholder="Example: 
            Salt
            Chicken
            Salad"
            value={addRecipe.ingredients.join('\n')}
            onChange={onChange}
            required
            />
            <textarea
            name="Instructions"
            placeholder="Example: 
            Preheat oven to 350°F.
            In a large bowl, combine flour, sugar, and baking powder.
            Add in the butter, eggs, and milk. Mix until well combined."
            value={addRecipe.instructions}
            onChange={onChange}
            required
            />
            <select
                name= "Serving Size"
                value={addRecipe.servingSize}
                onChange={onChange}
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
                value={addRecipe.cookingTime}
                onChange={onChange}

            />
        <button type="submit">Add Recipe</button>
      </form>
    )
}

export default AddRecipe