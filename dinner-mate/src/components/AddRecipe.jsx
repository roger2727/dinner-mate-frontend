import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Category from './Category'
import styled from 'styled-components'

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
            const response = await fetch (
                `https://dinner-mate-backend-production.up.railway.app/recipes/update/${recipeId}`,
            
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
        
        <FormContainer onSubmit={onSubmit}>
            <FormTitle>Add your own delight here!</FormTitle>
            <Category />
            <FormInput
            type="text"
            name= "title"
            placeholder="Name your Conction here..."
            value={addRecipe.title}
            onChange={onChange}
            required
            />
            <FormTextarea
            name="ingredients"
            placeholder="Example: 
            Salt
            Chicken
            Salad"
            value={addRecipe.ingredients.join('\n')}
            onChange={onChange}
            required
            />
            <FormTextarea
                name="Instructions"
                placeholder="Example: 
                Preheat oven to 350°F.
                In a large bowl, combine flour, sugar, and baking powder.
                Add in the butter, eggs, and milk. Mix until well combined."
                value={addRecipe.instructions}
                onChange={onChange}
                required
            />
            <FormSelect
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
            </FormSelect>
            <FormInput 
                type="text"
                name="cookingTime"
                placeholder="Cooking Time (in minutes)"
                value={addRecipe.cookingTime}
                onChange={onChange}

            />
        <FormButton type="submit">Add Recipe</FormButton>
      </FormContainer>
    )
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #E8E8E8;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #888888;
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
  border-radius: 5px;
  border: none;
  box-shadow: 0px 0px 5px #888888;
`;

const FormTextarea = styled.textarea`
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
  font-size: 16px;
  color: #333333;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 0px 5px #888888;
  min-height: 100px;


`;

const FormSelect = styled.select`
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  padding: 10px;
  font-size: 16px;
  color: #333333;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 0px 5px #888888;
`;

const FormButton = styled.button`
  width: 20%;
  height: 40px;
  background-color: #333333;
  color: #FFFFFF;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #444444;
  }
`;

export default AddRecipe