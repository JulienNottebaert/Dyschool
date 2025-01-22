import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

export async function POST (req) {
  try {
    const body = await req.json() // Récupère les données envoyées depuis le client
    const { stripeCustomerId } = body

    if (!stripeCustomerId) {
      return NextResponse.json({ error: 'stripeCustomerId manquant' }, { status: 400 })
    }

    // Récupère la liste des abonnements du client Stripe
    const subscriptions = await stripe.subscriptions.list({
      customer: stripeCustomerId,
      status: 'all', // Inclut tous les statuts
      limit: 1 // Récupère uniquement le dernier abonnement
    })

    if (!subscriptions.data || subscriptions.data.length === 0) {
      return NextResponse.json({ error: 'Aucun abonnement trouvé pour ce client' }, { status: 404 })
    }

    const subscription = subscriptions.data[0]

    return NextResponse.json({
      type: subscription.items.data[0]?.price?.product || 'Aucun abonnement',
      status: subscription.status,
      startDate: new Date(subscription.start_date * 1000).toISOString(),
      endDate: new Date(subscription.current_period_end * 1000).toISOString()
    })
  } catch (error) {
    console.error('Erreur lors de la récupération de l’abonnement :', error.message)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
