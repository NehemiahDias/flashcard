import React from 'react'
import {Navigate} from 'react-router-dom';
import {UserAuth} from './AuthContext';

function UserProtectedRoute({children}) {
    const {user} = UserAuth();
    
    if (user) {
        return <Navigate to='/profile' />
    }

    return children;
}

export default UserProtectedRoute