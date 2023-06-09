import React, { useEffect } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { setDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from './firebase'
import { useNavigate } from 'react-router-dom'
import { PropTypes } from 'prop-types'

const AuthContext = React.createContext()

function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [loggedUser, setLoggedUser] = React.useState(null)

  useEffect(() => {
    if (window.sessionStorage.length > 0) {
      const userStorage = window.sessionStorage.getItem('user')
      setLoggedUser(JSON.parse(userStorage))
    }
  }, [])

  // Create user with email and password
  const signUpUser = async (email, password, nickname, idNumber) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      registerDocUser(userCredential.user.uid, nickname, idNumber)
      navigate('/')
    } catch {
      throw new Error()
    }
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
  const loginUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const userData = await getUserData(userCredential.user.uid)
      const data = { ...userCredential, ...userData }
      setLoggedUser(data)
      window.sessionStorage.setItem('user', JSON.stringify(data))
    } catch {
      throw new Error('No existe el usuario')
    }
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

  // Set user preferences.
  const setFavoriteComic = async (uid, newFavoriteComic) => {
    const userDocument = doc(db, 'Users', uid)
    const snapPreferences = (await getDoc(userDocument)).data().preferences
    const preferences = JSON.parse(snapPreferences)
    preferences.favoriteComics.push(newFavoriteComic)

    await updateDoc(userDocument, {
      preferences: JSON.stringify(preferences),
    })
    const userStorage = JSON.parse(window.sessionStorage.getItem('user'))
    userStorage.preferences = JSON.stringify(preferences)
    setLoggedUser(userStorage)
    window.sessionStorage.setItem('user', JSON.stringify(userStorage))
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
    window.sessionStorage.clear()
    setLoggedUser(null)
    signOut(auth)
  }

  const authUser = { loggedUser, signUpUser, loginUser, keepLoged, logoutUser, setFavoriteComic }

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
