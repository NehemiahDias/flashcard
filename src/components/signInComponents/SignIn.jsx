import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import './SignIn.css';

const SignIn = () => {
    const navigate = useNavigate();
    const {signIn} = UserAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignIn = async e => {
        e.preventDefault();
        try {
            await signIn(email, password);
            navigate('/profile');
        } catch (e) {
            setError(e.message);
            console.log(e.message);
        }
    }

    return (
        <div className='sign-in-container'>
            <h1>Sign In</h1>
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
                <div className='user-actions'>
                    <button type='submit' className='sign-in-btn'>Sign In</button>
                    <Link to='/sign-up' className='link-to-signup'>Don't have an account? Sign Up</Link>
                    <Link to='/forgot-pass' className='link-to-forgotpw'>Forgot Password?</Link>
                </div>
                {error && <p className='error-msg'>{error}</p>}
            </form>
        </div>
    )
}

export default SignIn