import React from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

function LandingComponent() {
    const {user} = UserAuth();
    return (
        <>
            <h1>Welcome to The Deck!</h1>
            <p>This is the fastest, easiest, simplist, freeist site on the web for creating flash cards! This site was created to help people study without account creation or paywalls. So what are you waiting for? {user ? <Link to='/create-flashcard' >Click here</Link> : <Link to='sign-up'>Click here</Link>} to begin.</p>
        </>
    )
}

export default LandingComponent