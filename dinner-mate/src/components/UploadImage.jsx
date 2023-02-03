import React from 'react'

const UploadImage = () => {
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