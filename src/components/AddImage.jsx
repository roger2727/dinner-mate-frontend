import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import styled from "styled-components";

// add image component that user can upload after they have added a recipe.
const AddImage = () => {
  const [selectedImage, setSelectedImage] = useState();

  const navigate = useNavigate();
  let { recipeId } = useParams();

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!localStorage.getItem("token")) return;
      const formData = new FormData();
      formData.append("image", selectedImage);
      const response = await fetch(
        `https://dinner-mate-backend-production.up.railway.app/recipes/upload-image/${recipeId}`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        navigate(`/myrecipes/`);
      } else {
        const error = await response.json();
        console.error(error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <DivContainer>
        <h2>
          Thats looking nice, now it's time to upload a pic of your creation!{" "}
        </h2>
        <UploadBox>
          <p>Please upload an image for your recipe!</p>
          <StyledInput
            className="file"
            type="file"
            onChange={handleImageChange}
          />
          <StyledButton className="upload-btn" onClick={handleUpload}>
            Upload
          </StyledButton>
        </UploadBox>
      </DivContainer>
    </>
  );
};

const DivContainer = styled.div`
  align-items: center;
  padding: 20px;
`;

const UploadBox = styled.div`
  align-items: center;
  background-color: #333333;
`;

const StyledInput = styled.input`
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
`;
const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: darkblue;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
`;

export default AddImage;
