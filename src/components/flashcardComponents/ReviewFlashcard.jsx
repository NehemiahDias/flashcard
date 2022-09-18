import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Review.css';

function ReviewFlashcard() {
    const [decks, setDecks] = useState(null);
    const [editDeck, setEditDeck] = useState(false);

    useEffect(() => {
        let deck = localStorage.getItem('decks');
        deck = JSON.parse(deck)
        setDecks(deck);
    }, [])

    useEffect(() => {
        if (!decks || decks === []) {
            localStorage.removeItem('decks');
        } else {
            localStorage.setItem('decks', JSON.stringify(decks));
        }
    }, [decks])

    const handleDelete = deckToDelete => {
        if(decks.length === 1){
            setDecks(null);
        } else {
            setDecks(decks.filter((prev) => prev !== deckToDelete));
        }
    }

    const editDeckTitle = (e, val) => {
        setDecks(current =>
            current.map(obj => {
                if (val === obj) {
                    return {...obj, deckName: e.target.value};
                }
                return obj;
           }),
        );
    }

    const editDeckDescription = (e, val) => {
        setDecks(current =>
            current.map((obj) => {
              if (val === obj) {
                return {...obj, deckDescription: e.target.value};
              }
              return obj;
            })
          );
    }

    const toggleEditDeck = () => {
        setEditDeck(editDeck ? false : true)
    }

    return (
        <section id='review-section'>
            {!decks ?
                <>
                    <h1>You have no Created Decks</h1>
                    <Link to='/create-flashcard' className='create-deck-review'>Click here to create One</Link>
                </>
                :
                <div className='all-decks'>
                    {decks.map((deck, i) => (
                        <div className="full-deck" key={i}>
                            <button className="deck">
                                <div className="deck-info">
                                    { editDeck ? 
                                        <>
                                            <p>Deck Name:</p>
                                            <input 
                                                className='edit-deck' 
                                                value={deck.deckName} 
                                                onChange={e => editDeckTitle(e, deck)} 
                                                min='1'
                                            />
                                            <p>Deck Description:</p>
                                            <input 
                                                className='edit-deck' 
                                                value={deck.deckDescription} 
                                                onChange={e => editDeckDescription(e, deck)}
                                            />
                                            <p>Quantity of Flash Cards:</p>
                                            <h3>{deck.deckCards.length}</h3>
                                        </>
                                        :
                                        <>
                                            <p>Deck Name:</p>
                                            <h3>{deck.deckName}</h3>
                                            <p>Deck Description:</p>
                                            <h3>{deck.deckDescription}</h3>
                                            <p>Quantity of Flash Cards:</p>
                                            <h3>{deck.deckCards.length}</h3>
                                        </>
                                    }
                                </div>
                            </button>
                            <div className="deck-action">
                                <button className='delete-deck' onClick={() => handleDelete(deck)}>🗑️</button>
                                {editDeck ?
                                    <button onClick={toggleEditDeck} disabled={deck.deckName.length < 1}>Finish Editing</button>
                                    :  
                                    <button onClick={toggleEditDeck}>Edit</button>}
                            </div>
                        </div>
                        
                    ))}
                </div>
            }
        </section>
    )
}

export default ReviewFlashcard