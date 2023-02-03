import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const UploadImage = () => {
    const [selectedImage, setSelectedImage] = useState()

    const navigate = useNavigate()
    let { recipeId } = useParams()
  
    const handleImageChange = (e) => {
      setSelectedImage(e.target.files[0])
    }
  
    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            if (!localStorage.getItem("token")) return
            const formData = new FormData();
            formData.append("image", selectedImage)
            const response = await fetch(
            `https://dinner-mate-backend-production.up.railway.app/recipes/upload-image/${recipeId}?width=1000`,
            {
                method: "POST",
                body: formData,
                headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
            )
            if (response.ok) {
                navigate(`/recipe/${recipeId}}`);
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
        <div>
            <div className="upload-box">
                <p>Please upload a image for your recipe</p>
                <input className="file" type="file" onChange={handleImageChange} />
                <button className="upload-btn" onClick={handleUpload}>
                    Upload
                </button>
            </div>
        </div>
    )
}

export default UploadImage