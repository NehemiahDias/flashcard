import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingComponent from "./components/landingComponents/LandingComponent";
import NavComponent from "./components/universalComponents/NavComponent";
import CreateFlashcard from "./components/flashcardComponents/CreateFlashcard";

function App() {
  return (
    <BrowserRouter>
      <NavComponent />
      <Routes>
        <Route path='/' element={<LandingComponent/>}/>
        <Route path='/create-flashcard' element={<CreateFlashcard/>}/>
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
