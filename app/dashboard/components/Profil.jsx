import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Image from 'next/image'
import { Chip, Progress } from '@nextui-org/react'

function Profil ({ data }) {
  const lvlUp = data.niveau + 1
  return (
    <div className='bg-white shadow-lg col-span-3 row-span-4 rounded-md flex flex-col'>
      <div className='bg-secondary flex justify-between text-white w-full rounded-md py-4 px-6'>
        <h3>Mon profil</h3>
        <Link href='/dashboard/profil' className='flex items-center justify-center'>
          <FontAwesomeIcon icon={faEdit} className='text-md ml-4 bg-white bg-opacity-25 p-2 rounded-lg' />
        </Link>
      </div>
      <div className='flex px-6 pt-6 pb-2 gap-3'>
        <div className='flex flex-col items-center'>
          <div className='relative size-20'>
            <Image
              src={
              data.photoURL ||
              'https://firebasestorage.googleapis.com/v0/b/dyschool-4ca88.firebasestorage.app/o/profil.png?alt=media&token=ee71c4c6-b87f-4e2d-88ee-efb2fec1f4b3'
            }
              alt='Photo profil utilisateur'
              fill
              className='border-3 border-secondary rounded-[50%]'
              style={{ objectFit: 'cover' }}
            />
          </div>
          <h4 className='text-primary mt-2 font-bold text-lg'>Niveau {data.niveau}</h4>
        </div>
        <div className='flex flex-col mt-4'>
          <h3 className='text-lg truncate max-w-[150px] w-full overflow-hidden'>{data.nom} <br /> {data.prenom}</h3>
        </div>
      </div>
      <Progress
        className='max-w-md px-6'
        color='primary'
        valueLabel={lvlUp}
        label='Prochain niveau'
        maxValue={30}
        showValueLabel
        size='sm'
        value={26}
      />
      <p className='px-6 text-xs pt-2'>Expériences manquantes : 230</p>
      <div className='px-6 flex flex-wrap gap-2 pt-2'>
        <Chip variant='flat' color='primary' size='sm'>Roi du Simon</Chip>
        <Chip variant='flat' color='primary' size='sm'>Fou du Puissance 4</Chip>
      </div>
    </div>
  )
}

export default Profil
