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
      <div className='flex px-6 pt-6 pb-2 gap-3'>
        <div className='flex flex-col items-center'>
          <div className='relative size-16'>
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
          <h4 className='text-primary mt-2 font-bold text-lg'>Niveau 62</h4>
        </div>
        <div className='flex flex-col'>
          <h3 className='text-lg truncate max-w-[150px] w-full overflow-hidden'>{data.nom} <br /> {data.prenom}</h3>
        </div>
      </div>
      <div className='px-6 pb-6'>

        {troublesActifs.length > 0
          ? (
            <div className='text-gray-50 flex flex-wrap gap-1'>
              {troublesActifs.map((trouble, index) => (
                <Chip key={index} variant='flat' color='primary' size='sm'>{trouble}</Chip>
              ))}
            </div>
            )
          : (
            <p className='text-gray-500 text-sm'>Aucun trouble renseigné</p>
            )}

      </div>
      <div className='px-6 pb-6'>
        <h4 className='mb-2 text-md'><FontAwesomeIcon icon={faWallet} className='text-primary mr-2' /> Mon abonnement :  <span className='text-primary'>{data.abonnement.type}</span> </h4>
      </div>
    </div>
  )
}

export default Profil
