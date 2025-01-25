import React from 'react'
import { CircularProgress } from '@nextui-org/react'

function DailyTime ({ userData }) {
  return (
    <div className='bg-white shadow-lg p-8 rounded-md col-span-1 flex flex-col items-center'>
      <CircularProgress
        classNames={{
          svg: 'w-36 h-36',
          indicator: 'stroke-secondary',
          track: 'stroke-secondary/10',
          value: 'text-2xl font-semibold text-secondary'
        }}
        showValueLabel
        strokeWidth={4}
        value={userData.tempsJournalier}
      />
      <h3 className='text-base text-center'>Utilisation journalière</h3>
    </div>
  )
}

export default DailyTime
