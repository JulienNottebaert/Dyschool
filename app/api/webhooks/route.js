// import Stripe from 'stripe'
import { NextResponse } from 'next/server'
// import { db } from '@/lib/firebase'
// import { doc, updateDoc } from 'firebase/firestore'

// const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

export async function POST (req) {
  console.log('Webhook Stripe reçu')
  return NextResponse.json(
    { received: true },
    { status: 200 }
  )
  // const sig = req.headers.get('stripe-signature') // Récupération de la signature Stripe
  // let event

  // try {
  //   console.log('Vérification de la signature Stripe...')
  //   const rawBody = await req.arrayBuffer()
  //   const bodyBuffer = Buffer.from(rawBody)

  //   event = stripe.webhooks.constructEvent(
  //     bodyBuffer,
  //     sig,
  //     process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET
  //   )
  //   console.log(`Événement Stripe reçu : ${event.type}`)
  // } catch (err) {
  //   console.error('Erreur de vérification du webhook Stripe:', err.message)
  //   return NextResponse.json(
  //     { error: `Webhook Error: ${err.message}` },
  //     { status: 400 }
  //   )
  // }

  // try {
  //   switch (event.type) {
  //     case 'checkout.session.completed': {
  //       console.log('checkout.session.completed reçu')
  //       const session = event.data.object

  //       const userId = session.metadata?.userId // Récupère l'ID utilisateur Firebase
  //       const subscriptionType = session.metadata?.subscriptionType // Récupère le type d'abonnement
  //       console.log('UserID extrait des métadonnées :', userId)
  //       console.log('Type d’abonnement :', subscriptionType)

  //       if (!userId) {
  //         console.error('UserID manquant dans les métadonnées')
  //         return NextResponse.json({ error: 'UserID manquant' }, { status: 400 })
  //       }

  //       console.log('Tentative de récupération de l’abonnement Stripe...')
  //       const subscription = await stripe.subscriptions.retrieve(session.subscription)
  //       console.log('Abonnement Stripe récupéré :', subscription)

  //       const userRef = doc(db, 'users', userId)
  //       await updateDoc(userRef, {
  //         abonnement: {
  //           stripeSubscriptionId: session.subscription,
  //           stripeCustomerId: session.customer,
  //           type: subscriptionType,
  //           startDate: new Date(subscription.start_date * 1000).toISOString(),
  //           endDate: new Date(subscription.current_period_end * 1000).toISOString(),
  //           status: subscription.status
  //         },
  //         updatedAt: new Date().toISOString()
  //       })
  //       console.log(`Mise à jour réussie dans Firestore pour userId : ${userId}`)
  //       break
  //     }

  //     case 'customer.subscription.updated': {
  //       console.log('customer.subscription.updated reçu')
  //       const subscription = event.data.object
  //       console.log('Données de la subscription :', subscription)

  //       const userId = subscription.metadata?.userId

  //       if (!userId) {
  //         console.error('UserID manquant dans les métadonnées')
  //         return NextResponse.json({ error: 'UserID manquant' }, { status: 400 })
  //       }

  //       const userRef = doc(db, 'users', userId)
  //       console.log('Tentative de mise à jour dans Firestore pour userId :', userId)
  //       await updateDoc(userRef, {
  //         'abonnement.status': subscription.status,
  //         'abonnement.startDate': new Date(subscription.start_date * 1000).toISOString(),
  //         'abonnement.endDate': new Date(subscription.current_period_end * 1000).toISOString(),
  //         updatedAt: new Date().toISOString()
  //       })
  //       console.log(`Abonnement mis à jour pour l'utilisateur ${userId}`)
  //       break
  //     }

  //     case 'customer.subscription.deleted': {
  //       console.log('customer.subscription.deleted reçu')
  //       const subscription = event.data.object
  //       console.log('Données de la subscription :', subscription)

  //       const userId = subscription.metadata?.userId

  //       if (!userId) {
  //         console.error('UserID manquant dans les métadonnées')
  //         return NextResponse.json({ error: 'UserID manquant' }, { status: 400 })
  //       }

  //       const userRef = doc(db, 'users', userId)
  //       console.log('Tentative de mise à jour dans Firestore pour userId :', userId)
  //       await updateDoc(userRef, {
  //         'abonnement.status': 'cancelled',
  //         'abonnement.cancelledAt': new Date().toISOString(),
  //         updatedAt: new Date().toISOString()
  //       })
  //       console.log(`Abonnement annulé pour l'utilisateur ${userId}`)
  //       break
  //     }

  //     default:
  //       console.log(`Événement non géré : ${event.type}`)
  //   }

  //   return NextResponse.json({ received: true }, { status: 200 })
  // } catch (err) {
  //   console.error('Erreur lors du traitement du Webhook Stripe :', err.message)
  //   return NextResponse.json({ error: 'Erreur interne' }, { status: 500 })
  // }
}
