import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingComponent from "./components/landingComponents/LandingComponent";
import NavComponent from "./components/universalComponents/NavComponent";
import CreateFlashcard from "./components/flashcardComponents/CreateFlashcard";
import ReviewFlashcard from "./components/flashcardComponents/ReviewFlashcard";
import DeckReview from "./components/flashcardComponents/DeckReview";

function App() {
  const [decks, setDecks] = useState(null);
  
  useEffect(() => {
    let tempDecks = localStorage.getItem('decks');
    tempDecks = JSON.parse(tempDecks);
    setDecks(tempDecks);
  }, [])

  return (
    <BrowserRouter>
      <NavComponent />
      <Routes>
        <Route path='/' element={<LandingComponent/>}/>
        <Route path='/create-flashcard' element={<CreateFlashcard/>}/>
        <Route path='/review-flashcard' element={<ReviewFlashcard/>}/>
        {decks && 
          decks.map(deck => {
            let path = `/review-deckname-${deck.deckName}`.split(' ').join('-');
            return (
              <Route key={deck} path={path} element={<DeckReview deck={deck} />} />
            )
        })
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
