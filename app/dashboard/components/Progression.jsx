import React from 'react'
import { Progress, Skeleton } from '@heroui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullseye } from '@fortawesome/free-solid-svg-icons'

function Progression ({ data }) {
  if (!data) {
    return (
      <div className='bg-white shadow-lg p-4 md:p-6 lg:p-8 rounded-md h-full'>
        <h3 className='text-secondary text-sm md:text-base'>
          Objectifs Mensuels <FontAwesomeIcon icon={faBullseye} className='ml-2' />
        </h3>
        <div className='flex flex-col gap-3 md:gap-4 mt-4 md:mt-6'>
          <Skeleton className='h-5 md:h-6 w-full rounded-md' />
          <Skeleton className='h-5 md:h-6 w-full rounded-md' />
          <Skeleton className='h-5 md:h-6 w-full rounded-md' />
          <Skeleton className='h-5 md:h-6 w-full rounded-md' />
        </div>
      </div>
    )
  }

  return (
    <div className='bg-white shadow-lg p-4 md:p-6 lg:p-8 rounded-md h-full'>
      <h3 className='text-secondary text-sm md:text-base'>
        Objectifs Mensuels <FontAwesomeIcon icon={faBullseye} className='ml-2' />
      </h3>

      <div className='flex flex-col gap-3 md:gap-4 mt-4 md:mt-6'>
        {/* Expériences */}
        <Progress
          color='success'
          label='Expériences'
          valueLabel={`${data.experiences} / 10000`}
          maxValue={10000}
          showValueLabel
          size='sm'
          value={data.experiences}
          classNames={{
            label: 'text-xs md:text-sm',
            value: 'text-xs md:text-sm'
          }}
        />

        {/* Hérissons de bronze */}
        <Progress
          classNames={{
            indicator: 'bg-gradient-radial from-[#cd7f32] to-[#8b5a2b]',
            label: 'text-xs md:text-sm',
            value: 'text-xs md:text-sm'
          }}
          valueLabel={`${data.bronze} / 100`}
          label='Hérissons de bronze'
          maxValue={100}
          showValueLabel
          size='sm'
          value={data.bronze}
        />

        {/* Hérissons d'argent */}
        <Progress
          classNames={{
            indicator: 'bg-gradient-to-r from-[#e0e0e0] via-[#c0c0c0] to-[#a8a8a8]',
            label: 'text-xs md:text-sm',
            value: 'text-xs md:text-sm'
          }}
          valueLabel={`${data.silver} / 30`}
          label="Hérissons d'argent"
          maxValue={30}
          showValueLabel
          size='sm'
          value={data.silver}
        />

        {/* Hérissons d'or */}
        <Progress
          classNames={{
            indicator: 'bg-gradient-to-r from-[#ffd700] to-[#ffcc00]',
            label: 'text-xs md:text-sm',
            value: 'text-xs md:text-sm'
          }}
          valueLabel={`${data.gold} / 10`}
          label="Hérissons d'or"
          maxValue={10}
          showValueLabel
          size='sm'
          value={data.gold}
        />
      </div>
    </div>
  )
}

export default Progression
