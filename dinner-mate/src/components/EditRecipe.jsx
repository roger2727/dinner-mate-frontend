import React from 'react'

const EditRecipe = () => {
    return (
            <form onSubmit={onSubmit}>
            <h1>You want to make changes? We get it, update away...</h1>
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

export default EditRecipe