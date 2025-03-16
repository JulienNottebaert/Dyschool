'use client'

import React, { useState, useEffect } from 'react'
import { Button, Divider } from '@heroui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { loadStripe } from '@stripe/stripe-js'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'

function Abonnements () {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  const [userId, setUserId] = useState(null)
  const [loadingSubscription, setLoadingSubscription] = useState(null) // Track subscription type being loaded
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
        console.log(`Redirection vers Stripe pour l’abonnement ${subscriptionType}`)
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
    <div className='flex items-center justify-center gap-20 mt-12'>
      {/* Premium Subscription Card */}
      <div className='bg-white drop-shadow-lg rounded-lg w-[350px]'>
        <div className='px-8 pt-8'>
          <h3 className='font-bold text-white bg-secondary w-fit px-2 py-1 rounded-md'>Premium</h3>
        </div>
        <div className='px-8 flex items-end'>
          <h1 className=''>9€</h1>
          <p className='mb-4 ml-1'>/mois</p>
        </div>
        <p className='px-8 my-4 text-sm '>Pour une utilisation avancée</p>
        <div className='px-8 mb-4'>
          <Button
            color='secondary'
            fullWidth
            onClick={() => handleSubscription('Premium')}
            disabled={loadingSubscription === 'Premium'} // Disable only for this card
          >
            {loadingSubscription === 'Premium' ? 'Chargement...' : 'Sélectionner'}
          </Button>
        </div>
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
      <div className='bg-secondary drop-shadow-lg rounded-lg w-[350px]'>
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
        <div className='px-8 mb-4'>
          <Button
            className='bg-secondary-400 text-white'
            fullWidth
            onClick={() => handleSubscription('Max')}
            disabled={loadingSubscription === 'Max'} // Disable only for this card
          >
            {loadingSubscription === 'Max' ? 'Chargement...' : 'Sélectionner'}
          </Button>
        </div>
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
  )
}

export default Abonnements
