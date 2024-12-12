import { buffer } from 'micro'
import Stripe from 'stripe'
import { db } from '@/lib/firebase' // Importez votre instance Firebase ou base de données.

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const config = {
  api: {
    bodyParser: false // Nécessaire pour traiter les requêtes Stripe
  }
}

export default async function handler (req, res) {
  const buf = await buffer(req)
  const sig = req.headers['stripe-signature']

  try {
    // Validation de la signature Stripe
    const event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET // Ajoutez ce secret dans .env.local
    )

    // Traitement des différents événements
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object

        // Exemple : récupération du metadata envoyé avec la session
        const userId = session.metadata.userId

        console.log(`Session terminée avec succès pour l'utilisateur : ${userId}`)

        // Exemple : Mettez à jour votre base pour activer l'abonnement
        await db.collection('users').doc(userId).update({
          abonnement: {
            type: 'premium', // Ou autre logique selon votre besoin
            startDate: new Date(),
            endDate: new Date(session.current_period_end * 1000),
            status: 'active'
          }
        })
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object

        console.log(`Paiement réussi pour la facture : ${invoice.id}`)

        // Exemple : Prolonger la durée de l'abonnement de l'utilisateur
        const customerId = invoice.customer
        const subscriptionId = invoice.subscription
        const nextBillingDate = new Date(invoice.period_end * 1000)

        await db
          .collection('users')
          .where('stripeCustomerId', '==', customerId) // Identifier l'utilisateur
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach(async (doc) => {
              const userId = doc.id
              await db.collection('users').doc(userId).update({
                abonnement: {
                  status: 'active',
                  nextBillingDate
                }
              })
            })
          })
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object

        console.log(`Échec du paiement pour la facture : ${invoice.id}`)

        // Exemple : Notifier l'utilisateur ou marquer son abonnement comme en pause
        const customerId = invoice.customer

        await db
          .collection('users')
          .where('stripeCustomerId', '==', customerId) // Identifier l'utilisateur
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach(async (doc) => {
              const userId = doc.id
              await db.collection('users').doc(userId).update({
                abonnement: {
                  status: 'payment_failed'
                }
              })
            })
          })
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object

        console.log(`Abonnement supprimé : ${subscription.id}`)

        // Exemple : Marquer l'abonnement comme inactif
        const customerId = subscription.customer

        await db
          .collection('users')
          .where('stripeCustomerId', '==', customerId) // Identifier l'utilisateur
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach(async (doc) => {
              const userId = doc.id
              await db.collection('users').doc(userId).update({
                abonnement: {
                  status: 'inactive'
                }
              })
            })
          })
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object

        console.log(`Abonnement mis à jour : ${subscription.id}`)

        // Exemple : Mettre à jour les informations d'abonnement
        const customerId = subscription.customer

        await db
          .collection('users')
          .where('stripeCustomerId', '==', customerId) // Identifier l'utilisateur
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach(async (doc) => {
              const userId = doc.id
              await db.collection('users').doc(userId).update({
                abonnement: {
                  status: subscription.status,
                  currentPeriodEnd: new Date(subscription.current_period_end * 1000)
                }
              })
            })
          })
        break
      }

      default:
        console.log(`Événement non géré : ${event.type}`)
    }

    res.status(200).send('Webhook reçu avec succès')
  } catch (err) {
    console.error(`Erreur lors du traitement du webhook : ${err.message}`)
    res.status(400).send(`Erreur Webhook : ${err.message}`)
  }
}
