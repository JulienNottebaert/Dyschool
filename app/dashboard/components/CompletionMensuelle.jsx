import React from 'react'
import { CircularProgress } from '@heroui/react'

function CompletionMensuelle () {
  return (
    <div className='bg-white shadow-lg p-4 md:p-6 lg:p-8 rounded-md h-full'>
      <div className='flex flex-col gap-3 md:gap-4 items-center justify-center h-full'>
        <CircularProgress
          classNames={{
            svg: 'w-16 h-16 md:w-20 md:h-20 drop-shadow-md',
            indicator: 'stroke-danger',
            track: 'stroke-danger/10',
            value: 'text-sm md:text-md font-semibold text-danger'
          }}
          showValueLabel
          strokeWidth={4}
          value={25}
        />
        <p className='text-center text-xs md:text-sm'>Complétion mensuelle</p>
      </div>
    </div>
  )
}

export default CompletionMensuelle
