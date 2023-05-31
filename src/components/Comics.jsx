import React, { useState, useEffect } from 'react'
import { apiComics } from '../services/API/api'
import { HeartIcon } from '@heroicons/react/24/outline'
import { Loading } from './Loading'
import { useAuth } from '../services/firebase/auth'

function Comics() {
  const auth = useAuth()
  const [comics, setComics] = useState(null)

  const handleFavorite = (comic) => {
    const uid = auth.loggedUser.user.uid
    auth.setFavoriteComic(uid, comic)
  }

  useEffect(() => {
    async function fetchData() {
      const fetch = await apiComics()
      setComics(fetch)
      console.log(fetch)
    }
    fetchData()
  }, [])

  return (
    <>
      <div className='flex justify-between :mx-auto sm:ml-10 sm:mr-10 md:ml-20 md:mr-20'>
        {comics ? (
          <ul className='flex flex-wrap justify-center'>
            {comics.data.results.map((comic) => (
              <li
                key={comic.id}
                className='m-4 w-[160px] lg:w-[190px] xl:w-[220px]  hover:transform hover:scale-105 transition-transform duration-300'
              >
                <div className=''>
                  <a href='#' className='w-full h-full'>
                    <img
                      className='mx-auto h-64 lg:h-72 xl:h-80 rounded-t- w-full drop-shadow-md'
                      src={comic.thumbnail.path + '.' + comic.thumbnail.extension}
                      alt='comic image'
                    />
                  </a>
                  <div className='flex p-2 justify-between h-auto cursor-pointer'>
                    <a href='#'>
                      <h5 className='mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white'>
                        {comic.title}
                      </h5>
                    </a>
                    <div>
                      <HeartIcon onClick={() => handleFavorite(comic)} className='h-8 w-8 text-gray-500' />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <Loading />
        )}
      </div>
    </>
  )
}

export { Comics }
