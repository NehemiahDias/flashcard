import { deleteUser, EmailAuthProvider, getAuth, reauthenticateWithCredential } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase-config';
import './DeleteProfile.css';

const DeleteProfile = ({toggle}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();
    const user = auth.currentUser;

    const handleDelete = async e => {
        e.preventDefault();
        const credential = EmailAuthProvider.credential(email, password);
        await set(ref(db, `users/${user.uid}`), null);
        await reauthenticateWithCredential(user, credential).then(() => {
            deleteUser(user).then(() => {
                navigate('/');
            }).catch(e => {
                console.error(e);
            })
        }).catch(e => {
            console.error(e)
        })
    }

  return (
    <div className="background-popup">
        <div className='popup-container'>
            <h1>Are you sure?</h1>
            <p>This will delete all of your data including your decks. If you'd like to continue, export your decks first so you don't lose them! Enter your email and password if you want to continue:</p>
            <form onSubmit={handleDelete}>
                <label htmlFor='confirm-email'>Enter Email:</label>
                <input 
                    type='email'
                    id='confirm-email'
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <label htmlFor='password-confirm'>Enter password</label>
                <input 
                    type='password'
                    id='password-confirm'
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <div className="delete-action-btns">
                <button type='submit' className='confirm-del' onClick={handleDelete}>Yes</button>
                <button type='button' className='cancel-del' onClick={toggle}>No</button>
            </div>
            </form>
            
        </div>
    </div>
  )
}

export default DeleteProfile