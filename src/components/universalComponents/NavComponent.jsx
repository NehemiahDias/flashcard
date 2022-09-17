import './Nav.css';
import React from 'react';
import { Link } from 'react-router-dom';

function NavComponent() {
  return (
    <div className="navbar">
        <h1>Flashcards!</h1>
        <nav>
            <Link className='link' to='/'>Home</Link> |
            <Link className='link' to='create-flashcard'>Create Flash Card</Link> |
            <Link className='link' to='review-flashcard'>Review Flash Cards</Link> |
            <Link className='link' to='about'>About</Link> 
        </nav>
    </div>
  )
}

export default NavComponent