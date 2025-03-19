'use client'

import React from 'react'
import { CircularProgress, Skeleton } from '@heroui/react'

export default function CompletionMensuelle ({ data }) {
  return (
    <div className='bg-white shadow-lg p-4 md:p-6 lg:p-8 rounded-md h-full relative'>
      <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10'>
        <span className='text-white font-medium'>Bientôt disponible</span>
      </div>
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
