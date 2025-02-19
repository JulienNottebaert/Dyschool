import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import Enfants from '@/public/asset/dashboard/enfants.svg'

function Welcoming ({ data }) {
  const today = new Date()
  const formattedDate = new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }).format(today)

  return (
    <div className='bg-white shadow-lg p-8 col-span-9 row-span-3 rounded-md flex justify-between px-10'>
      <div className='flex flex-col justify-between'>
        <p className='bg-secondary text-white py-2 px-4 w-fit rounded-lg'>
          <FontAwesomeIcon icon={faCalendar} className='text-md mr-2' />
          {formattedDate}
        </p>
        <div>
          <h2 className='text-primary'>Salut {data.nom} !</h2>
          <p>Prêt à t'entraîner sur Dyschool ?</p>
        </div>
      </div>
      <Image src={Enfants} width={400} alt="Illustration d'enfants" />
    </div>
  )
}

export default Welcoming
