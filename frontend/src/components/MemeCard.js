import React from "react";
import { Link } from "react-router-dom";

const MemeCard = ({ meme }) => {
  return (
    <div className="meme-card">
      <img src={meme.imageUrl} alt={meme.title} />
      <h3>{meme.title}</h3>
      <Link to={`/meme/${meme.id}`}>View Meme</Link>
    </div>
  );
};

export default MemeCard;
