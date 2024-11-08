import Image from 'next/image'
import React from 'react'
import User from '@/public/asset/navbar/user.png'
import {Chip} from "@nextui-org/chip";

function Profil() {
  return (
    <div className='flex gap-8'>
      <div className='bg-white flex flex-col gap-4 p-8 shadow-lg rounded-lg'>
        <Image className='mx-auto' src={User} width={100} height={100} />
        <h3 className='text-center'>Nom Prénom</h3>
        <div className='flex gap-2'>
          <Chip variant="flat" radius="md" color='secondary'>Dyslexie</Chip>
          <Chip variant="flat"radius="md" color='secondary'>Dysgraphie</Chip>
        </div>
        <button className='bg-primary text-white p-2 rounded-md'>Modifier</button>
      </div>

      <div className='bg-white shadow-lg rounded-lg px-8'>
        <h1>Le reste</h1>
      </div>
    </div>
  )
}

export default Profil