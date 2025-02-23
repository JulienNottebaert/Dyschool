'use client'
import { Button, Divider } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { useRouter } from 'next/navigation'

export default function Abonnement () {
  const router = useRouter()
  return (
    <div>
      <h2 className='text-primary px-6 text-center mt-6'>Choisir son abonnement</h2>
      <div className='flex flex-wrap items-center justify-center gap-16 mt-8 px-5'>

        {/* Premium Subscription Card */}
        <div className='bg-white drop-shadow-lg rounded-lg max-w-[350px]'>
          <div className='px-8 pt-8'>
            <h3 className='font-bold text-white bg-gray-500 w-fit px-2 py-1 rounded-md'>Gratuit</h3>
          </div>
          <div className='px-8 flex items-end'>
            <h1 className=''>0€</h1>
            <p className='mb-4 ml-1'>/mois</p>
          </div>
          <p className='px-8 my-4 text-sm '>Pour découvrir Dyschool</p>
          <Divider className='w-full bg-gray-500' />
          <h4 className='px-8 mt-4 font-bold uppercase '>Options</h4>
          <ul className='px-8 pt-4 pb-8 flex flex-col gap-3'>
            <li className='flex'>
              <FontAwesomeIcon icon={faCircleCheck} className='text-green-600 mr-2' size='xl' /> Accès à 1 jeu par troubles
            </li>
            <li className='flex'>
              <FontAwesomeIcon icon={faCircleXmark} className='text-red-600 mr-2' size='xl' /> Suivi de la progression
            </li>
            <li className='flex'>
              <FontAwesomeIcon icon={faCircleXmark} className='text-red-600 mr-2' size='xl' /> Options modifiables en fonction du trouble
            </li>
            <li className='flex'>
              <FontAwesomeIcon icon={faCircleXmark} className='text-red-600 mr-2' size='xl' /> Personnalisation du personnage
            </li>
            <li className='flex'>
              <FontAwesomeIcon icon={faCircleXmark} className='text-red-600 mr-2' size='xl' /> Personnalisation de la tenue
            </li>
          </ul>
        </div>

        {/* Premium Subscription Card */}
        <div className='bg-white drop-shadow-lg rounded-lg max-w-[350px]'>
          <div className='px-8 pt-8'>
            <h3 className='font-bold text-white bg-secondary w-fit px-2 py-1 rounded-md'>Premium</h3>
          </div>
          <div className='px-8 flex items-end'>
            <h1 className=''>9€</h1>
            <p className='mb-4 ml-1'>/mois</p>
          </div>
          <p className='px-8 my-4 text-sm '>Pour une utilisation avancée</p>
          <Divider className='w-full bg-secondary' />
          <h4 className='px-8 mt-4 font-bold uppercase '>Options</h4>
          <ul className='px-8 pt-4 pb-8 flex flex-col gap-3'>
            <li className='flex'>
              <FontAwesomeIcon icon={faCircleCheck} className='text-green-600 mr-2' size='xl' /> Accès à tous les jeux
            </li>
            <li className='flex'>
              <FontAwesomeIcon icon={faCircleCheck} className='text-green-600 mr-2' size='xl' /> Suivi de la progression
            </li>
            <li className='flex'>
              <FontAwesomeIcon icon={faCircleCheck} className='text-green-600 mr-2' size='xl' /> Options modifiables en fonction du trouble
            </li>
            <li className='flex'>
              <FontAwesomeIcon icon={faCircleCheck} className='text-green-600 mr-2' size='xl' /> Personnalisation du personnage
            </li>
            <li className='flex'>
              <FontAwesomeIcon icon={faCircleCheck} className='text-green-600 mr-2' size='xl' /> Personnalisation de la tenue
            </li>
          </ul>
        </div>

        {/* Max Subscription Card */}
        <div className='bg-secondary drop-shadow-lg rounded-lg max-w-[350px]'>
          <div>
            <div className='absolute -top-5 left-1/2 transform -translate-x-1/2 bg-primary text-white px-3 py-2 rounded-md drop-shadow-md uppercase font-bold'>
              2 mois offerts
            </div>
          </div>
          <div className='px-8 pt-8'>
            <h3 className='font-bold text-white bg-secondary-400 w-fit px-2 py-1 rounded-md'>Max</h3>
          </div>
          <div className='px-8 flex items-end text-white'>
            <h1 className=''>90€</h1>
            <p className='mb-4 ml-1 text-white'>/an</p>
          </div>
          <p className='px-8 my-4 text-sm text-white'>Pour une utilisation avancée</p>
          <Divider className='w-full bg-gray-200' />
          <h4 className='px-8 mt-4 font-bold uppercase text-white'>Options</h4>
          <ul className='px-8 pt-4 pb-8 flex flex-col gap-3'>
            <li className='flex text-white'>
              <FontAwesomeIcon icon={faCircleCheck} className='text-green-400 mr-2' size='xl' /> Accès à tous les jeux
            </li>
            <li className='flex text-white'>
              <FontAwesomeIcon icon={faCircleCheck} className='text-green-400 mr-2' size='xl' /> Suivi de la progression
            </li>
            <li className='flex text-white'>
              <FontAwesomeIcon icon={faCircleCheck} className='text-green-400 mr-2' size='xl' /> Options modifiables en fonction du trouble
            </li>
            <li className='flex text-white'>
              <FontAwesomeIcon icon={faCircleCheck} className='text-green-400 mr-2' size='xl' /> Personnalisation du personnage
            </li>
            <li className='flex text-white'>
              <FontAwesomeIcon icon={faCircleCheck} className='text-green-400 mr-2' size='xl' /> Personnalisation de la tenue
            </li>
          </ul>
        </div>
      </div>
      <Button
        onPress={() => router.push('/inscription')}
        className='block mx-auto mt-10' color='primary' variant='shadow' size='lg'
      >S'inscrire
      </Button>
    </div>
  )
}
