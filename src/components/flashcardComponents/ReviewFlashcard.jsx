import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Review.css";
import writing from "../../resources/illustration-student-writing.png";
import EditDeck from "./EditDeck";
import { onValue, ref } from "firebase/database";
import { db } from "../../firebase-config";
import { UserAuth } from "../context/AuthContext";

function ReviewFlashcard() {
    const {user} = UserAuth();
    const [decks, setDecks] = useState(null);
    const [editDeck, setEditDeck] = useState(false);
    const [deckToEdit, setDeckToEdit] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const fetchData = async () => {
        const decksRef = ref(db, `users/${user.uid}/decks`);
        onValue(decksRef, snapshot => {
            const data = snapshot.val();
            
            setDecks(Object.values(data))
        })
    }

    useEffect(() => {
        fetchData();
        let deck = localStorage.getItem("decks");
        deck = JSON.parse(deck);
        // setDecks(deck);
    }, [user]);

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

    const handleExport = () => {
        if (decks === null) {
            setError('You must create a deck before exporting!')
            return null;
        }
        var dataStr = "data:text/json;charset=utf-8," +
            encodeURIComponent(JSON.stringify(decks));
        var dlAnchorElem = document.getElementById("downloadAnchorElem");
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", "decks.json");
    };

    const onRenderLoad = (e) => {
        var obj = JSON.parse(e.target.result);
        if (decks === null) {
            setDecks(obj);
        } else {
            var existingDecks = [...decks];
            var newList = [];
            for (let i in obj) {
                if (existingDecks[i] === undefined && obj[i] !== undefined) {
                    newList.push(obj[i]);
                }
            }
            setDecks([...decks, ...newList]);
        }

        localStorage.setItem("redirect", true);
        setTimeout(() => {
            navigate("/");
        }, 500);
    };

    const handleImportChange = (e) => {
        if (e.target.files[0].type !== "application/json") {
            setError("File must be a JSON file!");
            return null;
        }
        let reader = new FileReader();
        reader.onload = onRenderLoad;
        reader.readAsText(e.target.files[0]);
        setError("");
    };

    const toggleEditDeck = (deck) => {
        setEditDeck(editDeck ? false : true);
        if (deck){
            setDeckToEdit(deck);
        }
    };

    return (
        <section id="review-section">
            {!decks ? (
                <div className="no-deck-information">
                    <h1>You have not created any Decks!</h1>
                    <div className="export-import-btns">
                        <a href={"data:text/json;charset=utf-8," +
                            encodeURIComponent(JSON.stringify(decks))} onClick={handleExport} id="downloadAnchorElem">
                            Export Decks
                        </a>
                        <label className="inport-btn">
                            {" "}
                            Import Decks
                            <input
                                text="Import Decks"
                                onChange={handleImportChange}
                                type="file"
                            />
                        </label>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <Link to="/" className="create-deck-review">
                        Click here to create One
                    </Link>
                    <img
                        className="illustration-img"
                        src={writing}
                        alt="illustration of writing"
                    />
                </div>
            ) : (
                <>
                    <div className="export-import-btns">
                        <a href={"data:text/json;charset=utf-8," +
                            encodeURIComponent(JSON.stringify(decks))} onClick={handleExport} id="downloadAnchorElem">
                            Export Decks
                        </a>
                        <label className="inport-btn">
                            {" "}
                            Import Decks
                            <input
                                text="Import Decks"
                                onChange={handleImportChange}
                                type="file"
                            />
                        </label>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <div className="all-decks">
                        {decks.map((deck, i) => (
                            <>
                                <div className="full-deck" key={i}>
                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/review-deckname-${deck.deckName}`.split(" ").join("-")
                                            )
                                        }
                                        className="deck"
                                        disabled={editDeck}
                                    >
                                        <div className="deck-info">
                                                <>
                                                    <p>Deck Name:</p>
                                                    <h3>{deck.deckName}</h3>
                                                    {deck.deckDescription && (
                                                        <>
                                                            <p>Deck Description:</p>
                                                            <h3>{deck.deckDescription}</h3>
                                                        </>
                                                    )}
                                                    <p>Quantity of Flash Cards:</p>
                                                    <h3>{deck.deckCards.length}</h3>
                                                </>
                                        </div>
                                    </button>
                                    <div className="deck-action">
                                        {editDeck ? (
                                            <button
                                                className="update-deck"
                                                onClick={toggleEditDeck}
                                                disabled={deck.deckName.length < 1}
                                            >
                                                Cancel
                                            </button>
                                        ) : (
                                            <button
                                                className="update-deck"
                                                onClick={() => toggleEditDeck(deck)}
                                            >
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
                                {editDeck &&
                                    <EditDeck deck={deck} setDecks={setDecks} toggleEdit={toggleEditDeck} deckToEdit={deckToEdit} />
                                }
                                </>
                        ))}

                    </div>
                </>
            )}
        </section>
    );
}

export default ReviewFlashcard;
