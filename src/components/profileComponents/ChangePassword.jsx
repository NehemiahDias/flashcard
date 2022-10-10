import React, { useState } from 'react';
import './ChangePassword.css';

const ChangePassword = ({ user, cancel }) => {
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmNewPass, setConfirmNewPass] = useState('');
    const [error, setError] = useState('');

    const handleChangePass = e => {
        e.preventDefault();
    }

    return (
        <div id='change-pass-sect'>
            <h2>Change Password</h2>
            <form onSubmit={handleChangePass}>
                <div className="input-container">
                    <label htmlFor='current-pass'>Current Password:</label>
                    <input
                        id='current-pass'
                        type='password'
                        onChange={e => setOldPass(e.target.value)}
                        required
                    />
                </div>
                <div className="input-container">
                    <label htmlFor='new-pass'>New Password:</label>
                    <input
                        id='new-pass'
                        type='password'
                        onChange={e => setNewPass(e.target.value)}
                        required
                    />
                </div>
                <div className="input-container">
                    <label htmlFor='confirm-new-pass'>Confirm New Password:</label>
                    <input
                        id='confirm-new-pass'
                        type='password'
                        onChange={e => setConfirmNewPass(e.target.value)}
                        required
                    />
                </div>
                {error && <p className='error-msg'>{error}</p>}
                <div className="edit-action-btns">
                    <button type='submit' className='confirm-changes'>Confirm Changes</button>
                    <button onClick={cancel} type='button' className='cancel-changes'>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default ChangePassword