import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './services/firebase/auth'
// import { IsLogged, IsNotLogged } from './Routes'
import { Login } from './pages/Login'
import { SignUp } from './pages/SignUp'
import { Home } from './pages/Home'
import { PageNotFound } from './pages/PageNotFound'

function App() {
  return (
    <>
      <HashRouter>
        <AuthProvider>
          <Routes>
            <Route
              path='/'
              element={
                // <IsNotLogged>
                <Login />
                // </IsNotLogged>
              }
            />
            <Route path='/signup' element={<SignUp />} />
            <Route
              path='/home'
              element={
                // <IsLogged>
                <Home />
                // </IsLogged>
              }
            />
            <Route path='/*' element={<PageNotFound />} />
          </Routes>
        </AuthProvider>
      </HashRouter>
    </>
  )
}

export default App
