'use client'
import React from 'react'
import { Button, Divider } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons'

function Abonnements () {
  return (
    <div>
      <h1 className='text-center text-4xl'>Choisir son abonnement</h1>
      <p className='text-center mt-4 text-gray-400'>Choisissez la formule adaptée au besoin de votre enfant</p>

      <div className='mt-8'>
        <div className='flex items-center justify-center gap-12'>

          {/* Carte pour l'abonnement mensuel 0€ */}
          <div className='bg-white drop-shadow-lg rounded-xl relative w-[350px]'>
            <div className='px-8 pt-8'>
              <h3 className=' font-bold text-white bg-secondary w-fit px-2 py-1 rounded-md'>Gratuit</h3>
            </div>
            <div className='px-8 flex items-end'>
              <h1 className=''>0€</h1>
              <p className='mb-4 ml-1'>/mois</p>
            </div>
            <p className='px-8 my-4 text-sm'>Parfait pour découvrir Dyschool</p>
            <div className='px-8 mb-4'>
              <Button color='secondary' fullWidth>Sélectionner</Button>
            </div>
            <Divider className='w-full' />
            <h4 className='px-8 mt-4 font-bold uppercase'>Options</h4>
            <ul className='px-8 pt-4 pb-8 flex flex-col gap-3'>
              <li className='flex'><FontAwesomeIcon icon={faCircleCheck} className='text-green-600 mr-2' size='xl' /> 1 jeu par trouble</li>
              <li className='flex'><FontAwesomeIcon icon={faCircleCheck} className='text-green-600 mr-2' size='xl' /> Suivi de la progression</li>
              <li className='flex'><FontAwesomeIcon icon={faCircleCheck} className='text-green-600 mr-2' size='xl' /> Options modifiables en fonction du trouble</li>
              <li className='flex'><FontAwesomeIcon icon={faCircleXmark} className='text-red-600 mr-2' size='xl' /> Personnalisation du personnage</li>
              <li className='flex'><FontAwesomeIcon icon={faCircleXmark} className='text-red-600 mr-2' size='xl' /> Personnalisation de la tenue</li>
            </ul>
          </div>

          {/* Carte pour l'abonnement mensuel 9€ */}
          <div className='bg-white drop-shadow-lg rounded-xl w-[350px]'>
            <div className='px-8 pt-8'>
              <h3 className=' font-bold text-white bg-secondary w-fit px-2 py-1 rounded-md'>Premium</h3>
            </div>
            <div className='px-8 flex items-end'>
              <h1 className=''>9€</h1>
              <p className='mb-4 ml-1 '>/mois</p>
            </div>
            <p className='px-8 my-4 text-sm '>Pour une utilisation avancée</p>
            <div className='px-8 mb-4'>
              <Button color='secondary' fullWidth>Sélectionner</Button>
            </div>
            <Divider className='w-full' />
            <h4 className='px-8 mt-4 font-bold uppercase '>Options</h4>
            <ul className='px-8 pt-4 pb-8 flex flex-col gap-3'>
              <li className='flex'><FontAwesomeIcon icon={faCircleCheck} className='text-green-600 mr-2' size='xl' /> Accès à tous les jeux</li>
              <li className='flex'><FontAwesomeIcon icon={faCircleCheck} className='text-green-600 mr-2' size='xl' /> Suivi de la progression</li>
              <li className='flex'><FontAwesomeIcon icon={faCircleCheck} className='text-green-600 mr-2' size='xl' /> Options modifiables en fonction du trouble</li>
              <li className='flex'><FontAwesomeIcon icon={faCircleCheck} className='text-green-600 mr-2' size='xl' /> Personnalisation du personnage</li>
              <li className='flex'><FontAwesomeIcon icon={faCircleCheck} className='text-green-600 mr-2' size='xl' /> Personnalisation de la tenue</li>
            </ul>
          </div>

          {/* Carte pour l'abonnement annuel 90€ */}
          <div className='bg-secondary drop-shadow-lg rounded-xl w-[350px]'>
            <div>
              <div className='absolute -top-5 left-1/2 transform -translate-x-1/2 bg-primary text-white px-3 py-2 rounded-md'>
                Le plus populaire
              </div>
            </div>
            <div className='px-8 pt-8'>
              <h3 className=' font-bold text-white bg-secondary-400 w-fit px-2 py-1 rounded-md'>Max</h3>
            </div>
            <div className='px-8 flex items-end text-white'>
              <h1 className=''>90€</h1>
              <p className='mb-4 ml-1 text-white'>/an</p>
            </div>
            <p className='px-8 my-4 text-sm text-white'>Pour une utilisation avancée</p>
            <div className='px-8 mb-4'>
              <Button className='bg-secondary-400 text-white' fullWidth>Sélectionner</Button>
            </div>
            <Divider className='w-full bg-white' />
            <h4 className='px-8 mt-4 font-bold uppercase text-white'>Options</h4>
            <ul className='px-8 pt-4 pb-8 flex flex-col gap-3'>
              <li className='flex text-white'><FontAwesomeIcon icon={faCircleCheck} className='text-green-400 mr-2' size='xl' /> Accès à tous les jeux</li>
              <li className='flex text-white'><FontAwesomeIcon icon={faCircleCheck} className='text-green-400 mr-2' size='xl' /> Suivi de la progression</li>
              <li className='flex text-white'><FontAwesomeIcon icon={faCircleCheck} className='text-green-400 mr-2' size='xl' /> Options modifiables en fonction du trouble</li>
              <li className='flex text-white'><FontAwesomeIcon icon={faCircleCheck} className='text-green-400 mr-2' size='xl' /> Personnalisation du personnage</li>
              <li className='flex text-white'><FontAwesomeIcon icon={faCircleCheck} className='text-green-400 mr-2' size='xl' /> Personnalisation de la tenue</li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Abonnements
