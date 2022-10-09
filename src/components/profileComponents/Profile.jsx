import { get, onValue, ref } from 'firebase/database';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { db } from '../../firebase-config';
import { UserAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
    const [createdDecks, setCreatedDecks] = useState(0);
    const { user, logout } = UserAuth();

    const fetchData = () => {
        const decksRef = ref(db, `users/${user.uid}/decks`);
        onValue(decksRef, async snapshot => {
            const data = await snapshot.val();
            setCreatedDecks(Object.values(data).length)
        })
    }

    useEffect(() => {
        fetchData();
    }, [user])

    return (
        <div className='profile-container'>
            <h1>You are now signed in</h1>
            <div className="user-info">
                <p>Email: {user.email}</p>
                <p>Created flashcards: {createdDecks}</p>
                <div className="user-controls">
                    <button onClick={logout} className='sign-out-btn' type='button'>Sign Out</button>
                    <button className='delete-acc-btn' type='button'>Delete Account</button>
                </div>
            </div>
        </div>
    )
}

export default Profile