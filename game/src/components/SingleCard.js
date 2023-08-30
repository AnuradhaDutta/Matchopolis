import './SingleCard.css';
import React from 'react';

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if(!disabled) {
    handleChoice(card);
  }
};
  console.log(flipped);

  return (
    <div className={`card ${flipped ? 'flipped' : ''}`} key={card.id} onClick={handleClick}>
      <div>
        <img className="front" src={card.src} alt="card front" />
        <img className="back" src="/img/back.png" alt="card back" />
      </div>
    </div>
  );
}
