import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const EditDeck = ({deck, decks, setDecks, toggleEdit}) => {
    const [importedDeck, setImportedDeck] = useState(deck);
    const [cards, setCards] = useState(deck.deckCards);
    const navigate = useNavigate();

    useEffect(() => {
        setImportedDeck({...importedDeck, deckCards: cards})
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

    const handleSubmit = e => {
        e.preventDefault();
        setDecks(curr => 
            curr.map(obj => {
                if (obj === deck){
                    return importedDeck;
                }
            })
            )
            toggleEdit();
            localStorage.setItem("redirect", true);
            setTimeout(() => {
                navigate("/");
            }, 500);
    }

    return (
        <div className="create-deck">
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
                                    <button className='delete-icon' type='button' onClick={null} disabled={cards.length > 1 ? false : true}>🗑️</button>
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