import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingComponent from "./components/landingComponents/LandingComponent";
import NavComponent from "./components/universalComponents/NavComponent";

function App() {
  return (
    <BrowserRouter>
      <NavComponent />
      <Routes>
        <Route path='/' element={<LandingComponent/>}/>
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
