import React, { useState, useEffect } from 'react'
import { apiComics } from '../services/API/api'
import { useAuth } from '../services/firebase/auth'
import { Loading } from './Loading'
import { HeartIcon } from '@heroicons/react/24/outline'
import { ButtonBack } from './Buttons'

function Comics() {
  const auth = useAuth()
  const [comics, setComics] = useState(null)
  const [comic, setComic] = useState(null)
  const [showDetails, setShowDetails] = useState(false)

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

  const closeDetails = () => {
    setShowDetails(false)
  }

  const ComicDetailsView = (id, title, description, date, imageURL) => {
    const descriptionComic =
      description === null
        ? 'No hay una descripción disponible en el momento, pedimos una disculpa.'
        : description.length < 10
        ? 'No hay una descripción disponible en el momento, pedimos una disculpa.'
        : description

    const comicDetails = {
      id_Comic: id,
      image_Comic: imageURL,
      title_Comic: title,
      description_Comic: descriptionComic,
      date_Comic: date,
    }
    setComic(comicDetails)
    setShowDetails(true)
  }

  return (
    <>
      {showDetails ? null : (
        <div className='flex justify-between :mx-auto mt-4 sm:ml-10 sm:mr-10 md:ml-20 md:mr-20'>
          {comics ? (
            <ul className='flex flex-wrap justify-center'>
              {comics.data.results.map((comic) => (
                <li key={comic.id} className='m-4 w-[160px] lg:w-[190px] xl:w-[220px]'>
                  <div className='hover:text-red-500'>
                    <a className='w-full h-full'>
                      <img
                        className='mx-auto h-64 lg:h-72 xl:h-80 rounded-t- w-full drop-shadow-md hover:transform hover:scale-105 transition-transform duration-300'
                        src={comic.thumbnail.path + '.' + comic.thumbnail.extension}
                        alt='comic image'
                        onClick={() =>
                          ComicDetailsView(
                            comic.id,
                            comic.title,
                            comic.description,
                            comic.dates[1].date,
                            comic.thumbnail.path + '.' + comic.thumbnail.extension
                          )
                        }
                      />
                    </a>
                    <div className='flex p-2 justify-between h-auto cursor-pointer'>
                      <a>
                        <h5 className='mb-2 p-1 text-sm font-bold tracking-tight text-gray-900 dark:text-white hover:text-red-500'>
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
      )}

      {showDetails ? (
        <section className='flex justify-center mx-auto mt-4 sm:my-14 md:my-20 w-[300px] lg:w-[400px] xl:w-[500px]'>
          <div className='flex flex-col'>
            <a
              id='comicModal'
              className='flex flex-col mx-auto items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'
            >
              <img
                className='object-cover w-full rounded-t-lg h-64 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg'
                src={comic.image_Comic}
                alt='Comic image'
              />
              <div className='flex flex-col justify-between p-4 leading-normal'>
                <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                  Titulo:{comic.title_Comic}
                </h5>
                <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{comic.description_Comic}</p>
              </div>

              <div className='flex items-center p-4 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600'></div>
            </a>
            <div>
              <ButtonBack onClose={closeDetails}>Volver</ButtonBack>
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}

export { Comics }
