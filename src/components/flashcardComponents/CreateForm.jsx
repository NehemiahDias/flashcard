import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './CreateForm.css';

function CreateForm({toggleForm, deckToEdit}) {
  const initialState = {
    deckName: '',
    deckDescription: '',
    deckCards: null,
  }
  const [deck, setDeck] = useState(initialState)
  const [cards, setCards] = useState([{title: '', definition: '', id: 1}]);

  const updateCardTitle = (e, val) => {
    setCards(current =>
      current.map(obj => {
        if (val === obj) {
          return {...obj, title: e.target.value};
        }
        return obj;
      }),
    );
  }

  useEffect(() => {
    if (deckToEdit){
      console.log(deckToEdit)
      setDeck(deckToEdit);
      setCards(deckToEdit.deckCards)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateCardDefinition = (e, val) => {
    setCards(current =>
      current.map((obj) => {
        if (val === obj) {
          return {...obj, definition: e.target.value};
        }
        return obj;
      }),
    );
  }

  const handleDeleteCard = cardToDelete => {
    setCards(current => current.filter(val => {
      if (val !== cardToDelete){
        return val;
      }
      return null;
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setDeck({...deck, deckCards: cards});
    window.location.reload();
  }

  useEffect(() => {
    if (deck.deckCards !== null){
      let currentStorage = localStorage.getItem('decks');
      if (currentStorage !== null){
        currentStorage = JSON.parse(currentStorage);
        currentStorage = [...currentStorage, deck];
        localStorage.setItem('decks', JSON.stringify(currentStorage));
      } else {
        localStorage.setItem('decks', JSON.stringify([deck]));
      }
    } 
  }, [deck])

  return (
    <div className="create-deck">
      <h3 id='new-deck'>Create Deck</h3>
      <form className='create-deck-form' onSubmit={handleSubmit} action='/review-flashcard'>
          <input 
              placeholder='Study Deck Title... *'
              value={deck.deckName}
              onChange={e => setDeck({...deck, deckName: e.target.value})}
              className='deck-input'
              required
          />
          <textarea 
            placeholder='Description (optional)...' 
            value={deck.deckDescription}
            onChange={e => setDeck({...deck, deckDescription: e.target.value})}
            className='deck-input' 
            rows='5'
          >
          </textarea>
          <div className="new-cards">
            <h1>FLASH CARDS</h1>
            {cards.map((card, index) => 
            (
              <div className="card" key={index}>
                <div className="card-actions">
                  <div className="num">
                    <p>{index + 1}</p>
                  </div>
                  <div className="delete">
                    <button className='delete-icon' type='button' onClick={() => handleDeleteCard(card)} disabled={cards.length > 1 ? false : true}>🗑️</button>
                  </div>
                </div>
                <hr />
                <div className="card-input">
                  <input 
                    placeholder='Enter Term'
                    className='term' 
                    value={card.title}
                    onChange={e => updateCardTitle(e, card)}
                    required
                  />
                  <p className='term-desc'>Term</p>
                  <input 
                    placeholder='Enter Definition'
                    onChange={e => updateCardDefinition(e, card)}
                    value={card.definition}
                    className='def' 
                    required
                  />
                  <p className='def-desc'>Definition</p>
                </div>
              </div>
            ))}
          </div>
          <button className='add-card' type='button' onClick={() => {
            const newId = cards[cards.length - 1].id + 1
            setCards([...cards, {title: '', definition: '', id: newId}])
          }}>+ Add Card</button>
          <div className='creation-action-buttons'>
            <button className='submit' type='submit'>Submit</button>
            <button className='cancel-creation' type='button' onClick={toggleForm}>Cancel</button>
          </div>
      </form>
    </div>
  )
}

export default CreateForm