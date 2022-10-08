import React from 'react';
import { useState } from 'react';
import './SignIn.css';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = e => {
        e.preventDefault();
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
                <button type='button' className='link-to-signup'>Don't have an account? Sign Up</button>
                <button type='button' className='link-to-forgotpw'>Forgot Password?</button>
            </div>
        </form>
    </div>
  )
}

export default SignIn