import {createContext, useContext, useEffect, useState} from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    onAuthStateChanged,
    signInWithRedirect,
    getRedirectResult,
    GoogleAuthProvider
} from 'firebase/auth';
import { auth } from '../../firebase-config';

const UserContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({});

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const updateUsername = (username) => {
        return updateProfile(auth.currentUser, {
            displayName: username
        })
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        return signOut(auth);
    }

    const signInWithGoogle = (auth, provider) => {
        signInWithRedirect(auth, provider);
    }

    const redirectResult = async auth => {
        return await getRedirectResult(auth)
            .then(result => {
                const credential = GoogleAuthProvider.credentialFromResult(result)
                if (result.user === null){
                    setUser({})
                } else {
                    setUser(result.user);
                }
                window.location.href = 'http://localhost:3000/profile'
            }).catch(e => {
                console.error(e);
            })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => {
            unsubscribe()
        }
        // eslint-disable-next-line
    }, [])

    return (
        <UserContext.Provider value={{createUser, user, logout, signIn, updateUsername, signInWithGoogle, redirectResult}}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}