// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import Category from "../components/Category";

// const EditRecipe = () => {
//   const navigate = useNavigate();
//   const [recipe, setRecipe] = useState({});
//   const { recipeId } = useParams();

//   const getRecipe = async () => {
//     try {
//       const res = await fetch(
//         `https://dinner-mate-backend-production.up.railway.app/public/${recipeId}`,
//         {
//           headers: {
//             Authorization: "Bearer " + localStorage.getItem("token"),
//           },
//         }
//       );
//       const data = await res.json();
//       setRecipe(data.recipe);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     getRecipe();
//   }, [recipeId]);

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       await fetch(
//         `https://dinner-mate-backend-production.up.railway.app/recipes/update/${recipeId}`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + localStorage.getItem("token"),
//           },
//           body: JSON.stringify(recipe),
//         }
//       );
//       navigate(`/recipe/${recipeId}`);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <form className="update-form">
//       <label>
//         Title:
//         <input
//           type="text"
//           value={recipe.title}
//           onChange={(event) =>
//             setRecipe({ ...recipe, title: event.target.value })
//           }
//         />
//       </label>
//       <br />
//       <label>
//         Ingredients:
//         <textarea
//           value={recipe.ingredients}
//           onChange={(event) =>
//             setRecipe({ ...recipe, ingredients: event.target.value })
//           }
//         />
//       </label>
//       <br />
//       <label>
//         Instructions:
//         <textarea
//           value={recipe.instructions}
//           onChange={(event) =>
//             setRecipe({ ...recipe, instructions: event.target.value })
//           }
//         />
//       </label>
//       <br />
//       <label>
//         Category:
//         <input
//           type="text"
//           value={recipe.category}
//           onChange={(event) =>
//             setRecipe({ ...recipe, category: event.target.value })
//           }
//         />
//       </label>
//       <br />
//       <label>
//         Cooking Time:
//         <input
//           type="number"
//           value={recipe.cookingTime}
//           onChange={(event) =>
//             setRecipe({ ...recipe, cookingTime: event.target.value })
//           }
//         />
//       </label>
//       <br />
//       <label>
//         Serving Size:
//         <input
//           type="number"
//           value={recipe.servingSize}
//           onChange={(event) =>
//             setRecipe({ ...recipe, servingSize: event.target.value })
//           }
//         />
//       </label>
//       <br />
//       <button type="submit" onClick={handleUpdate}>
//         Update Recipe
//       </button>
//     </form>
//   );
// };

// export default EditRecipe;
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import styled from "styled-components";

const UpdateRecipe = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({});
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
      } catch (err) {
        console.error(err);
      }
    };
    getRecipe();
  }, [recipeId]);

  const handleUpdate = async (event) => {
    event.preventDefault();
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
  const [category, setCategory] = useState("");

  const handleCategorySelection = (selectedCategory) => {
    setCategory(selectedCategory);
    setRecipe({ ...recipe, category: selectedCategory });
  };

  //form fields
  return (
    <>
      <Navbar />
      <FormContainer onSubmit={handleUpdate}>
        <FormTitle>Make Some Changes</FormTitle>
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
          value={recipe.title}
          onChange={(event) =>
            setRecipe({ ...recipe, title: event.target.value })
          }
        />
        <FormTextarea
          value={recipe.ingredients}
          onChange={(event) =>
            setRecipe({ ...recipe, ingredients: event.target.value })
          }
        />
        <FormTextarea
          value={recipe.instructions}
          onChange={(event) =>
            setRecipe({ ...recipe, instructions: event.target.value })
          }
        />
        <FormInput
          type="number"
          value={recipe.cookingTime}
          onChange={(event) =>
            setRecipe({ ...recipe, cookingTime: event.target.value })
          }
        />
        <FormSelect
          type="number"
          value={recipe.servingSize}
          onChange={(event) =>
            setRecipe({ ...recipe, servingSize: event.target.value })
          }
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
        <FormButton type="submit" onClick={handleUpdate}>
          Update
        </FormButton>
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
  &:focus {
    outline: none;
    border-bottom: 1px solid #888888;
    transition: border-bottom 2s ease-in-out;
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
  &:focus {
    outline: none;
    border-bottom: 1px solid #888888;
    transition: border-bottom 2s ease-in-out;
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
  &:focus {
    transition: border-bottom 2s ease-in-out;
    outline: none;
    border-bottom: 1px solid #888888;
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

export default UpdateRecipe;
