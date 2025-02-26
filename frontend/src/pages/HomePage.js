import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    // Fetch memes from the server
    fetch("http://localhost:5000/api/memes")
      .then(response => response.json())
      .then(data => setMemes(data))
      .catch(error => console.error('Error fetching memes:', error));
  }, []);

  return (
    <div>
      <h2>Trending Memes</h2>
      <div className="memes-list">
        {memes.map((meme) => (
          <div key={meme.id} className="meme-card">
            <h3>{meme.title}</h3>
            <img src={meme.imageUrl} alt={meme.title} />
            <Link to={`/meme/${meme.id}`}>View Meme</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
