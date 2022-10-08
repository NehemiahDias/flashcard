import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavComponent from "./components/universalComponents/NavComponent";
import CreateFlashcard from "./components/flashcardComponents/CreateFlashcard";
import ReviewFlashcard from "./components/flashcardComponents/ReviewFlashcard";
import DeckReview from "./components/flashcardComponents/DeckReview";
import SignIn from "./components/signInComponents/SignIn";
import SignUp from "./components/signUpComponents/SignUp";
import { AuthContextProvider } from "./components/context/AuthContext";
import Profile from "./components/profileComponents/Profile";

function App() {
  const [decks, setDecks] = useState(null);
  
  useEffect(() => {
    let tempDecks = localStorage.getItem('decks');
    tempDecks = JSON.parse(tempDecks);
    setDecks(tempDecks);
  }, [])

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <NavComponent />
        <Routes>
          <Route path='/' element={<CreateFlashcard/>}/>
          <Route path='/review-flashcard' element={<ReviewFlashcard/>}/>
          <Route path='/sign-in' element={<SignIn />}/>
          <Route path='/sign-up' element={<SignUp />}/>
          <Route path='/profile' element={<Profile />}/>
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
    </AuthContextProvider>
  );
}

export default App;
