import Image from 'next/image'
import React from 'react'
import Jeu1 from '@/public/asset/jeux/memory.png'
import Jeu2 from '@/public/asset/jeux/septFamilles.png'
import Jeu3 from '@/public/asset/jeux/simon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

function JeuxFavoris () {
  return (
    <div className='bg-white shadow-lg p-4 md:p-6 lg:p-8 rounded-md h-full'>
      <h3 className='text-secondary text-sm md:text-base font-bold'>
        Jeux favoris <FontAwesomeIcon icon={faHeart} className='ml-2' />
      </h3>
      <div className='flex flex-wrap gap-4 md:gap-4 mt-4 md:mt-6 justify-center md:justify-between'>
        <div className='flex flex-col justify-center'>
          <Image
            src={Jeu2}
            className='w-36 md:w-36  xl:w-52   hover:opacity-100 duration-100 cursor-pointer'
            style={{ objectFit: 'contain' }}
            alt='Jeux 1'
          />
        </div>

        <div className='flex flex-col justify-center'>
          <Image
            src={Jeu1}
            className='w-36 md:w-36  xl:w-52   hover:opacity-100 duration-100 cursor-pointer'
            style={{ objectFit: 'contain' }}
            alt='Jeux 2'
          />
        </div>

        <div className='flex flex-col justify-center'>
          <Image
            src={Jeu3}
            className='w-36 md:w-36  xl:w-52   hover:opacity-100 duration-100 cursor-pointer'
            style={{ objectFit: 'contain' }}
            alt='Jeux 3'
          />
        </div>
      </div>
    </div>
  )
}
export default JeuxFavoris

