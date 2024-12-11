'use client'
import React from 'react'
import { Button, Divider, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'

function Abonnements () {
  return (
    <div>
      <h1 className='text-center text-4xl mt-4'>Choisir son abonnement</h1>
      <p className='text-center mt-4 text-gray-400'>Choisissez la formule adaptée au besoin de votre enfant</p>

      <div className='mt-12'>
        <div className='flex items-center justify-center gap-12'>

          {/* Carte pour l'abonnement mensuel 0€ */}
          <div className='bg-white drop-shadow-lg rounded-xl relative'>
            <div className='px-8 pt-8'>
              <h3 className=' font-bold text-white bg-secondary w-fit px-2 py-1 rounded-md'>Gratuit</h3>
            </div>
            <div className='px-8 flex items-end'>
              <h1 className=''>0€</h1>
              <p className='mb-4 ml-1'>/mois</p>
            </div>
            <p className='px-8 my-4 text-sm'>Parfait pour découvrir Dyschool</p>
            <div className='px-8 mb-4'>
              <Button color='secondary' fullWidth>Découvrir</Button>
            </div>
            <Divider className='w-full' />
            <h4 className='px-8 mt-4 font-bold uppercase'>Options</h4>
            <ul className='px-8 pt-4 pb-8 flex flex-col gap-3'>
              <li><FontAwesomeIcon icon={faCircleCheck} className='text-secondary mr-2' size='xl' /> 1 jeu par trouble</li>
              <li><FontAwesomeIcon icon={faCircleCheck} className='text-secondary mr-2' size='xl' /> Personnalisation du personnage</li>
              <li><FontAwesomeIcon icon={faCircleCheck} className='text-secondary mr-2' size='xl' /> Suivi de la progression</li>
            </ul>
          </div>

          {/* Carte pour l'abonnement mensuel 9€ */}
          <div className='bg-white drop-shadow-lg rounded-xl '>
            <div className='px-8 pt-8'>
              <h3 className=' font-bold text-white bg-secondary w-fit px-2 py-1 rounded-md'>Premium</h3>
            </div>
            <div className='px-8 flex items-end'>
              <h1 className=''>9€</h1>
              <p className='mb-4 ml-1 '>/mois</p>
            </div>
            <p className='px-8 my-4 text-sm '>Pour une utilisation avancée</p>
            <div className='px-8 mb-4'>
              <Button color='secondary' fullWidth>Découvrir</Button>
            </div>
            <Divider className='w-full' />
            <h4 className='px-8 mt-4 font-bold uppercase '>Options</h4>
            <ul className='px-8 pt-4 pb-8 flex flex-col gap-3'>
              <li className=''><FontAwesomeIcon icon={faCircleCheck} className='mr-2 text-secondary' size='xl' /> +40 jeux disponibles</li>
              <li className=''><FontAwesomeIcon icon={faCircleCheck} className=' mr-2 text-secondary' size='xl' /> Nouvelles tenues exclusives</li>
              <li className=''><FontAwesomeIcon icon={faCircleCheck} className=' mr-2 text-secondary' size='xl' /> Fonctionalités supplémentaires</li>
            </ul>
          </div>

          {/* Carte pour l'abonnement annuel 90€ */}
          <div className='bg-secondary drop-shadow-lg rounded-xl'>
            <div>
              <div className='absolute -top-5 left-1/2 transform -translate-x-1/2 bg-primary text-white px-3 py-2 rounded-md'>
                Le plus populaire
              </div>
            </div>
            <div className='px-8 pt-8'>
              <h3 className=' font-bold text-white bg-secondary-400 w-fit px-2 py-1 rounded-md'>Premium</h3>
            </div>
            <div className='px-8 flex items-end text-white'>
              <h1 className=''>90€</h1>
              <p className='mb-4 ml-1 text-white'>/an</p>
            </div>
            <p className='px-8 my-4 text-sm text-white'>Pour une utilisation avancée</p>
            <div className='px-8 mb-4'>
              <Button className='bg-secondary-400 text-white' fullWidth>Découvrir</Button>
            </div>
            <Divider className='w-full bg-white' />
            <h4 className='px-8 mt-4 font-bold uppercase text-white'>Options</h4>
            <ul className='px-8 pt-4 pb-8 flex flex-col gap-3'>
              <li className='text-white'><FontAwesomeIcon icon={faCircleCheck} className='mr-2' size='xl' /> +40 jeux disponibles</li>
              <li className='text-white'><FontAwesomeIcon icon={faCircleCheck} className='mr-2' size='xl' /> Nouvelles tenues exclusives</li>
              <li className='text-white'><FontAwesomeIcon icon={faCircleCheck} className='mr-2' size='xl' /> Fonctionalités supplémentaires</li>
            </ul>
          </div>

        </div>
      </div>

      <Table aria-label='Example static collection table' className='mt-8'>
        <TableHeader>
          <TableColumn className='text-secondary'>Gratuit</TableColumn>
          <TableColumn className='text-primary'>Premium</TableColumn>
          <TableColumn>Premium 1an</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key='1'>
            <TableCell>Tony Reichert</TableCell>
            <TableCell>CEO</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
          <TableRow key='2'>
            <TableCell>Zoey Lang</TableCell>
            <TableCell>Technical Lead</TableCell>
            <TableCell>Paused</TableCell>
          </TableRow>
          <TableRow key='3'>
            <TableCell>Jane Fisher</TableCell>
            <TableCell>Senior Developer</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
          <TableRow key='4'>
            <TableCell>William Howard</TableCell>
            <TableCell>Community Manager</TableCell>
            <TableCell>Vacation</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default Abonnements
