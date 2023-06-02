import React from 'react'
import { ArrowLongLeftIcon } from '@heroicons/react/24/outline'
import { PropTypes } from 'prop-types'

function ButtonBack({ onClose, children }) {
  return (
    <div className='flex justify-end m-4'>
      <button onClick={onClose} className='flex'>
        <ArrowLongLeftIcon className='h-6 w-6 text-gray-500' />
        {children}
      </button>
    </div>
  )
}

ButtonBack.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.string,
}

export { ButtonBack }
