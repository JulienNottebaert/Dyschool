'use client'
import React, { useState } from 'react'
import { Button, Divider, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'

function Abonnements () {
  const [selectedPlan, setSelectedPlan] = useState('mensuel') // État pour gérer la sélection

  return (
    <div>
      <h1 className='text-center text-4xl mt-4'>Choisir son abonnement</h1>
      <p className='text-center mt-4 text-gray-400'>Choisissez la formule adaptée au besoin de votre enfant</p>

      {/* Boutons pour basculer entre mensuel et annuel */}
      <div className='flex justify-center mt-6'>
        <div className='flex gap-0'>
          <button
            onClick={() => setSelectedPlan('mensuel')}
            className={`px-6 py-2 border border-gray-300 rounded-l-full w-60 ${
              selectedPlan === 'mensuel' ? 'bg-primary text-white font-bold' : 'bg-white text-gray-600'
            }`}
          >
            Mensuel
          </button>
          <button
            onClick={() => setSelectedPlan('annuel')}
            className={`px-6 py-2 border border-gray-300 rounded-r-full w-60  ${
              selectedPlan === 'annuel' ? 'bg-primary text-white font-bold' : 'bg-white text-gray-600'
            }`}
          >
            Annuel
          </button>
        </div>
      </div>

      {/* Affichage des options en fonction de la sélection */}
      <div className='mt-12'>
        {selectedPlan === 'mensuel'
          ? (
            <div className='flex items-center justify-center gap-16'>
              {/* Carte pour l'abonnement mensuel 0€ */}
              <div className='bg-white drop-shadow-lg rounded-xl'>
                <h3 className='px-8 pt-8 font-bold text-secondary'>Gratuit</h3>
                <div className='px-8 flex items-end'>
                  <h1 className=''>0€</h1>
                  <p className='mb-4 ml-1'>Par mois</p>
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
              <div className='bg-white drop-shadow-lg rounded-xl'>
                <h3 className='px-8 pt-8 font-bold text-primary'>Premium</h3>
                <div className='px-8 flex items-end'>
                  <h1 className=''>9€</h1>
                  <p className='mb-4 ml-1'>Par mois</p>
                </div>
                <p className='px-8 my-4 text-sm'>Pour une utilisation avancée</p>
                <div className='px-8 mb-4'>
                  <Button color='primary' fullWidth>Découvrir</Button>
                </div>
                <Divider className='w-full' />
                <h4 className='px-8 mt-4 font-bold uppercase'>Options</h4>
                <ul className='px-8 pt-4 pb-8 flex flex-col gap-3'>
                  <li><FontAwesomeIcon icon={faCircleCheck} className='text-primary mr-2' size='xl' /> +40 jeux disponibles</li>
                  <li><FontAwesomeIcon icon={faCircleCheck} className='text-primary mr-2' size='xl' /> Nouvelles tenues exclusives</li>
                  <li><FontAwesomeIcon icon={faCircleCheck} className='text-primary mr-2' size='xl' /> Fonctionalités supplémentaires</li>
                </ul>
              </div>
            </div>
            )
          : (
            <div className='flex items-center justify-center'>
              {/* Carte pour l'abonnement mensuel 0€ */}
              <div className='bg-white drop-shadow-lg rounded-xl'>
                <h3 className='px-8 pt-8 font-bold text-secondary'>Premium</h3>
                <div className='px-8 flex items-end'>
                  <h1 className=''>90€</h1>
                  <p className='mb-4 ml-1'>Par an</p>
                </div>
                <p className='px-8 my-4 text-sm'>Pour une utilisation avancée</p>
                <div className='px-8 mb-4'>
                  <Button color='secondary' fullWidth>Découvrir</Button>
                </div>
                <Divider className='w-full' />
                <h4 className='px-8 mt-4 font-bold uppercase'>Options</h4>
                <ul className='px-8 pt-4 pb-8 flex flex-col gap-3'>
                  <li><FontAwesomeIcon icon={faCircleCheck} className='text-secondary mr-2' size='xl' /> +40 jeux disponibles</li>
                  <li><FontAwesomeIcon icon={faCircleCheck} className='text-secondary mr-2' size='xl' /> Nouvelles tenues exclusives</li>
                  <li><FontAwesomeIcon icon={faCircleCheck} className='text-secondary mr-2' size='xl' /> Fonctionalités supplémentaires</li>
                </ul>
              </div>
            </div>
            )}
      </div>

      <h1 className='mt-8 text-3xl'>Abonnement gratuit</h1>
      <Table aria-label='Example static collection table'>
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>ROLE</TableColumn>
          <TableColumn>STATUS</TableColumn>
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
