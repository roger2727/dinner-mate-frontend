import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const AddRecipe = () => {
  // this under
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);
  const handleSubmit = () => {
    setSubmitClicked(true);
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
      const response = await fetch('https://dinner-mate-backend-production.up.railway.app/recipes/add',
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
        placeholder="Name your Conction here..."
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
        placeholder="Example:
                Preheat oven to 350°F.
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
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </FormSelect>
      <FormButton type="submit">Add Recipe</FormButton>
    </FormContainer>
  );
};
const CategoryBtn = styled.button`
  display: flex;
  color: white;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 2rem;
  border: none;
  background: ${({ selected }) =>
    selected ? "linear-gradient(to right, #f27121, #e94057)" : " #494949"};
  width: 6rem;
  height: 6rem;
  cursor: pointer;
  transform: scale(0.8);
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
  background-color: #e8e8e8;
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
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #444444;
  }
`;

// export default AddRecipe;


//   return (
//     <div>
//       <h1 className="add-title">Add Recipe</h1>
//       <div className="form-box" style={{backgroundColor: "grey", textAlign: "center", borderRadius: "0.5rem", padding: "1rem"}}>
//         <form onSubmit={onSubmit}>
//           <div className="left-half">
//             <div>
//               <label htmlFor="title">Title</label>
//               <input
//                 className="form-input"
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={onChange}
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="category">Category</label>
//               <select
//                 name="category"
//                 value={formData.category}
//                 onChange={onChange}
//                 required
//               >
//                 <option value="">Select a category</option>
//                 <option value="Dinner">Dinner</option>
//                 <option value="Breakfast">Breakfast</option>
//                 <option value="Lunch">Lunch</option>
//                 <option value="Dessert">Dessert</option>
//               </select>
//             </div>
//             <div>
//               <label htmlFor="ingredients">Ingredients</label>
//               <textarea
//                 name="ingredients"
//                 value={formData.ingredients.join("\n")}
//                 onChange={onChange}
//                 required
//                 placeholder="Example: 
//   salt
//   chciken
//   salad"
//               />
//             </div>
//             <div>
//               <label htmlFor="instructions">Instructions</label>
//               <textarea
//                 name="instructions"
//                 value={formData.instructions.join("\n")}
//                 onChange={onChange}
//                 required
//                 placeholder="Example: 
//   Preheat oven to 350°F.
//   In a large bowl, combine flour, sugar, and baking powder.
//   Add in the butter, eggs, and milk. Mix until well combined."
//               />
//             </div>
//           </div>
//           <div className="right-half">
//             <div>
//               <label htmlFor="cookingTime">Cooking Time (minutes)</label>
//               <input
//                 className="form-input"
//                 type="number"
//                 name="cookingTime"
//                 value={formData.cookingTime}
//                 onChange={onChange}
//                 min="10"
//                 max="200"
//                 step="10"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="servingSize">Serving Size</label>
//               <input
//                 className="form-input"
//                 type="number"
//                 name="servingSize"
//                 value={formData.servingSize}
//                 onChange={onChange}
//                 required
//                 min="1"
//                 max="10"
//               />
//             </div>
//             <div>
//               <label htmlFor="rating">Rating (out of 5)</label>
//               <input
//                 className="form-input"
//                 type="number"
//                 name="rating"
//                 value={formData.rating}
//                 onChange={onChange}
//                 required
//                 min="1"
//                 max="5"
//               />
//             </div>

//             <div className="submit-button">
//               <button className="form-btn" type="submit">
//                 Add Recipe
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
export default AddRecipe;
