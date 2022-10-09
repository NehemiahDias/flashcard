import React from 'react';
import './DeleteProfile.css';

const DeleteProfile = ({toggle}) => {

    const handleDelete = () => {
        return;
    }

  return (
    <div className="background-popup">
        <div className='popup-container'>
            <h1>Are you sure?</h1>
            <p>This will delete all of your data including your decks? If you'd like to continue, export your decks first so you don't lose them! Are you sure you want to continue?</p>
            <div className="delete-action-btns">
                <button className='confirm-del' onClick={handleDelete}>Yes</button>
                <button className='cancel-del' onClick={toggle}>No</button>
            </div>
        </div>
    </div>
  )
}

export default DeleteProfile