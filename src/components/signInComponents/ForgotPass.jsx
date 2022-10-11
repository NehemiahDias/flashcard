import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const ForgotPass = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const auth = getAuth();
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email).then(() => {
      navigate('/sign-in');
    }).catch(e => {
      switch (e.message) {
        case 'Firebase: Error (auth/user-not-found).':
          setError('User doesn\'t exist');
          break;
      
        default:
          setError(e.message)
          break;
      }
    })
  }

  return (
    <div className='sign-in-container'>
            <h1>Forgot Password</h1>
            <p className='forgot-pass-p'>Enter your email for a link to reset your password. (Make sure to check your spam folder)!</p>
            <form onSubmit={handleSubmit}>
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
                <div className='user-actions'>
                    <button type='submit' className='sign-in-btn'>Send Email</button>
                    <Link to='/sign-up' className='link-to-signup'>Go back to sign up page</Link>
                </div>
                {error && <p className='error-msg'>{error}</p>}
            </form>
        </div>
  )
}

export default ForgotPass