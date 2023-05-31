import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../services/firebase/auth'
import { Input } from '../components/Inputs'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const auth = useAuth()

  const login = (e) => {
    e.preventDefault()
    auth.loginUser(email, password)
  }

  const goSignUp = () => {
    navigate('/signup')
  }

  return (
    <section className='flex flex-col justify-center mx-auto min-h-screen bg-gray-50 dark:bg-gray-900 h-screen'>
      <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16'>
        <div className='flex flex-col justify-center'>
          <h1 className='items-center text-center mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>
            <img src='/Marvel_Comics_(2000).svg' alt='Marvel logo' className='justify-center mx-auto w-2/4' />
            Marvel Comics
          </h1>
          <p className='text-center mb-6 text-lg font-normal min-h-max text-gray-500 lg:text-xl dark:text-gray-400'>
            Aqui puedes explorar todos los comics de Marvel y saber mas sobre ellos.
          </p>
        </div>
        <div>
          <div className='w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800'>
            <h2 className='text-center text-2xl font-bold text-gray-900 dark:text-white'>Inicio de sesion</h2>
            <form className='mt-8 space-y-6' action='#' onSubmit={login}>
              <Input
                type='email'
                name='email'
                id='email'
                value={email}
                placeholder='name@company.com'
                label='Email*'
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type='password'
                name='password'
                id='password'
                value={password}
                placeholder='••••••••'
                label='Contraseña*'
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type='submit'
                className='block mx-auto w-full px-5 py-3 text-base font-medium text-center text-white bg-black rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                Iniciar Sesion
              </button>
              <div className='text-right text-sm font-medium text-gray-900 dark:text-white'>
                ¿No estas registrado?{' '}
                <a onClick={goSignUp} className='cursor-pointer text-blue-600 hover:underline dark:text-blue-500'>
                  Crea tu cuenta
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export { Login }
