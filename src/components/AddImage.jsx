import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
        navigate(`/add-image/${recipeId}`);
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
      <div>
        <h2>Thats looking nice, </h2>
        <div className="upload-box" style={{alignItems: "center", backgroundColor: "light-grey"}}>
          <p>Please upload an image for your recipe!</p>
          <input className="file" type="file" onChange={handleImageChange} />
          <button className="upload-btn" onClick={handleUpload}>
            Upload
          </button>
        </div>
      </div>
    </>
  );
};

export default AddImage;
