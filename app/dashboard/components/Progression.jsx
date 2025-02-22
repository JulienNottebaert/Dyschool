import React from 'react'
import { Progress } from '@nextui-org/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullseye } from '@fortawesome/free-solid-svg-icons'

function Progression () {
  return (
    <div className='bg-white shadow-lg p-6 col-span-3 row-span-4 rounded-md flex flex-col justify-between'>
      <h3 className='text-secondary'>Objectis Mensuels           <FontAwesomeIcon icon={faBullseye} className='ml-2' />
      </h3>
      <Progress
        color='success'
        label='Expériences'
        valueLabel='10000'
        maxValue={10000}
        showValueLabel
        size='sm'
        value={4000}
      />

      <Progress
        classNames={{
          base: 'max-w-md',
          indicator: "bg-gradient-radial from-[#cd7f32] to-[#8b5a2b]",
        }}
        valueLabel='100'
        label='Hérissons de bronze'
        maxValue={100}
        showValueLabel
        size='sm'
        value={85}
      />

      <Progress
        classNames={{
          base: 'max-w-md',
          indicator: "bg-gradient-to-r from-[#e0e0e0] via-[#c0c0c0] to-[#a8a8a8]",
        }}
        valueLabel='30'
        label="Hérissons d'argent"
        maxValue={30}
        showValueLabel
        size='sm'
        value={18}
      />

      <Progress
        classNames={{
          base: 'max-w-md',
          indicator: "bg-gradient-to-r from-[#ffd700] to-[#ffcc00]",

        }}
        valueLabel='10'
        label="Hérissons d'or"
        maxValue={10}
        showValueLabel
        size='sm'
        value={4}
      />
    </div>
  )
}

export default Progression
