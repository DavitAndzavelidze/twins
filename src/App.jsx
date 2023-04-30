import { useEffect, useState } from "react";
import SingleCard from "./components/singleCard";
import "./App.css";

const cardImages = [
  { src: "/img/img1.webp", matched: false },
  { src: "/img/img2.webp", matched: false },
  { src: "/img/img3.webp", matched: false },
  { src: "/img/img4.webp", matched: false },
  { src: "/img/img5.webp", matched: false },
  { src: "/img/img6.webp", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // shuffle cards
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffleCards);
    setTurns(0);
  };

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // reset choice & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // start a new game automately
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <>
      <div className="w-full h-full  text-center">
        <h1 className="text-[#fff] text-[2rem] font-bold mt-[4rem] md:mt-[1rem]">
          Twins
        </h1>
        <button
          onClick={shuffleCards}
          className="text-[#fff] rounded-[5px] text-[1.3rem] bg-none border border-[1px] px-[20px] py-[10px] mt-[1rem] lg:hover:bg-[#c23866] duration-150"
        >
          New Game
        </button>
        <div className="w-[300px] md:w-[860px] mx-auto grid grid-cols-4 gap-[20px] mt-[40px]">
          {cards.map((card) => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
        <p className="text-[#fff] mt-[1rem]">Turns: {turns}</p>
      </div>
    </>
  );
}

export default App;
