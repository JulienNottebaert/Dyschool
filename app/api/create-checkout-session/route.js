import Stripe from 'stripe'
import { db } from '@/lib/firebase' // Import Firestore
import { doc, getDoc, updateDoc } from 'firebase/firestore'

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

export async function POST (req) {
  try {
    const { userId, subscriptionType } = await req.json() // Récupère les données du frontend

    // Étape 1 : Vérification du type d'abonnement
    const validSubscriptionTypes = ['Gratuit', 'Premium', 'Max']
    if (!validSubscriptionTypes.includes(subscriptionType)) {
      throw new Error(`Type d'abonnement invalide : ${subscriptionType}`)
    }

    // Étape 2 : Récupérer l'utilisateur depuis Firestore
    const userDoc = await getDoc(doc(db, 'users', userId))

    if (!userDoc.exists()) {
      throw new Error('Utilisateur introuvable dans Firestore')
    }

    const userData = userDoc.data()
    let stripeCustomerId = userData.stripeCustomerId

    // Étape 3 : Vérifier ou créer un client Stripe
    if (!stripeCustomerId) {
      console.log(`Création d’un nouveau client Stripe pour userId : ${userId}`)
      const customer = await stripe.customers.create({
        email: userData.email,
        name: `${userData.prenom} ${userData.nom}`,
        metadata: {
          firebaseUID: userId // Associe l'utilisateur Firebase
        }
      })

      stripeCustomerId = customer.id

      // Mettre à jour Firestore avec le nouvel ID client Stripe
      await updateDoc(doc(db, 'users', userId), { stripeCustomerId })

      console.log(`Nouveau client Stripe créé : ${stripeCustomerId} pour userId : ${userId}`)
    } else {
      console.log(`Client Stripe existant trouvé : ${stripeCustomerId} pour userId : ${userId}`)
    }

    // Étape 4 : Gestion des abonnements gratuits
    if (subscriptionType === 'Gratuit') {
      console.log(`Abonnement gratuit activé pour userId : ${userId}`)

      // Mettre à jour Firestore pour l'abonnement gratuit
      await updateDoc(doc(db, 'users', userId), {
        abonnement: {
          type: 'Gratuit',
          startDate: new Date().toISOString(),
          endDate: null,
          status: 'active'
        },
        updatedAt: new Date().toISOString()
      })

      return new Response(
        JSON.stringify({
          message: 'Abonnement gratuit activé',
          status: 'success'
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    // Étape 5 : Map des produits Stripe par abonnement
    const productMapping = {
      Premium: 'prod_RNvth06705LJbW', // ID produit Stripe pour Premium
      Max: 'prod_RNvtX3tXwlTQdO' // ID produit Stripe pour Max
    }

    const productId = productMapping[subscriptionType]
    const prices = await stripe.prices.list({ product: productId })
    const priceId = prices.data[0]?.id // Prend le premier prix trouvé

    if (!priceId) {
      throw new Error(`Aucun prix trouvé pour le produit : ${productId}`)
    }

    // Étape 6 : Crée une session Stripe
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId, // Utilise le client Stripe existant
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId, // Utilise l'ID de prix associé au produit
          quantity: 1
        }
      ],
      mode: 'subscription',
      metadata: {
        userId, // Ajoute des informations supplémentaires pour le webhook
        subscriptionType // Ajoute le type d'abonnement
      },
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/dashboard/abonnements`, // Redirection après succès
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/dashboard/abonnements` // Redirection après annulation
    })

    console.log(`Session Stripe créée avec succès : ${session.id} pour userId : ${userId}`)

    return new Response(JSON.stringify({ sessionId: session.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    console.error('Erreur lors de la création de la session Stripe :', err.message)
    return new Response(
      JSON.stringify({ error: err.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}
