import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
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
    <div className='bg-white shadow-lg p-8 rounded-md max-w-md mx-auto text-center col-span-1'>
      <h1 className='text-2xl font-semibold'>Mon abonnement</h1>
      <p className='text-sm text-gray-500 mt-2'>
        Gérer votre type d'abonnement et résilier à tout moment
      </p>

      <h3 className='text-primary font-medium mt-4 flex items-center justify-center'>
        <FontAwesomeIcon icon={faStar} className='mr-2 text-sm' />
        Membre {type}
      </h3>

      {/* Affichage conditionnel selon le type d'abonnement */}
      {type === 'Gratuit'
        ? (
          <p className='text-gray-600 mt-2 text-sm'>
            Pas d'abonnement en cours <br />
            <Link
              className='text-secondary font-semibold cursor-pointer underline hover:no-underline' href='/dashboard/abonnements'
            >
              s'abonner
            </Link>
          </p>
          )
        : (
          <p className='text-gray-600 mt-2 text-sm'>
            {type === 'Max' || type === 'Premium'
              ? (
                <>
                  Votre abonnement est valide jusqu'au{' '} <br />
                  <span className='font-medium'>{formatDate(endDate)}</span>,{' '}
                  <span className='text-secondary font-semibold cursor-pointer underline hover:no-underline'>
                    résilier
                  </span>
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
