import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./Navbar";

const AddRecipe = () => {
  // this under
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);
  const handleSubmit = () => {
    setSubmitClicked(true);
  };
  const [showButton, setShowButton] = useState(true);

  const handleAddRecipe = () => {
    setShowButton(false);
  };
  const [formData, setFormData] = useState({
    title: "",
    ingredients: [],
    instructions: [],
    category: "",

    cookingTime: "",
    servingSize: "",
    rating: "",

    comments: [],
  });

  const [recipeId, setRecipeId] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    if (e.target.name === "ingredients" || e.target.name === "instructions") {
      const value = e.target.value;
      setFormData({
        ...formData,
        [e.target.name]: value.split("\n"),
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://dinner-mate-backend-production.up.railway.app/recipes/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            ...formData,
            createdAt: new Date(),
          }),
        }
      );
      if (response.ok) {
        console.log(response);
        const json = await response.json();
        setRecipeId(json.recipe._id);
        navigate(`/add-image/${json.recipe._id}`);
      } else {
        const error = await response.json();
        console.error(error);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const [category, setCategory] = useState("");

  const handleCategorySelection = (selectedCategory) => {
    setCategory(selectedCategory);
    setFormData({ ...formData, category: selectedCategory });
  };

  return (
    <>
      <Navbar />
      <FormContainer onSubmit={onSubmit}>
        <FormTitle>Add your own delight here!</FormTitle>
        <div style={{ display: "flex" }}>
          <CategoryBtn
            selected={category === "Breakfast"}
            onClick={() => handleCategorySelection("Breakfast")}
          >
            Breakfast
          </CategoryBtn>
          <CategoryBtn
            selected={category === "Lunch"}
            onClick={() => handleCategorySelection("Lunch")}
          >
            Lunch
          </CategoryBtn>
          <CategoryBtn
            selected={category === "Dinner"}
            onClick={() => handleCategorySelection("Dinner")}
          >
            Dinner
          </CategoryBtn>
          <CategoryBtn
            selected={category === "Dessert"}
            onClick={() => handleCategorySelection("Dessert")}
          >
            Dessert
          </CategoryBtn>
        </div>
        <FormInput
          type="text"
          name="title"
          placeholder="Name your Creation here..."
          value={formData.title}
          onChange={onChange}
          required
        />
        <FormTextarea
          name="ingredients"
          placeholder="Example: Salt, Chicken, Salad"
          value={formData.ingredients}
          onChange={onChange}
          required
        />
        <FormTextarea
          name="instructions"
          placeholder="Example: Preheat oven to 350°F.
          In a large bowl, combine flour, sugar, and baking powder.
          Add in the butter, eggs, and milk. Mix until well combined."
          value={formData.instructions}
          onChange={onChange}
          required
        />
        <FormSelect
          name="servingSize"
          value={formData.servingSize}
          onChange={onChange}
          required
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
        <FormInput
          type="number"
          name="cookingTime"
          placeholder="Cooking Time (in minutes)"
          value={formData.cookingTime}
          onChange={onChange}
          min="1"
          max="50"
        />
        <FormSelect
          name="rating"
          value={formData.rating}
          onChange={onChange}
          required
          min="1"
          max="5"
          type="number"
        >
          <option value="">Rate Your Creation!</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </FormSelect>
        {showButton && (
          <FormButton onClick={handleAddRecipe}>Add Recipe</FormButton>
        )}
      </FormContainer>
    </>
  );
};
const CategoryBtn = styled.button`
  display: flex;
  color: white;
  flex-direction: column;
  font-size: 1.15rem;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 2rem;
  margin-bottom: 3rem;
  border: none;
  background: ${({ selected }) =>
    selected ? "linear-gradient(to right, #f27121, #e94057)" : " #494949"};
  width: 6rem;
  height: 6rem;
  cursor: pointer;
  transform: scale(0.8);
  @media (max-width: 600px) {
    width: 4rem;
    height: 4rem;
    margin-right: 1rem;
    font-size: 0.9rem;
  }
  &:hover {
    background: linear-gradient(to right, #f27121, #e94057);
    transition: 2s ease-in-out 1s;
  }
  &:active {
    background: linear-gradient(to right, #f27121, #e94057);
  }
`;
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

export default AddRecipe;
