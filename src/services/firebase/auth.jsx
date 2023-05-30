import React from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { setDoc, doc, getDoc } from 'firebase/firestore'
import { auth, db } from './firebase'
import { useNavigate } from 'react-router-dom'
import { PropTypes } from 'prop-types'

const AuthContext = React.createContext()

function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [loggedUser, setLoggedUser] = React.useState(null)

  // Create user with email and password
  const signUpUser = (email, password, nickname, idNumber) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoggedUser(userCredential)
        registerDocUser(userCredential.user.uid, nickname, idNumber)
        navigate('/home')
      })
      .catch(() => {
        throw new Error()
      })
  }

  // Create User Document in Firestore.
  const registerDocUser = async (uid, nickname, idNumber) => {
    await setDoc(doc(db, 'Users', uid), {
      name: nickname,
      id: idNumber,
      preferences: JSON.stringify({ favoriteComics: [] }),
    })
  }

  // Login with email and password
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userData = getUserData(userCredential.user.uid)
        const data = { ...userCredential, ...userData }
        setLoggedUser(data)
        window.sessionStorage.setItem('user', JSON.stringify(data))
        navigate('/home')
      })
      .catch(() => {
        throw new Error('No existe el usuario')
      })
  }

  // Get user preferences.
  const getUserData = async (uid) => {
    const user = doc(db, 'Users', uid)
    const userSnap = await getDoc(user)
    if (userSnap.exists()) {
      return userSnap.data()
    } else {
      throw new Error('No existe documento del usuario.')
    }
  }

  const keepLoged = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/home')
      } else {
        navigate('/')
      }
    })
  }

  // LogOut User
  const logoutUser = () => {
    signOut(auth)
    setLoggedUser(null)
    window.sessionStorage.clear()
    navigate('/')
  }

  const authUser = { loggedUser, signUpUser, loginUser, keepLoged, logoutUser }

  return <AuthContext.Provider value={authUser}>{children}</AuthContext.Provider>
}

function useAuth() {
  const authContext = React.useContext(AuthContext)
  return authContext
}

AuthProvider.propTypes = {
  children: PropTypes.object,
}

export { AuthProvider, useAuth }
