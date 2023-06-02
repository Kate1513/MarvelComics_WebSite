import React from 'react'
import { PropTypes } from 'prop-types'

function Input(props) {
  return (
    <>
      <div>
        <label htmlFor={props.name} className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
          {props.label}
        </label>
        <input
          type={props.type}
          name={props.name}
          id={props.id}
          value={props.value}
          className='text-md bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-yellow-300 focus:border-yellow-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-300 dark:focus:border-yellow-300'
          placeholder={props.placeholder}
          onChange={props.onChange}
          required
        />
      </div>
    </>
  )
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
}

export { Input }
