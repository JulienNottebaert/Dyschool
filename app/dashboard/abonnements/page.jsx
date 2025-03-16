'use client'

import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { loadStripe } from '@stripe/stripe-js'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'

function Abonnements () {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  const [userId, setUserId] = useState(null)
  const [loadingSubscription, setLoadingSubscription] = useState(null)
  const router = useRouter()

  useEffect(() => {
    let isMounted = true // Pour éviter les mises à jour sur un composant démonté

    const fetchUser = () => {
      const user = auth.currentUser
      if (user && isMounted) {
        setUserId(user.uid)
      } else if (isMounted) {
        router.push('/connexion') // Redirige si l'utilisateur n'est pas connecté
      }
    }

    fetchUser()

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (isMounted) {
        if (user) {
          setUserId(user.uid)
        } else {
          setUserId(null)
          router.push('/connexion')
        }
      }
    })

    return () => {
      isMounted = false // Marque le composant comme démonté
      unsubscribe()
    }
  }, [router])

  const handleSubscription = async (subscriptionType) => {
    if (!userId) {
      console.error('Utilisateur non authentifié.')
      return
    }

    try {
      setLoadingSubscription(subscriptionType) // Set loading for the specific subscription
      const stripe = await stripePromise

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, subscriptionType })
      })

      const data = await response.json()

      if (data.sessionId) {
        console.log(`Redirection vers Stripe pour l'abonnement ${subscriptionType}`)
        await stripe.redirectToCheckout({ sessionId: data.sessionId })
      } else if (data.message) {
        console.error('Erreur lors de la souscription :', data.message)
      } else {
        throw new Error('Erreur inattendue lors de la souscription')
      }
    } catch (err) {
      console.error('Erreur lors de la souscription :', err.message)
    } finally {
      setLoadingSubscription(null) // Reset loading state
    }
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 p-4 md:p-8 min-h-[calc(100vh-80px)] content-center max-w-7xl mx-auto'>
      {/* Premium Subscription Card */}
      <div className='bg-white drop-shadow-lg rounded-lg w-full'>
        <div className='px-4 md:px-6 lg:px-8 pt-6 md:pt-8'>
          <h3 className='font-bold text-white bg-secondary w-fit px-2 py-1 rounded-md text-sm md:text-base'>Premium</h3>
        </div>
        <div className='px-4 md:px-6 lg:px-8 flex items-end mt-4'>
          <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold'>9€</h1>
          <p className='mb-1 ml-1 text-sm md:text-base'>/mois</p>
        </div>
        <p className='px-4 md:px-6 lg:px-8 my-4 text-xs md:text-sm text-gray-600'>Pour une utilisation avancée</p>
        <div className='px-4 md:px-6 lg:px-8 mb-4'>
          <button
            className='w-full bg-secondary text-white py-2 px-4 rounded-md text-xs md:text-sm font-medium hover:bg-secondary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            onClick={() => handleSubscription('Premium')}
            disabled={loadingSubscription === 'Premium'}
          >
            {loadingSubscription === 'Premium' ? 'Chargement...' : 'Sélectionner'}
          </button>
        </div>
        <hr className='w-full border-t border-secondary' />
        <h4 className='px-4 md:px-6 lg:px-8 mt-4 font-bold uppercase text-xs md:text-sm'>Options</h4>
        <ul className='px-4 md:px-6 lg:px-8 pt-4 pb-6 md:pb-8 flex flex-col gap-2 md:gap-3'>
          <li className='flex items-center text-xs md:text-sm'>
            <FontAwesomeIcon icon={faCircleCheck} className='text-green-600 mr-2 text-base md:text-xl' /> Accès à tous les jeux
          </li>
          <li className='flex items-center text-xs md:text-sm'>
            <FontAwesomeIcon icon={faCircleCheck} className='text-green-600 mr-2 text-base md:text-xl' /> Suivi de la progression
          </li>
          <li className='flex items-center text-xs md:text-sm'>
            <FontAwesomeIcon icon={faCircleCheck} className='text-green-600 mr-2 text-base md:text-xl' /> Options modifiables en fonction du trouble
          </li>
          <li className='flex items-center text-xs md:text-sm'>
            <FontAwesomeIcon icon={faCircleCheck} className='text-green-600 mr-2 text-base md:text-xl' /> Personnalisation du personnage
          </li>
          <li className='flex items-center text-xs md:text-sm'>
            <FontAwesomeIcon icon={faCircleCheck} className='text-green-600 mr-2 text-base md:text-xl' /> Personnalisation de la tenue
          </li>
        </ul>
      </div>

      {/* Max Subscription Card */}
      <div className='bg-secondary drop-shadow-lg rounded-lg w-full relative mt-8 md:mt-0'>
        <div className='absolute -top-3 md:-top-5 left-1/2 transform -translate-x-1/2 bg-primary text-white px-2 md:px-3 py-1 md:py-2 rounded-md drop-shadow-md uppercase font-bold text-xs md:text-sm'>
          2 mois offerts
        </div>
        <div className='px-4 md:px-6 lg:px-8 pt-6 md:pt-8'>
          <h3 className='font-bold text-white bg-secondary-400 w-fit px-2 py-1 rounded-md text-sm md:text-base'>Max</h3>
        </div>
        <div className='px-4 md:px-6 lg:px-8 flex items-end mt-4 text-white'>
          <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold'>90€</h1>
          <p className='mb-1 ml-1 text-sm md:text-base'>/an</p>
        </div>
        <p className='px-4 md:px-6 lg:px-8 my-4 text-xs md:text-sm text-white/90'>Pour une utilisation avancée</p>
        <div className='px-4 md:px-6 lg:px-8 mb-4'>
          <button
            className='w-full bg-secondary-400 text-white py-2 px-4 rounded-md text-xs md:text-sm font-medium hover:bg-secondary-400/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            onClick={() => handleSubscription('Max')}
            disabled={loadingSubscription === 'Max'}
          >
            {loadingSubscription === 'Max' ? 'Chargement...' : 'Sélectionner'}
          </button>
        </div>
        <hr className='w-full border-t border-gray-200' />
        <h4 className='px-4 md:px-6 lg:px-8 mt-4 font-bold uppercase text-white text-xs md:text-sm'>Options</h4>
        <ul className='px-4 md:px-6 lg:px-8 pt-4 pb-6 md:pb-8 flex flex-col gap-2 md:gap-3'>
          <li className='flex items-center text-white text-xs md:text-sm'>
            <FontAwesomeIcon icon={faCircleCheck} className='text-green-400 mr-2 text-base md:text-xl' /> Accès à tous les jeux
          </li>
          <li className='flex items-center text-white text-xs md:text-sm'>
            <FontAwesomeIcon icon={faCircleCheck} className='text-green-400 mr-2 text-base md:text-xl' /> Suivi de la progression
          </li>
          <li className='flex items-center text-white text-xs md:text-sm'>
            <FontAwesomeIcon icon={faCircleCheck} className='text-green-400 mr-2 text-base md:text-xl' /> Options modifiables en fonction du trouble
          </li>
          <li className='flex items-center text-white text-xs md:text-sm'>
            <FontAwesomeIcon icon={faCircleCheck} className='text-green-400 mr-2 text-base md:text-xl' /> Personnalisation du personnage
          </li>
          <li className='flex items-center text-white text-xs md:text-sm'>
            <FontAwesomeIcon icon={faCircleCheck} className='text-green-400 mr-2 text-base md:text-xl' /> Personnalisation de la tenue
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Abonnements
