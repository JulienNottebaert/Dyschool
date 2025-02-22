import Image from 'next/image'
import React from 'react'
import Jeu1 from '@/public/asset/dashboard/jeu1.png'
import Jeu2 from '@/public/asset/dashboard/jeu2.png'
import Jeu3 from '@/public/asset/dashboard/jeu3.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

function JeuxFavoris () {
  return (
    <div className='bg-white shadow-lg p-6 col-span-9 row-span-3 rounded-md px-10'>
      <h3 className='text-secondary'>Jeux favoris <FontAwesomeIcon icon={faHeart} className='ml-2' />
      </h3>
      <div className='flex flex-wrap h-fit mt-5 justify-between w-full'>
        <div className='flex flex-col justify-center'>
          <Image src={Jeu1} className='w-52 h-28 opacity-30 hover:opacity-100 duration-100 cursor-pointer' style={{ objectFit: 'cover' }} alt='Jeux 1' />
          <h4 className='text-center mt-2 text-md'>Jeu de mémoire</h4>
        </div>

        <div className='flex flex-col justify-center'>
          <Image src={Jeu2} className='w-52 h-28 opacity-30 hover:opacity-100 duration-100 cursor-pointer' style={{ objectFit: 'cover' }} alt='Jeux 1' />
          <h4 className='text-center mt-2 text-md'>Puissance 4</h4>
        </div>

        <div className='flex flex-col justify-center'>
          <Image src={Jeu3} className='w-52 h-28 opacity-30 hover:opacity-100 duration-100 cursor-pointer' style={{ objectFit: 'cover' }} alt='Jeux 1' />
          <h4 className='text-center mt-2 text-md'>Simon</h4>
        </div>
      </div>
    </div>
  )
}

export default JeuxFavoris
