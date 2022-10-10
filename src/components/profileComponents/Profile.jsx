import { onValue, ref } from 'firebase/database';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { db } from '../../firebase-config';
import { UserAuth } from '../context/AuthContext';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import DeleteProfile from './DeleteProfile';
import './Profile.css';

const Profile = () => {
    const [createdDecks, setCreatedDecks] = useState(0);
    const [deleteAcc, setDeleteAcc] = useState(false);
    const [passSettings, setPassSettings] = useState(false);
    const [emailSettings, setEmailSettings] = useState(false);
    const { user, logout } = UserAuth();

    const fetchData = async () => {
        const decksRef = ref(db, `users/${user.uid}/decks`);
        onValue(decksRef, async snapshot => {
            const data = await snapshot.val();
            setCreatedDecks(Object.values(data).length)
        })
    }

    const togglePassword = () => {
        setPassSettings(!passSettings);
    }

    const toggleEmail = () => {
        setEmailSettings(!emailSettings);
    }

    const toggleDelete = () => {
        setDeleteAcc(!deleteAcc)
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    return (
        <div className='profile-container'>
            {deleteAcc && <DeleteProfile toggle={toggleDelete} />}
            <h1>You are now signed in</h1>
            <div className="user-info">
                <p>Email: {user.email}</p>
                <p>Created flashcards: {createdDecks}</p>
                <div className="user-controls">
                    <button onClick={logout} className='sign-out-btn' type='button'>Sign Out</button>
                </div>
                <div className="user-controls">
                    <h3>Manage Accounts</h3>
                    <button onClick={togglePassword} className='change-pass-btn'>Change Password</button>
                    <button onClick={toggleEmail} className='change-email-btn'>Change Email</button>
                </div>
                {passSettings && <ChangePassword cancel={togglePassword} user={user} />}
                {emailSettings && <ChangeEmail cancel={toggleEmail} user={user} />}
            </div>
        </div>
    )
}

export default Profile