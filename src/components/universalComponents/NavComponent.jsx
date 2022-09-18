import './Nav.css';
import React from 'react';
import { Link } from 'react-router-dom';

function NavComponent() {
  return (
    <div className="navbar">
        <h1>Flashcards!</h1>
        <nav>
            <Link className='link' to='/'>Home</Link> |
            <Link className='link' to='create-flashcard'>Create</Link> |
            <Link className='link' to='review-flashcard'>Review</Link>
        </nav>
    </div>
  )
}

export default NavComponent