import React, { useState } from 'react';

const UploadMeme = () => {
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);

    fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Meme uploaded:', data);
      })
      .catch((error) => {
        console.error('Error uploading meme:', error);
      });
  };

  return (
    <div>
      <h2>Upload a Meme</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload Meme</button>
      </form>
    </div>
  );
};

export default UploadMeme;
