import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { Button, Switch } from '@nextui-org/react'
function Notifications () {
  return (
    <div className='bg-white shadow-lg p-8 rounded-md col-span-3 flex flex-col items-center'>
      <h3 className='text-xl font-semibold text-secondary text-center'>Notification <FontAwesomeIcon icon={faBell} className='ml-2 text-lg' />
      </h3>
      <div className='flex flex-col w-full mt-6 gap-4'>
        <div className='flex justify-between'>
          <p className='text-sm'>Offres publicitaires</p>
          <Switch defaultSelected size='sm' isDisabled />
        </div>
        <div className='flex justify-between'>
          <p className='text-sm'>Notifications Push</p>
          <Switch defaultSelected size='sm' isDisabled />
        </div>
        <div className='flex justify-between'>
          <p className='text-sm'>Envoie de mail</p>
          <Switch defaultSelected size='sm' isDisabled />
        </div>
      </div>
      <Button size='sm' className='mt-6' color='secondary'>
        Modifier
      </Button>
    </div>
  )
}

export default Notifications
