import React from 'react'
import { Progress, Skeleton } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullseye } from '@fortawesome/free-solid-svg-icons'

function Progression ({ data }) {
  if (!data) {
    return (
      <div className='bg-white shadow-lg p-6 col-span-3 row-span-4 rounded-md flex flex-col justify-between'>
        <h3 className='text-secondary'>
          Objectifs Mensuels <FontAwesomeIcon icon={faBullseye} className='ml-2' />
        </h3>
        <Skeleton className='h-6 w-full rounded-md' />
        <Skeleton className='h-6 w-full rounded-md' />
        <Skeleton className='h-6 w-full rounded-md' />
        <Skeleton className='h-6 w-full rounded-md' />
      </div>
    )
  }

  return (
    <div className='bg-white shadow-lg p-6 col-span-3 row-span-4 rounded-md flex flex-col justify-between'>
      <h3 className='text-secondary'>
        Objectifs Mensuels <FontAwesomeIcon icon={faBullseye} className='ml-2' />
      </h3>

      {/* Expériences */}
      <Progress
        color='success'
        label='Expériences'
        valueLabel={`${data.experiences} / 10000`}
        maxValue={10000}
        showValueLabel
        size='sm'
        value={data.experiences}
      />

      {/* Hérissons de bronze */}
      <Progress
        classNames={{
          indicator: 'bg-gradient-radial from-[#cd7f32] to-[#8b5a2b]'
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
          indicator: 'bg-gradient-to-r from-[#e0e0e0] via-[#c0c0c0] to-[#a8a8a8]'
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
          indicator: 'bg-gradient-to-r from-[#ffd700] to-[#ffcc00]'
        }}
        valueLabel={`${data.gold} / 10`}
        label="Hérissons d'or"
        maxValue={10}
        showValueLabel
        size='sm'
        value={data.gold}
      />
    </div>
  )
}

export default Progression
