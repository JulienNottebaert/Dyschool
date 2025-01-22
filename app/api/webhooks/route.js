import Stripe from 'stripe'
import { db } from '@/lib/firebase'
import { doc, updateDoc } from 'firebase/firestore'

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

export const dynamic = 'force-dynamic' // Force la désactivation du body parser

async function readRawBody (req) {
  const chunks = []
  for await (const chunk of req) {
    chunks.push(chunk)
  }
  return Buffer.concat(chunks)
}

export async function POST (req) {
  const sig = req.headers['stripe-signature']

  let event

  try {
    // Lecture et vérification de la signature Stripe
    const rawBody = await readRawBody(req)
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Erreur de vérification du Webhook:', err.message)
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  // Gestion des événements Stripe
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object

        const userId = session.metadata?.userId
        const subscriptionType = session.metadata?.subscriptionType

        console.log('Tentative de mise à jour de Firestore pour userId :', userId)

        try {
          const subscriptionId = session.subscription
          const subscription = await stripe.subscriptions.retrieve(subscriptionId)

          console.log('Récupération de l’abonnement Stripe réussie, mise à jour dans Firestore.')

          const userRef = doc(db, 'users', userId)
          await updateDoc(userRef, {
            abonnement: {
              stripeSubscriptionId: subscriptionId,
              stripeCustomerId: session.customer,
              type: subscriptionType,
              startDate: new Date(subscription.start_date * 1000).toISOString(),
              endDate: new Date(subscription.current_period_end * 1000).toISOString(),
              status: subscription.status
            },
            updatedAt: new Date().toISOString()
          })

          console.log('Mise à jour réussie dans Firestore pour userId :', userId)
        } catch (error) {
          console.error('Erreur lors de la mise à jour de Firestore :', error.message)
        }

        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object

        console.log('Événement reçu : customer.subscription.updated')
        console.log('Données de la subscription :', subscription)

        const userId = subscription.metadata?.userId

        if (!userId) {
          console.error('Erreur : userId manquant dans les métadonnées')
          return new Response('userId manquant dans les métadonnées', { status: 400 })
        }

        try {
          const userRef = doc(db, 'users', userId)
          await updateDoc(userRef, {
            'abonnement.status': subscription.status,
            'abonnement.startDate': new Date(subscription.start_date * 1000).toISOString(),
            'abonnement.endDate': new Date(subscription.current_period_end * 1000).toISOString(),
            updatedAt: new Date().toISOString()
          })

          console.log('Mise à jour réussie dans Firestore pour userId :', userId)
        } catch (error) {
          console.error('Erreur lors de la mise à jour de Firestore :', error.message)
        }

        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object

        console.log('Événement reçu : customer.subscription.deleted')
        console.log('Données de la subscription :', subscription)

        const userId = subscription.metadata?.userId

        if (!userId) {
          console.error('Erreur : userId manquant dans les métadonnées')
          return new Response('userId manquant dans les métadonnées', { status: 400 })
        }

        try {
          const userRef = doc(db, 'users', userId)
          await updateDoc(userRef, {
            'abonnement.status': 'cancelled',
            'abonnement.cancelledAt': new Date().toISOString(),
            updatedAt: new Date().toISOString()
          })

          console.log('Mise à jour réussie dans Firestore pour userId :', userId)
        } catch (error) {
          console.error('Erreur lors de la mise à jour de Firestore :', error.message)
        }

        break
      }

      default:
        console.log(`Événement non géré : ${event.type}`)
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 })
  } catch (err) {
    console.error('Erreur lors du traitement du Webhook :', err.message)
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }
}
