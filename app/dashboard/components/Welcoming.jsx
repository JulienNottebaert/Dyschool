import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import Enfants from '@/public/asset/dashboard/enfants.svg'

function Welcoming ({ data }) {
  const today = new Date()
  const formattedDate = new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }).format(today)

  return (
    <div className='bg-white shadow-lg p-4 md:p-6 lg:p-8 rounded-md flex flex-col md:flex-row justify-between h-full relative'>
      <div className='flex flex-col justify-between z-10'>
        <p className='bg-secondary text-white py-2 px-4 w-fit rounded-lg text-xs md:text-sm'>
          <FontAwesomeIcon icon={faCalendar} className='mr-2' />
          {formattedDate}
        </p>
        <div className='mt-4 md:mt-0'>
          <h2 className='text-primary text-lg md:text-xl lg:text-2xl font-bold truncate max-w-[200px] md:max-w-md'>Salut {data.prenom} !</h2>
          <p className='text-sm md:text-base mt-2'>Prêt à t'entraîner sur Dyschool ?</p>
        </div>
      </div>
      <Image
        className='absolute right-4 top-4 md:right-8 md:top-8 w-[200px] lg:w-[250px] hidden md:block'
        src={Enfants}
        alt="Illustration d'enfants"
      />
    </div>
  )
}

export default Welcoming
