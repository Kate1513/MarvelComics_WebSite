import React from 'react'

function ComicDetails({ id, title, description, date }) {
  return (
    <a
      id='comicModal'
      className='flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'
    >
      <img
        className='object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg'
        src='/docs/images/blog/image-4.jpg'
        alt=''
      />
      <div className='flex flex-col justify-between p-4 leading-normal'>
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>Titulo: {title}</h5>
        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{description}</p>
        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{date}</p>
      </div>
    </a>
  )
}

export { ComicDetails }

// propiedades a a;adir data-modal-target="ComictModal" data-modal-toggle="ComicModal"