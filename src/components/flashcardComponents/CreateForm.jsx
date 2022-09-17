import React from 'react';
import { useState } from 'react';
import './CreateForm.css';

function CreateForm() {
  const [cards, setCards] = useState([{title: '', definition: ''}]);

  return (
    <div className="create-deck">
      <h3>Create Deck</h3>
      <form onSubmit={(e) => e.preventDefault()}>
          <input 
              placeholder='Study Deck Title...'
              className='deck-input'
              required
          />
          <textarea 
            placeholder='Description...' 
            className='deck-input' 
            rows='5'
          >
          </textarea>
          <div className="new-cards">
            <div className="card">
              <div className="card-actions">
                <div className="num">
                  <p>1</p>
                </div>
                <div className="delete">
                  <p>🗑️</p>
                </div>
              </div>
              <hr />
              <div className="card-input">
                <input 
                  placeholder='Enter Term'
                  className='term' 
                />
                <p className='term-desc'>Term</p>
                <input 
                  placeholder='Enter Definition'
                  className='def' 
                />
                <p className='def-desc'>Definition</p>
              </div>
            </div>
          </div>
          <button className='add-card' type='button'>+ Add Card</button>
          <button className='submit' type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default CreateForm