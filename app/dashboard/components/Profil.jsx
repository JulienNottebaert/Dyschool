import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faWallet } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Image from 'next/image'
import { Chip } from '@nextui-org/chip'

function Profil ({ data }) {
  const troublesActifs = Object.entries(data.troubles)
    .filter(([_, value]) => value) // On garde seulement les troubles qui sont `true`
    .map(([key]) => key)

  return (
    <div className='bg-white shadow-lg col-span-3 row-span-4 rounded-md flex flex-col'>
      <div className='bg-secondary flex justify-between text-white w-full rounded-md py-4 px-6'>
        <h3>Mon profil</h3>
        <Link href='/dashboard/profil' className='flex items-center justify-center'>
          <FontAwesomeIcon icon={faEdit} className='text-md ml-4 bg-white bg-opacity-25 p-2 rounded-lg' />
        </Link>
      </div>
      <div className='flex p-6 gap-6'>
        <div className='relative size-32'>
          <Image
            src={
              data.photoURL ||
              'https://firebasestorage.googleapis.com/v0/b/dyschool-4ca88.firebasestorage.app/o/profil.png?alt=media&token=ee71c4c6-b87f-4e2d-88ee-efb2fec1f4b3'
            }
            alt='Photo profil utilisateur'
            fill
            className='border-4 border-secondary rounded-[50%]'
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className='flex flex-col justify-evenly py-3'>
          <h3>{data.nom} {data.prenom}</h3>
          <h4 className='text-gray-500'>{data.email}</h4>
        </div>
      </div>
      <div className='px-6 pb-6'>
        <h4 className='mb-2'>Troubles :</h4>

        {troublesActifs.length > 0
          ? (
            <div className='text-gray-50 flex flex-wrap gap-1'>
              {troublesActifs.map((trouble, index) => (
                <Chip key={index} variant='flat' color='primary' size='sm'>{trouble}</Chip>
              ))}
            </div>
            )
          : (
            <p className='text-gray-500'>Aucun trouble renseigné</p>
            )}

      </div>
      <div className='px-6 pb-6'>
        <h4 className='mb-2'>Mon abonnement :</h4>
        <p className='text-md'><FontAwesomeIcon icon={faWallet} className='text-primary mr-2' /> {data.abonnement.type}</p>
      </div>
    </div>
  )
}

export default Profil
