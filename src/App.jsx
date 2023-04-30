import { useEffect, useState, useRef } from "react";
import { Fireworks } from "@fireworks-js/react";
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
  const [allMatched, setAllMatched] = useState(false);

  const ref = useRef(null);

  const stopFirework = () => {
    if (!ref.current) return;
    if (ref.current.isRunning) {
      ref.current.stop();
    }
  };

  // shuffle cards
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffleCards);
    setTurns(0);
    stopFirework();
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
          const newCards = prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
          const allMatched = newCards.every((card) => card.matched);
          setAllMatched(allMatched);
          return newCards;
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
      <div className="w-full h-full text-center">
        <div className="flex justify-between items-center md:flex-col px-[20px]">
          <h1 className="text-[#fff] mt-[10px] md:text-[2rem] font-bold md:mt-[2rem]">
            Twins
          </h1>
          <button
            onClick={shuffleCards}
            className="text-[#fff] rounded-[5px] md:text-[1.3rem] bg-none border border-[1px] px-[20px] py-[10px] mt-[1rem] lg:hover:bg-[#c23866] duration-150 relative z-[99]"
          >
            New Game
          </button>
        </div>
        <div className="w-[300px] md:w-[860px] mx-auto grid grid-cols-3 md:grid-cols-4 gap-[20px] mt-[20px] md:mt-[40px]">
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
        {allMatched && (
          <div className="absolute top-0 left-0 w-full h-full bg-transparent z-[-1]">
            <Fireworks
              ref={ref}
              options={{ opacity: 0.5 }}
              style={{
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                position: "fixed",
                zIndex: -1,
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
