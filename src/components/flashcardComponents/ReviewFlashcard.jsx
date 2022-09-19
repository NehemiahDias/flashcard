import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Review.css";
import writing from '../../resources/illustration-student-writing.png';

function ReviewFlashcard() {
  const [decks, setDecks] = useState(null);
  const [editDeck, setEditDeck] = useState(false);
  const [importedDeck, setImportedDeck] = useState()
  const navigate = useNavigate();

  useEffect(() => {
    let deck = localStorage.getItem("decks");
    deck = JSON.parse(deck);
    setDecks(deck);
  }, []);

  useEffect(() => {
    if (!decks || decks === []) {
      localStorage.removeItem("decks");
    } else {
      localStorage.setItem("decks", JSON.stringify(decks));
    }
  }, [decks]);

  const handleDelete = (deckToDelete) => {
    if (decks.length === 1) {
      setDecks(null);
    } else {
      setDecks(decks.filter((prev) => prev !== deckToDelete));
    }
  };

  const editDeckTitle = (e, val) => {
    setDecks((current) =>
      current.map((obj) => {
        if (val === obj) {
          return { ...obj, deckName: e.target.value };
        }
        return obj;
      })
    );
  };

  const editDeckDescription = (e, val) => {
    setDecks((current) =>
      current.map((obj) => {
        if (val === obj) {
          return { ...obj, deckDescription: e.target.value };
        }
        return obj;
      })
    );
  };

  const handleExport = () => {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(decks));
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", "scene.json");
  }

  const handleImportChange = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    setImportedDeck(e.target.files[0]);
  }

  const toggleEditDeck = () => {
    setEditDeck(editDeck ? false : true);
    if (editDeck){
      
    }
  };

  return (
    <section id="review-section">
      {!decks ? (
        <div className="no-deck-information">
          <h1>You have not created any Decks!</h1>
          <button>Export Decks</button>
          <button>Import Decks</button>
          <Link to="/" className="create-deck-review">
            Click here to create One
          </Link>
          <img className="illustration-img" src={writing} alt='illustration of writing' />
        </div>
      ) : (
        <>
        <div className="export-import-btns">
          <a onClick={handleExport} id="downloadAnchorElem" >Export Decks</a>
          {/* <label className="inport-btn"> Import Decks
            <input text='Import Decks' onChange={handleImportChange} type='file'/>
          </label> */}
        </div>
        <div className="all-decks">
          {decks.map((deck, i) => (
            <div className="full-deck" key={i}>
              <button onClick={() => navigate(`/review-deckname-${deck.deckName}`.split(' ').join('-'))} className="deck" disabled={editDeck}>
                <div className="deck-info">
                  {editDeck ? (
                    <>
                      <p>Deck Name:</p>
                      <input
                        className="edit-deck"
                        value={deck.deckName}
                        onChange={(e) => editDeckTitle(e, deck)}
                        min="1"
                      />
                      <p>Deck Description:</p>
                      <input
                        className="edit-deck"
                        value={deck.deckDescription}
                        onChange={(e) => editDeckDescription(e, deck)}
                      />
                      <p>Quantity of Flash Cards:</p>
                      <h3>{deck.deckCards.length}</h3>
                    </>
                  ) : (
                    <>
                      <p>Deck Name:</p>
                      <h3>{deck.deckName}</h3>
                      {deck.deckDescription && 
                      <>
                      <p>Deck Description:</p>
                      <h3>{deck.deckDescription}</h3>
                      </>
                      }
                      <p>Quantity of Flash Cards:</p>
                      <h3>{deck.deckCards.length}</h3>
                    </>
                  )}
                </div>
              </button>
              <div className="deck-action">
                {editDeck ? (
                  <button
                    className="update-deck"
                    onClick={toggleEditDeck}
                    disabled={deck.deckName.length < 1}
                  >
                    Finish Editing
                  </button>
                ) : (
                  <button disabled={true} className="update-deck" onClick={toggleEditDeck}>
                    Edit
                  </button>
                )}
                <button
                  className="delete-deck"
                  onClick={() => handleDelete(deck)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        </>
      )}
    </section>
  );
}

export default ReviewFlashcard;
