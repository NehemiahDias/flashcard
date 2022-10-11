import React from 'react'
import {Navigate} from 'react-router-dom';
import {UserAuth} from './AuthContext';

function ProtectedRoute({children}) {
    const {user} = UserAuth();
    
    if (!user) {
        return <Navigate to='/sign-up' />
    }

    return children;
}

export default ProtectedRoute