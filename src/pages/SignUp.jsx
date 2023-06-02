import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../services/firebase/auth'
import { Input } from '../components/Inputs'
import { Alert, Warning } from '../components/Messages'
import { ButtonBack } from '../components/Buttons'

function SignUp() {
  const [nickname, setNickname] = useState('')
  const [idNumber, setIdNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [warning, setWarning] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const auth = useAuth()

  const createUser = (e) => {
    e.preventDefault()
    auth.signUpUser(email, password, nickname, idNumber).catch(() => {
      setError('Correo invalido')
    })
  }

  const goLogin = () => {
    navigate('/')
  }

  const handlePassword = (e) => {
    const value = e.target.value
    setPassword(value)

    if (value.length >= 6) {
      setWarning('')
    } else {
      setWarning('La contraseña debe tener al menos 6 caracteres.')
    }
  }

  return (
    <form
      onSubmit={createUser}
      className='flex flex-col justify-center mx-auto py-8 min-h-screen w-4/5 sm:w-1/2 md:w-2/5 xl:w-1/5 '
    >
      <h1 className='text-center mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>
        <img src='/Marvel_Comics_(2000).svg' alt='Marvel logo' className='justify-center mx-auto w-2/4 rounded m-4' />
        Comics
      </h1>
      <div className='mb-2'>
        <Input
          type='text'
          id='name'
          value={nickname}
          placeholder='Nombre'
          required
          label='Nombre*'
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>
      <div className='mb-2'>
        <Input
          type='number'
          id='id'
          value={idNumber}
          placeholder='12345'
          required
          label='Numero de identificacion*'
          onChange={(e) => setIdNumber(e.target.value)}
        />
      </div>
      <div className='mb-2'>
        <Input
          type='email'
          id='email'
          value={email}
          placeholder='name@company.com'
          required
          label='Email*'
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <Alert>{error}</Alert>}
      </div>
      <div className='mb-2'>
        <Input
          type='password'
          id='password'
          value={password}
          placeholder='••••••••'
          required
          label='Contraseña*'
          onChange={handlePassword}
        />
        {warning && <Warning>{warning}</Warning>}
      </div>
      <button
        type='submit'
        className='text-md text-white mt-4 bg-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        Registrarme
      </button>
      <div className='text-right mt-4 text-md font-medium text-gray-900 dark:text-white'>
        <ButtonBack onClose={goLogin}>Volver</ButtonBack>
      </div>
    </form>
  )
}

export { SignUp }
