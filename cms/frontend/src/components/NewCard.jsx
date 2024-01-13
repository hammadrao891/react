import React from 'react';
import "./NewCard.scss"
const NewCard = ({ number, text,color }) => {
  return (
    <div className="card" style={{background:`${color}`}}>
      <div className="card-body">
        <h4>{number}</h4>
        <p>{text}</p>
      </div>
    </div>
  );
};


export default NewCard;
