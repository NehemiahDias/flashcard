import React from 'react';
import './ChangePassword.css';

const ChangePassword = ({user}) => {
  return (
    <div id='change-pass-sect'>
        <h2>Change Password</h2>
        <form onSubmit={e => e.preventDefault()}>
            <label htmlFor='current-pass'>Current Password:</label>
            <input 
                id='current-pass'
                type='password'
                required
            />
            <label htmlFor='new-pass'>Current Password:</label>
            <input 
                id='new-pass'
                type='password'
                required
            />
            <label htmlFor='confirm-new-pass'>Current Password:</label>
            <input 
                id='confirm-new-pass'
                type='password'
                required
            />
            <button type='submit'>Confirm Changes</button>
        </form>
    </div>
  )
}

export default ChangePassword