'use client'

import Image from 'next/image'
import Jeu1 from '@/public/asset/jeux/memory.png'
import Jeu2 from '@/public/asset/jeux/puissanceQuatre.png'
import Jeu3 from '@/public/asset/jeux/simon.png'
import Jeu4 from '@/public/asset/jeux/quiEstCe.png'
import Jeu5 from '@/public/asset/jeux/septFamilles.png'

export default function Gaming() {
  return (
    <div className='flex flex-col p-5 my-8 gap-8 lg:flex-row md:px-20'>
      <div className='flex flex-col gap-10 justify-center'>
        <div>
          <h3 className='text-secondary'>Nos jeux</h3>
          <h2 className='text-primary max-w-2xl'>Des jeux appropriés en fonction du trouble</h2>
        </div>
        <p>Nos jeux sont adaptés en fonction du trouble dys de l'enfant.</p>
      </div>
      <div className='flex flex-wrap justify-center gap-8 p-4'>
        <div className='flex flex-col items-center'>
          <div className='relative w-40 h-28 md:w-56 md:h-36 bg-gray-100 rounded-lg overflow-hidden'>
            <Image
              src={Jeu1}
              alt='Jeu de mémoire'
              fill
              className='object-cover'
            />
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <div className='relative w-40 h-28 md:w-56 md:h-36 bg-gray-100 rounded-lg overflow-hidden'>
            <Image
              src={Jeu2}
              alt='Puissance 4'
              fill
              className='object-cover'
            />
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <div className='relative w-40 h-28 md:w-56 md:h-36 bg-gray-100 rounded-lg overflow-hidden'>
            <Image
              src={Jeu3}
              alt='Simon'
              fill
              className='object-cover'
            />
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <div className='relative w-40 h-28 md:w-56 md:h-36 bg-gray-100 rounded-lg overflow-hidden'>
            <Image
              src={Jeu4}
              alt='Jeu de lettres'
              fill
              className='object-cover'
            />
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <div className='relative w-40 h-28 md:w-56 md:h-36 bg-gray-100 rounded-lg overflow-hidden'>
            <Image
              src={Jeu5}
              alt='Jeu de calcul'
              fill
              className='object-cover'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
