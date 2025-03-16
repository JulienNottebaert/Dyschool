import Image from 'next/image'
import React from 'react'
import Jeu1 from '@/public/asset/dashboard/jeu1.png'
import Jeu2 from '@/public/asset/dashboard/jeu2.png'
import Jeu3 from '@/public/asset/dashboard/jeu3.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

function JeuxFavoris () {
  return (
    <div className='bg-white shadow-lg p-4 md:p-6 lg:p-8 rounded-md h-full'>
      <h3 className='text-secondary text-sm md:text-base'>
        Jeux favoris <FontAwesomeIcon icon={faHeart} className='ml-2' />
      </h3>
      <div className='flex flex-wrap gap-4 md:gap-6 mt-4 md:mt-6 justify-center md:justify-between'>
        <div className='flex flex-col justify-center'>
          <Image
            src={Jeu1}
            className='w-36 h-20 md:w-44 md:h-24 lg:w-52 lg:h-28 opacity-30 hover:opacity-100 duration-100 cursor-pointer'
            style={{ objectFit: 'cover' }}
            alt='Jeux 1'
          />
          <h4 className='text-center mt-2 text-xs md:text-sm'>Jeu de mémoire</h4>
        </div>

        <div className='flex flex-col justify-center'>
          <Image
            src={Jeu2}
            className='w-36 h-20 md:w-44 md:h-24 lg:w-52 lg:h-28 opacity-30 hover:opacity-100 duration-100 cursor-pointer'
            style={{ objectFit: 'cover' }}
            alt='Jeux 2'
          />
          <h4 className='text-center mt-2 text-xs md:text-sm'>Puissance 4</h4>
        </div>

        <div className='flex flex-col justify-center'>
          <Image
            src={Jeu3}
            className='w-36 h-20 md:w-44 md:h-24 lg:w-52 lg:h-28 opacity-30 hover:opacity-100 duration-100 cursor-pointer'
            style={{ objectFit: 'cover' }}
            alt='Jeux 3'
          />
          <h4 className='text-center mt-2 text-xs md:text-sm'>Simon</h4>
        </div>
      </div>
    </div>
  )
}

export default JeuxFavoris
