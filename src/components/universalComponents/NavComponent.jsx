import './Nav.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavComponent() {
  const navigate = useNavigate();

  return (
    <div className="navbar">
        <h1 onClick={() => navigate('/')}>The Deck</h1>
        <nav>
            <Link className='link' to='/'>Create</Link> |
            <Link className='link' to='review-flashcard'>Review</Link> |
            <Link className='link' to='sign-in'>Sign In</Link>
        </nav>
    </div>
  )
}

export default NavComponent