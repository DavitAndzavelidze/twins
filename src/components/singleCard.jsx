import "../components/singleCard.css";

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };
  return (
    <div className="relative card">
      <div className="flex flex-col justify-center items-center">
        <div className={flipped ? "flipped" : ""}>
          <img className="front " src={card.src} alt="card front" />
          <img
            className="back "
            src="/img/cover.webp"
            alt="card cover"
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
}
