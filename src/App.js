import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavComponent from "./components/universalComponents/NavComponent";
import CreateFlashcard from "./components/flashcardComponents/CreateFlashcard";
import ReviewFlashcard from "./components/flashcardComponents/ReviewFlashcard";
import DeckReview from "./components/flashcardComponents/DeckReview";

function App() {
  const [decks, setDecks] = useState(null);

  let tempDecks;

  useEffect(() => {
    tempDecks = localStorage.getItem('decks');
    tempDecks = JSON.parse(tempDecks);
    setDecks(tempDecks);
  }, [])




  return (
    <BrowserRouter>
      <NavComponent />
      <Routes>
        <Route path='/' element={<CreateFlashcard />} />
        <Route path='/review-flashcard' element={<ReviewFlashcard appDecks={decks} setAppDeck={setDecks} />} />
        {decks &&
          decks.map((deck, i) => {
            let path = `/review-deckname-${deck.deckName}`.split(' ').join('-');
            return (
              <Route key={i} path={path} element={<DeckReview deck={deck} />} />
            )
          })
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
