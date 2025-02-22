import React from 'react'
import { CircularProgress } from '@nextui-org/react'

function CompletionMensuelle () {
  return (
    <div className='bg-white shadow-lg p-8 col-span-3 row-span-2 rounded-md flex justify-between px-10'>
      <div className='flex flex-col gap-4 items-center justify-center w-full'>
        <CircularProgress
          classNames={{
            svg: 'w-20 h-20 drop-shadow-md',
            indicator: 'stroke-success',
            track: 'stroke-success/10',
            value: 'text-md font-semibold text-success'
          }}
          showValueLabel
          strokeWidth={4}
          value={25}
        />
        <p className='text-center text-sm'>Complétion mensuelle</p>
      </div>
    </div>
  )
}

export default CompletionMensuelle
