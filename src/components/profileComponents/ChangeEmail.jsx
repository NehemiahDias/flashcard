import { EmailAuthProvider, reauthenticateWithCredential, sendEmailVerification, updateEmail } from 'firebase/auth';
import React from 'react'
import { useState } from 'react'

const ChangeEmail = ({ user, cancel }) => {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = async e => {
    e.preventDefault();
    var cred = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, cred).then(() => {
      updateEmail(user, email).then(() => {
        cancel();
      }).then(() => {
        sendEmailVerification(user).catch(e => {
          console.error(e);
          setError(e.message)
        })
      }).catch(e => {
        console.error(e)
        switch (e.message) {
          case 'Firebase: Error (auth/email-already-in-use).':
            setError('Email already in use!')
            break;
          case 'Firebase: Error (auth/wrong-password).':
            setError('Incorrect password!')
            break;
          default:
            setError(e.message);
            break;
        }
      })
    }).catch(e => {
      switch (e.message) {
        case 'Firebase: Error (auth/wrong-password).':
          setError('Incorrect password!')
          break;
        default:
          setError(e.message);
          break;
      }
    })

  }

  return (
    <div id='change-pass-sect'>
      <h2>Change Email</h2>
      <form onSubmit={handleChangeEmail}>
        <div className="input-container">
          <label htmlFor='new-email'>New Email:</label>
          <input
            id='new-email'
            type='email'
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor='confirm-pass'>Current Password:</label>
          <input
            id='confirm-pass'
            type='password'
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className='error-msg-prof'>{error}</p>}
        <div className="edit-action-btns">
          <button type='submit' className='confirm-changes'>Confirm Changes</button>
          <button onClick={cancel} type='button' className='cancel-changes'>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default ChangeEmail