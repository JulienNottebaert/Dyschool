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
        className='max-w-md'
        color='primary'
        label='Experience'
        valueLabel='10000'
        maxValue={10000}
        showValueLabel
        size='sm'
        value={4000}
      />

      <Progress
        className='max-w-md'
        color='success'
        valueLabel='100'
        label='Hérissons de bronze'
        maxValue={100}
        showValueLabel
        size='sm'
        value={34}
      />

      <Progress
        className='max-w-md'
        color='danger'
        valueLabel='30'
        label="Hérissons d'argent"
        maxValue={30}
        showValueLabel
        size='sm'
        value={9}
      />

      <Progress
        className='max-w-md'
        color='secondary'
        valueLabel='10'
        label="Hérissons d'or"
        maxValue={10}
        showValueLabel
        size='sm'
        value={2}
      />
    </div>
  )
}

export default Progression
