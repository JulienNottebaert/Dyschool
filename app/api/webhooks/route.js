import Stripe from 'stripe'
import { db } from '@/lib/firebase' // Import Firestore
import { doc, updateDoc } from 'firebase/firestore'

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

export const config = {
  api: {
    bodyParser: false // Désactiver le body parser pour gérer les requêtes brutes
  }
}

// Fonction pour lire le corps brut de la requête
async function readRawBody (req) {
  const chunks = []
  for await (const chunk of req) {
    chunks.push(chunk)
  }
  return Buffer.concat(chunks)
}

export default async function handler (req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed')
  }

  const sig = req.headers['stripe-signature']

  let event

  try {
    // Lecture et vérification de la signature Stripe
    const rawBody = await readRawBody(req) // Remplace `buffer` par `readRawBody`
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Erreur de vérification du Webhook:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  // Gestion des événements Stripe
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object

        const userId = session.metadata?.userId // Récupère l'ID utilisateur Firebase
        const subscriptionType = session.metadata?.subscriptionType // Récupère le type d'abonnement

        console.log('Tentative de mise à jour de Firestore pour userId :', userId)

        try {
          const subscriptionId = session.subscription // Récupère l'ID de l'abonnement Stripe
          const subscription = await stripe.subscriptions.retrieve(subscriptionId) // Récupère les détails de l'abonnement Stripe

          console.log('Récupération de l’abonnement Stripe réussie, mise à jour dans Firestore.')

          // Mettre à jour les données d'abonnement dans Firestore
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
            updatedAt: new Date().toISOString() // Met à jour le timestamp
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

        // Assurez-vous que les métadonnées contiennent userId
        const userId = subscription.metadata?.userId

        if (!userId) {
          console.error('Erreur : userId manquant dans les métadonnées')
          return res.status(400).send('userId manquant dans les métadonnées')
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
          return res.status(400).send('userId manquant dans les métadonnées')
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

    res.status(200).json({ received: true })
  } catch (err) {
    console.error('Erreur lors du traitement du Webhook :', err.message)
    res.status(400).send(`Webhook Error: ${err.message}`)
  }
}
