import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MemeDetail = () => {
  const { id } = useParams();
  const [meme, setMeme] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/memes/${id}`)
      .then(response => response.json())
      .then(data => setMeme(data))
      .catch(error => console.error('Error fetching meme:', error));
  }, [id]);

  if (!meme) return <div>Loading...</div>;

  return (
    <div>
      <h2>{meme.title}</h2>
      <img src={meme.imageUrl} alt={meme.title} />
      <p>{meme.description}</p>
    </div>
  );
};

export default MemeDetail;
