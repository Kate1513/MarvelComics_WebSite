import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../services/firebase/auth'
import { PropTypes } from 'prop-types'

function NavbarTop(props) {
  const auth = useAuth()

  const handleLogout = () => {
    auth.logoutUser()
  }
  return (
    <nav className='bg-white border-gray-200 dark:bg-gray-900'>
      <section className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4'>
        <div className='flex items-center'>
          <img src='/marvel-comics-old-logo-r.png' className='h-16 mr-3' alt='Flowbite Logo' />
          <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
            Bienvenido {props.userName}
          </span>
        </div>
        <div className='flex items-center'>
          <a onClick={handleLogout} className='text-sm text-blue-600 dark:text-blue-500 hover:underline'>
            Cerrar sesión
          </a>
        </div>
      </section>
    </nav>
  )
}

function NavbarBottom() {
  const navigate = useNavigate()

  const favorites = () => {
    navigate('/favorites')
  }
  return (
    <nav className='bg-gray-50 dark:bg-gray-700'>
      <div className='max-w-screen-xl px-4 py-3 mx-auto'>
        <div className='flex items-center justify-center'>
          <ul className='flex flex-row justify-center font-medium mt-0 mr-6 space-x-8 text-sm'>
            <li>
              <a
                href='#'
                className='text-gray-900 text-xl dark:text-white hover:underline cursor-pointer'
                aria-current='page'
              >
                Comics
              </a>
            </li>
            <li>
              <a
                onClick={favorites}
                className='text-gray-900 text-xl dark:text-white hover:underline cursor-pointer'
                aria-current='page'
              >
                Mi lista
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

NavbarTop.propTypes = {
  userName: PropTypes.string,
}

export { NavbarTop, NavbarBottom }
