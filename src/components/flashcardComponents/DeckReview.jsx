import React, { useEffect, useState } from "react";
import "./DeckReview.css";

function DeckReview({ deck }) {
  const [showedCards, setShowedCards] = useState([...deck.deckCards]);

  useEffect(() => {
    setShowedCards(
      showedCards.map((val) => {
        return { ...val, showingAnswer: false };
      })
    );
  }, []);

  const handleShowAnswer = (item) => {
    setShowedCards(
      showedCards.map((prev) => {
        if (prev === item) {
          return { ...prev, showingAnswer: prev.showingAnswer ? false : true };
        }
        return prev;
      })
    );
  };

  return (
    <>
      <div className="deck-review-intro">
        <h1>This is where you can review your deck!</h1>
        <p>
          How to review: Your deck info is going to be listed below, under that
          will be all your flashcards! When you click on the card, it will show
          the other side... Just like a real flashcard! It will be ordered in a
          list randomly each time you refresh the page. I recommend you start
          from the top and go down from there and refresh to randomize the
          order. Happy studying!
        </p>
      </div>
      <div className="deck-info">
        <h1>{deck.deckName}</h1>
        <p>{deck.deckDescription}</p>
      </div>
      <div className="showed-cards">
        {showedCards.map((val, i) => (
          <button
            onClick={() => handleShowAnswer(val)}
            className="flashcard-review"
            key={i}
          >
            {val.showingAnswer ? (
              <>
                <h4>Definition:</h4>
                <p>{val.definition}</p>
              </>
            ) : (
              <>
                <h4>Title:</h4>
                <p>{val.title}</p>
              </>
            )}
          </button>
        ))}
      </div>
    </>
  );
}

export default DeckReview;
