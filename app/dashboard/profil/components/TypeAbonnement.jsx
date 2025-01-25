import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import Link from 'next/link'

function TypeAbonnement ({ userData }) {
  // Fonction pour formater la date en une chaîne lisible
  const formatDate = (isoDate) => {
    if (!isoDate) return 'Date non disponible' // Gestion des cas où `endDate` est absent
    const date = new Date(isoDate)
    const options = { day: 'numeric', month: 'long' } // Ex : 28 janvier
    return date.toLocaleDateString('fr-FR', options)
  }

  const { type, endDate } = userData.abonnement // Déstructuration pour plus de clarté

  return (
    <div className='bg-white shadow-lg p-8 rounded-md text-center col-span-4 items-center justify-center'>
      <h1 className='text-xl font-semibold text-secondary'>Mon abonnement <FontAwesomeIcon icon={faWallet} className='ml-2 text-lg' /></h1>
      <p className='text-sm text-gray-500 mt-2'>
        Gérer votre type d'abonnement et résilier à tout moment
      </p>

      {/* Affichage conditionnel selon le type d'abonnement */}
      {type === 'Gratuit'
        ? (
          <>
            <h3 className='text-primary font-medium my-6 flex items-center justify-center text-lg'>
              Membre {type}
            </h3>
            <p className='text-gray-500 mt-2 text-sm'>
              Pas d'abonnement en cours <br />
              <Link
                className='text-secondary font-semibold cursor-pointer underline hover:no-underline' href='/dashboard/abonnements'
              >
                s'abonner
              </Link>
            </p>
          </>
          )
        : (
          <p className='text-gray-600 mt-2 text-sm'>
            {type === 'Max' || type === 'Premium'
              ? (
                <>
                  <h3 className='text-primary font-medium my-6 flex items-center justify-center text-lg'>
                    <FontAwesomeIcon icon={faStar} className='mr-2 text-sm' />
                    Membre {type}
                    <FontAwesomeIcon icon={faStar} className='ml-2 text-sm' />
                  </h3>
                  <p className='text-gray-500 text-sm'>
                    Votre abonnement est valide jusqu'au{' '}
                    <span className='font-medium'>{formatDate(endDate)}</span>{' '} <br /><br />
                    <span className='text-secondary font-semibold cursor-pointer underline hover:no-underline'>
                      Changer d'offre
                    </span>
                  </p>
                </>
                )
              : (
                <>
                  Votre abonnement prendra fin le{' '}
                  <span className='font-medium'>{formatDate(endDate)}</span>.
                </>
                )}
          </p>
          )}
    </div>
  )
}

export default TypeAbonnement
