import { ref, set } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase-config';
import { UserAuth } from '../context/AuthContext';

const EditDeck = ({deck, setDecks, toggleEdit, deckToEdit}) => {
    const {user} = UserAuth();
    const [importedDeck, setImportedDeck] = useState(deck);
    const [cards, setCards] = useState(deck.deckCards);
    let style;

    if (deck !== deckToEdit){
        style = {display: 'none'}
    }

    useEffect(() => {
        setImportedDeck({...importedDeck, deckCards: cards})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cards])

    const handleCardTitleChange = (e, card) => {
        setCards(curr => 
            curr.map(obj => {
                if (obj === card){
                    return {...obj, title: e.target.value}
                }
                return obj
            })
            )
        
    }

    const handleCardDescriptionChange = (e, card) => {
        setCards(curr => 
            curr.map(obj => {
                if (obj === card){
                    return {...obj, definition: e.target.value}
                }
                return obj;
            })
            )
    }

    const handleDeleteCard = async cardToDelete => {
        setCards(current => current.filter(val => {
          if (val !== cardToDelete){
            return val;
          }
          return null;
        }))
      }

    const handleSubmit = async e => {
        e.preventDefault();
        await set(ref(db, `users/${user.uid}/decks/${deck.uuid}`), importedDeck);
        setDecks(curr => 
            curr.map(obj => {
                if (obj === deck){
                    return importedDeck;
                }
                return obj
            })
            )
            toggleEdit();
    }

    return (
        <div className="edit-deck" style={style}>
            <h3 id='new-deck'>Edit Deck</h3>
            <form className='create-deck-form' onSubmit={handleSubmit} action='/review-flashcard'>
                <input
                    placeholder='Study Deck Title... *'
                    value={importedDeck.deckName}
                    onChange={e => setImportedDeck({ ...importedDeck, deckName: e.target.value })}
                    className='deck-input'
                    required
                />
                <textarea
                    placeholder='Description (optional)...'
                    value={importedDeck.deckDescription}
                    onChange={e => setImportedDeck({ ...importedDeck, deckDescription: e.target.value })}
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
                                    onChange={(e) => handleCardTitleChange(e, card)}
                                    required
                                />
                                <p className='term-desc'>Term</p>
                                <input
                                    placeholder='Enter Definition'
                                    onChange={(e) => handleCardDescriptionChange(e, card)}
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
                    setCards([...cards, { title: '', definition: '', id: newId }])
                }}>+ Add Card</button>
                <div className='creation-action-buttons'>
                    <button className='submit' type='submit'>Submit</button>
                    <button className='cancel-creation' type='button' onClick={toggleEdit}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default EditDeck