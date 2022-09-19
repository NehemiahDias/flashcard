import React, { useEffect, useState } from "react";
import "./DeckReview.css";

function DeckReview({ deck }) {
  const [showedCards, setShowedCards] = useState([...deck.deckCards]);

  const shuffleCards = () => {
    let newList = [...showedCards];
    let currId = newList.length;
    while (0 !== currId) {
      let randId = Math.floor(Math.random() * currId);
      currId -= 1;
      let temp = newList[currId];
      newList[currId] = newList[randId];
      newList[randId] = temp
    }
    return newList;
  }

  useEffect(() => {
    setShowedCards(
      showedCards.map((val) => {
        return { ...val, showingAnswer: false };
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <strong>How to review:</strong> Your deck info is going to be listed below, under that
          will be all your flashcards! When you click on the card, it will show
          the other side... Just like a real flashcard! It will be ordered in a
          list randomly each time you refresh the page. I recommend you start
          from the top and go down from there and refresh to randomize the
          order. Happy studying!
        </p>
      </div>
      <div className="deck-info-review">
        <h2>Deck Name: {deck.deckName}</h2>
        {deck.deckDescription && <p>Deck Description: {deck.deckDescription}</p>}
        <button className="shuffle-button" onClick={() => setShowedCards(shuffleCards())}>Shuffle</button>
      </div>
      <div className="showed-cards">
        <p>Click the cards to flip!</p>
        {showedCards.map((val) => (
          <button
            onClick={() => handleShowAnswer(val)}
            className="flashcard-review"
            key={Math.random()}
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
