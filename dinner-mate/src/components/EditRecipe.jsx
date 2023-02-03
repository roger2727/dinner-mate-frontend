import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const EditRecipe = () => {
    const navigate = useNavigate()
    const [recipe, setRecipe] = useState({})
    const { recipeId } = useParams()

    const getRecipe = async () => {
        try {
            const res = await fetch(`https://dinner-mate-backend-production.up.railway.app/public/${recipeId}`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('token'),
                    },
                }
            )
            const data = await res.json()
            setRecipe(data.recipe)
        } catch (err) {
            console.error(err)
        }
        
    }
    
    useEffect(() => {
        getRecipe()
    }, [recipeId])

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await fetch (
                `https://dinner-mate-backend-production.up.railway.app/recipes/update/${recipeId}`,
                {
                    method: 'PATCH', 
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                    body: JSON.stringify(recipe)
                }
            )
            navigate('/recipe/:id')
        }
    }



    return (
            <form onSubmit={onSubmit}>
            <h1>You want to make changes? We get it, update away...</h1>
            <Category />
            <input
            type="text"
            name= "title"
            placeholder="Name your Conction here..."
            value={setRecipe.title}
            onChange={onChange}
            required
            />
            <textarea
            name="ingredients"
            placeholder="Example: 
            Salt
            Chicken
            Salad"
            value={setRecipe.ingredients.join('\n')}
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