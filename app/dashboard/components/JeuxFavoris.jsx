import Image from 'next/image'
import React from 'react'
import Jeux1 from '@/public/asset/dashboard/jeux.jpg'
import ER from '@/public/asset/dashboard/er.jpg'
import Zelda from '@/public/asset/dashboard/zelda.jpg'
import LoL from '@/public/asset/dashboard/lol.jpg'

function JeuxFavoris () {
  return (
    <div className='bg-white shadow-lg p-8 col-span-9 row-span-4 rounded-md px-10'>
      <h3 className='text-secondary'>Jeux favoris</h3>
      <div className='flex flex-wrap h-fit mt-4 justify-between w-full'>
        <div className='flex flex-col justify-center'>
          <Image src={Jeux1} className='w-52 h-28 opacity-50 hover:opacity-100 duration-100 cursor-pointer' style={{ objectFit: 'cover' }} alt='Jeux 1' />
          <h4 className='text-center mt-2 text-md'>Mario et les lapins crétins</h4>
        </div>

        <div className='flex flex-col justify-center'>
          <Image src={ER} className='w-52 h-28 opacity-50 hover:opacity-100 duration-100 cursor-pointer' style={{ objectFit: 'cover' }} alt='Jeux 1' />
          <h4 className='text-center mt-2 text-md'>Elden Ring</h4>
        </div>

        <div className='flex flex-col justify-center'>
          <Image src={Zelda} className='w-52 h-28 opacity-50 hover:opacity-100 duration-100 cursor-pointer' style={{ objectFit: 'cover' }} alt='Jeux 1' />
          <h4 className='text-center mt-2 text-md'>Zelda tears of the kingdom</h4>
        </div>

        <div className='flex flex-col justify-center'>
          <Image src={LoL} className='w-52 h-28 opacity-50 hover:opacity-100 duration-100 cursor-pointer' style={{ objectFit: 'cover' }} alt='Jeux 1' />
          <h4 className='text-center mt-2 text-md'>League of Legends</h4>
        </div>
      </div>
    </div>
  )
}

export default JeuxFavoris
