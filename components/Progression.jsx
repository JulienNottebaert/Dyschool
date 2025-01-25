import React from 'react'
import { Progress } from '@nextui-org/react'

function Progression ({ userData }) {
  return (
    <div className='bg-white shadow-lg p-8 rounded-md col-span-2 flex flex-col items-center'>
      <Progress aria-label='Loading...' size='md' value={40} />
      <h3 className='text-base text-center'>Utilisation journalière</h3>
    </div>
  )
}

export default Progression
