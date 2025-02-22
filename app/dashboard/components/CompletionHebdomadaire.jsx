import React from 'react'
import { CircularProgress } from '@nextui-org/react'

function CompletionHedbomadaire () {
  return (
    <div className='bg-white shadow-lg p-8 col-span-3 row-span-2 rounded-md flex justify-between px-10'>
      <div className='flex flex-col gap-4 items-center justify-center w-full'>
        <CircularProgress
          classNames={{
            svg: 'w-20 h-20 drop-shadow-md',
            indicator: 'stroke-primary',
            track: 'stroke-primary/10',
            value: 'text-md font-semibold text-primary'
          }}
          showValueLabel
          strokeWidth={4}
          value={55}
        />
        <p className='text-center text-sm'>Complétion hebdomadaire</p>
      </div>
    </div>
  )
}

export default CompletionHedbomadaire
