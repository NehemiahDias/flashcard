import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignIn = e => {
        e.preventDefault();
    }

    return (
        <div className='sign-in-container'>
            <h1>Sign Up</h1>
            <form onSubmit={handleSignIn}>
                <div className='input-field'>
                    <label htmlFor='email'>Enter Email:</label>
                    <input
                        id='email'
                        type='email'
                        placeholder='Email...'
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='input-field'>
                    <label htmlFor='password'>Enter Password:</label>
                    <input
                        id='password'
                        type='password'
                        placeholder='Password...'
                        onChange={e => setPassword(e.target.value)}
                        min='3'
                        required
                    />
                </div>
                <div className='input-field'>
                    <label htmlFor='confirm-password'>Confirm Password:</label>
                    <input
                        id='confirm-password'
                        type='password'
                        placeholder='Confirm Password...'
                        onChange={e => setConfirmPassword(e.target.value)}
                        min='3'
                        required
                    />
                </div>
                <div className='user-actions'>
                    <button type='submit' className='sign-in-btn'>Sign Up</button>
                    <Link to='/sign-in' className='link-to-signup'>Already have and account? Sign In</Link>
                </div>
            </form>
        </div>
    )
}

export default SignUp