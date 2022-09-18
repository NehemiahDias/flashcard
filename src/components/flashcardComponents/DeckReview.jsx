import React from "react";

function DeckReview({ deck }) {
  return (
    <>
        <div className="deck-review-intro">
        <h1>This is where you can review your deck!</h1>
        <p>How to review: Your deck info is going to be listed below, under that will be all your flashcards! When you click on the card, it will show the other side... Just like a real flashcard! It will be ordered in a list randomly each time you refresh the page. I recommend you start from the top and go down from there and refresh to randomize the order. Happy studying!</p>
        </div>
        <div className="deck-info">
            <h1>{deck.deckName}</h1>
            <p>{deck.deckDescription}</p>
            {deck.deckCards.map((val, i) => (
                <div key={i}>
                    <p>{val.title}</p>
                    <p>{val.definition}</p>
                </div>
            ))}
        </div>
    </>
  );
}

export default DeckReview;
