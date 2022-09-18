import React from 'react';
import { Link } from 'react-router-dom';

function LandingComponent() {
    return (
        <>
            <h1>Welcome to my site!</h1>
            <p>There's really nothing to put on this page so just click <Link to='create-flashcard'>Here</Link> to be redirected!</p>
        </>
    )
}

export default LandingComponent