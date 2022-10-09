import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { UserAuth } from '../context/AuthContext';
import google from '../../resources/google-logo-png-open-2000.png'
import './SignIn.css';

const SignIn = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    const {signIn, signInWithGoogle, redirectResult} = UserAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const provider = new GoogleAuthProvider();
    redirectResult(auth)

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

    const handleGoogleSignIn = async () => {
        await signInWithGoogle(auth, provider);
        navigate('/profile');
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
                    <button type='button' onClick={handleGoogleSignIn} className='google-sign-in'>
                        <img src={google} alt='google' />
                    </button>
                    <Link to='/sign-up' className='link-to-signup'>Don't have an account? Sign Up</Link>
                    <Link to='/forgot-pass' className='link-to-forgotpw'>Forgot Password?</Link>
                </div>
                {error && <p className='error-msg'>{error}</p>}
            </form>
        </div>
    )
}

export default SignIn