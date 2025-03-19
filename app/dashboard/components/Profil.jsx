import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faUser } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Image from 'next/image'
import { Chip, Progress } from '@heroui/react'

function Profil ({ data }) {
  const lvlUp = data.niveau + 1
  return (
    <div className='bg-white shadow-lg rounded-md flex flex-col h-full'>
      <div className='bg-secondary flex justify-between text-white w-full rounded-t-md py-3 md:py-4 px-4 md:px-6'>
        <h3 className='text-sm md:text-base font-bold'>profil <FontAwesomeIcon icon={faUser} className='ml-2' /></h3>
        <Link href='/dashboard/profil' className='flex items-center justify-center'>
          <FontAwesomeIcon icon={faEdit} className='text-sm md:text-md bg-white bg-opacity-25 p-2 rounded-lg' />
        </Link>
      </div>
      <div className='flex px-4 md:px-6 pt-4 md:pt-6 pb-2 gap-2 md:gap-3'>
        <div className='flex flex-col items-center'>
          <div className='relative size-16 md:size-20'>
            <Image
              src={data.photoURL || '/asset/utilisateur.png'}
              alt='Photo profil utilisateur'
              fill
              className='border-3 border-secondary rounded-[50%]'
              style={{ objectFit: 'cover' }}
            />
          </div>
          <h4 className='text-primary mt-2 font-bold text-base md:text-lg'>Niveau {data.niveau}</h4>
        </div>
        <div className='flex flex-col mt-2 md:mt-4'>
          <h3 className='text-base md:text-lg truncate max-w-[120px] md:max-w-[150px] w-full overflow-hidden'>
            {data.nom} <br /> {data.prenom}
          </h3>
        </div>
      </div>
      <Progress
        className='max-w-md px-4 md:px-6'
        color='primary'
        valueLabel={lvlUp}
        label='Prochain niveau'
        maxValue={30}
        showValueLabel
        size='sm'
        value={26}
        isDisabled={true}
      />
      <p className='px-4 md:px-6 text-xs pt-2'>Expériences manquantes : 230</p>
      <div className='px-4 md:px-6 flex flex-wrap gap-2 pt-2 pb-4 md:pb-6'>
        <Chip variant='flat' color='primary' size='sm' isDisabled>Roi du Simon</Chip>
        <Chip variant='flat' color='primary' size='sm' isDisabled>Fou du Puissance 4</Chip>
      </div>
    </div>
  )
}
export default Profil

