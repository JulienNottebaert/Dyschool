import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY) // Ta clé secrète Stripe

// Gestionnaire pour la requête POST
export async function POST (req) {
  try {
    // Extraire le `customerId` depuis le body de la requête
    const { customerId } = await req.json()

    if (!customerId) {
      return NextResponse.json(
        { error: 'Customer ID manquant' },
        { status: 400 }
      )
    }

    // Supprimer le client dans Stripe
    await stripe.customers.del(customerId)

    return NextResponse.json(
      { message: 'Client supprimé de Stripe avec succès' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erreur Stripe:', error.message)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du client Stripe' },
      { status: 500 }
    )
  }
}
