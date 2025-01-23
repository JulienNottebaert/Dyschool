import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase' // Firebase Firestore
import { doc, updateDoc } from 'firebase/firestore'

// Initialisation de Stripe avec la version de l'API
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15'
})

// Désactiver l'analyse automatique du corps de la requête
export const config = {
  api: {
    bodyParser: false
  }
}

// Middleware pour lire le corps brut de la requête
async function readRawBody (req) {
  const chunks = []
  for await (const chunk of req.body) {
    chunks.push(chunk)
  }
  return Buffer.concat(chunks)
}

// Fonction POST pour gérer les webhooks Stripe
export async function POST (req) {
  const sig = req.headers.get('stripe-signature') // Récupérer la signature Stripe
  let event

  try {
    console.log('Vérification de la signature Stripe...')
    const rawBody = await readRawBody(req) // Lire le raw body en tant que Buffer

    // Construire l'événement Stripe
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET
    )
    console.log(`Événement Stripe reçu : ${event.type}`)
  } catch (err) {
    console.error('Erreur de vérification du webhook Stripe :', err.message)
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    )
  }

  try {
    // Traiter les événements Stripe
    switch (event.type) {
      case 'checkout.session.completed': {
        console.log('checkout.session.completed reçu')
        const session = event.data.object

        const userId = session.metadata?.userId // ID utilisateur Firebase
        const subscriptionType = session.metadata?.subscriptionType // Type d'abonnement
        console.log('UserID extrait des métadonnées :', userId)
        console.log('Type d’abonnement :', subscriptionType)

        if (!userId) {
          console.error('UserID manquant dans les métadonnées')
          return NextResponse.json({ error: 'UserID manquant' }, { status: 400 })
        }

        // Récupérer les détails de l'abonnement
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription
        )

        // Mettre à jour Firestore avec les informations de l'abonnement
        const userRef = doc(db, 'users', userId)
        await updateDoc(userRef, {
          abonnement: {
            stripeSubscriptionId: session.subscription,
            stripeCustomerId: session.customer,
            type: subscriptionType,
            startDate: new Date(subscription.start_date * 1000).toISOString(),
            endDate: new Date(subscription.current_period_end * 1000).toISOString(),
            status: subscription.status
          },
          updatedAt: new Date().toISOString()
        })
        console.log(`Mise à jour réussie dans Firestore pour userId : ${userId}`)
        break
      }

      case 'customer.subscription.updated': {
        console.log('customer.subscription.updated reçu')
        const subscription = event.data.object

        const userId = subscription.metadata?.userId
        if (!userId) {
          console.error('UserID manquant dans les métadonnées')
          return NextResponse.json({ error: 'UserID manquant' }, { status: 400 })
        }

        // Mettre à jour l'utilisateur dans Firestore
        const userRef = doc(db, 'users', userId)
        await updateDoc(userRef, {
          'abonnement.status': subscription.status,
          'abonnement.endDate': new Date(subscription.current_period_end * 1000).toISOString(),
          updatedAt: new Date().toISOString()
        })
        console.log(`Abonnement mis à jour pour userId : ${userId}`)
        break
      }

      case 'customer.subscription.deleted': {
        console.log('customer.subscription.deleted reçu')
        const subscription = event.data.object

        const userId = subscription.metadata?.userId
        if (!userId) {
          console.error('UserID manquant dans les métadonnées')
          return NextResponse.json({ error: 'UserID manquant' }, { status: 400 })
        }

        // Mettre à jour Firestore pour annuler l'abonnement
        const userRef = doc(db, 'users', userId)
        await updateDoc(userRef, {
          'abonnement.status': 'cancelled',
          'abonnement.cancelledAt': new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
        console.log(`Abonnement annulé pour userId : ${userId}`)
        break
      }

      default:
        console.log(`Événement non géré : ${event.type}`)
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (err) {
    console.error('Erreur lors du traitement du Webhook Stripe :', err.message)
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 })
  }
}
