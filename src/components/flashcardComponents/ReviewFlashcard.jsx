import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Review.css';

function ReviewFlashcard() {
    const [decks, setDecks] = useState(null);

    useEffect(() => {
        let deck = localStorage.getItem('decks');
        deck = JSON.parse(deck)
        setDecks(deck);
    }, [])

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
                                    <p>Deck Name:</p>
                                    <h3>{deck.deckName}</h3>
                                    <p>Deck Description:</p>
                                    <h3>{deck.deckDescription}</h3>
                                    <p>Quantity of Flash Cards:</p>
                                    <h3>{deck.deckCards.length}</h3>
                                </div>
                            </button>
                            <div className="deck-action">
                                <button className='delete-deck'>🗑️</button>
                            </div>
                        </div>
                        
                    ))}
                </div>
            }
        </section>
    )
}

export default ReviewFlashcard