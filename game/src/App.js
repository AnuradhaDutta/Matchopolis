import './App.css';
import React, { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';

const cardImages = [
  {"src": "/img/angel.png", matched : false},
  {"src": "/img/crown.png", matched : false},
  {"src": "/img/diamond.png", matched : false},
  {"src": "/img/potion.png", matched : false},
  {"src": "/img/ring.png", matched : false},
  {"src": "/img/treasure.png", matched : false},
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null)
  const [ChoiceTwo, setChoiceTwo] = useState(null)
  const[disabled, setDisabled] = useState(false)
  
  
  // Shuffle the cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5) // Fix the sorting function here
      .map((card) => ({ ...card, id: Math.random() }));
      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards);
    setTurns(0);
  };

  //handle choice
 
  const handleChoice = (card) => {
    if (!disabled) { // Check if interaction is disabled
      if (!choiceOne) {
        setChoiceOne(card);
      } else if (!ChoiceTwo) {
        setChoiceTwo(card);
        setDisabled(true); // Disable interaction during matching process
      }
    }
  };
  
  useEffect(() => {
    if (choiceOne && ChoiceTwo) {
      if (choiceOne.src === ChoiceTwo.src) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000); // Delay before resetting the choices
      }
      setDisabled(false); // Re-enable interaction after matching process
    }
  }, [choiceOne, ChoiceTwo]);
  
  
  console.log(cards)

  //reset the choices
   const resetTurn=() => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns +1)
    setDisabled(false)
   }
    //start game automatically
    useEffect(()=> {
    shuffleCards()
    },[])
    return (
      <div className="App">
        <div className="header">
          <h1>Matchopolis</h1>
          <button className="button" onClick={shuffleCards}>New Game</button>
        </div>
        <div className="card-grid-container">
          <div className="card-grid">
            {cards.map((card) => (
              <SingleCard
                key={card.id}
                card={card}
                handleChoice={handleChoice}
                flipped={card.matched || card === choiceOne || card === ChoiceTwo}
                disabled={disabled}
              />
            ))}
          </div>
        </div>
        <p className="turns">Turns: {turns}</p>
        <p className="anuradha">By Anuradha</p>
      </div>
    );
  }
  
  export default App;
  