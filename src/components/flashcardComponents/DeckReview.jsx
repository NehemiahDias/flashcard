import React, { useEffect, useState } from "react";
import "./DeckReview.css";

function DeckReview({ deck }) {
  const [showedCards, setShowedCards] = useState([...deck.deckCards]);
  const [editing, setEditing] = useState(false);

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

  const toggleEdit = () => {
    setEditing(editing ? false : true);
  }

  const handleToggleAllCards = () => {
    setShowedCards(showedCards.map(prev => {
      return { ...prev, showingAnswer: prev.showingAnswer ? false : true }
    }))
  }

  const editCardTitle = (e, card) => {
    setShowedCards(curr => 
      curr.map(obj => {
        if (obj === card){
          return {...obj, title: e.target.value}
        }
        return obj
      })
    )
  }

  const editCardDefinition = (e, card) => {
    setShowedCards(curr => 
      curr.map(obj => {
        if (obj === card){
          return {...obj, definition: e.target.value}
        }
        return obj
      })  
    )
  }

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
        <button className="change-shown-item" onClick={handleToggleAllCards}>Flip All Cards</button>
      </div>
      <div className="showed-cards">
        <p>Click the cards to flip!</p>
        {editing ?
          <button onClick={toggleEdit}>Finish Editing</button>
          :
          <button onClick={toggleEdit}>Edit Cards</button>
        }
        {showedCards.map((val) => (
          <button
            disabled={editing}
            onClick={() => handleShowAnswer(val)}
            className="flashcard-review"
            key={Math.random()}
          >
            {editing ?
              <>
                <h4>Title:</h4>
                <input 
                  style={{color: 'black'}} 
                  value={val.title} 
                  onChange={e => editCardTitle(e, val)} 
                />
                <h4>Definition:</h4>
                <input 
                  style={{color: 'black'}} 
                  value={val.definition} 
                  onChange={e => editCardDefinition(e, val)} 
                />
              </>
              :
              <>
              {
                val.showingAnswer ? (
                  <>
                    <h4>Definition:</h4>
                    <p>{val.definition}</p>
                  </>
                ) : (
                  <>
                    <h4>Title:</h4>
                    <p>{val.title}</p>
                  </>
                )
              }
              </>
            }
          </button>
        ))}
      </div>
    </>
  );
}

export default DeckReview;
