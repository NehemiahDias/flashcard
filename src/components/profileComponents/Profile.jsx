import React from 'react';
import { useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
    const { user, logout } = UserAuth();

    useEffect(() => {
        console.log(user)
    }, [user])

    return (
        <div className='profile-container'>
            <h1>You are now signed in</h1>
            <div className="user-info">
                <p>Email: {user.email}</p>
                <div className="user-controls">
                    <button onClick={logout} className='sign-out-btn' type='button'>Sign Out</button>
                    <button className='delete-acc-btn' type='button'>Delete Account</button>
                </div>
            </div>
        </div>
    )
}

export default Profile