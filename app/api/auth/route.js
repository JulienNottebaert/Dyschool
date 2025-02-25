import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { doc, setDoc, collection } from 'firebase/firestore'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

export async function POST (req) {
  const body = await req.json()
  const {
    type,
    email,
    password,
    nom,
    prenom,
    troubles,
    titres,
    experiences,
    niveau,
    controleParental,
    jeuxAdaptes,
    notifOffres,
    notifNewsletters,
    notifArticle,
    typographie
  } = body

  try {
    if (type === 'register') {
      console.log('Début du processus d’inscription...')

      // Étape 1 : Création de l'utilisateur Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      console.log('Utilisateur Firebase créé :', user.uid)

      // Étape 2 : Création d'un client Stripe
      console.log('Création du client Stripe...')
      const stripeCustomer = await stripe.customers.create({
        email,
        name: `${prenom} ${nom}`,
        metadata: {
          firebaseUID: user.uid
        }
      })
      console.log('Client Stripe créé avec succès :', stripeCustomer.id)

      // Étape 3 : Ajouter un abonnement gratuit via Stripe
      const freePlanProductId = 'prod_RNvsNfEbHJIryG' // Remplacez par l'ID produit Stripe du plan gratuit
      const freePlanPrices = await stripe.prices.list({ product: freePlanProductId })
      const freePlanPriceId = freePlanPrices.data[0]?.id

      if (!freePlanPriceId) {
        throw new Error('Aucun prix trouvé pour le plan gratuit')
      }

      console.log('Création de l’abonnement gratuit dans Stripe...')
      const freeSubscription = await stripe.subscriptions.create({
        customer: stripeCustomer.id,
        items: [{ price: freePlanPriceId }],
        metadata: {
          firebaseUID: user.uid,
          subscriptionType: 'Gratuit'
        }
      })
      console.log('Abonnement gratuit créé avec succès :', freeSubscription.id)

      // Étape 4 : Normalisation des valeurs des troubles
      const normalizedTroubles = {
        dyscalculie: troubles?.dyscalculie ?? false,
        dysgraphie: troubles?.dysgraphie ?? false,
        dyslexie: troubles?.dyslexie ?? false,
        dysorthographie: troubles?.dysorthographie ?? false,
        dysphasie: troubles?.dysphasie ?? false,
        dyspraxie: troubles?.dyspraxie ?? false,
        dyséxécutif: troubles?.dyséxécutif ?? false
      }

      // Étape 5 : Ajouter l'utilisateur dans Firestore avec l'abonnement gratuit
      console.log('Ajout des informations utilisateur dans Firestore...')
      await setDoc(doc(db, 'users', user.uid), {
        nom,
        prenom,
        email,
        stripeCustomerId: stripeCustomer.id,
        troubles: normalizedTroubles,
        abonnement: {
          stripeSubscriptionId: freeSubscription.id,
          type: 'Gratuit',
          startDate: new Date(freeSubscription.start_date * 1000).toISOString(),
          endDate: new Date(freeSubscription.current_period_end * 1000).toISOString(),
          status: freeSubscription.status
        },
        titres: titres || [],
        experiences: experiences || 0,
        niveau: niveau || 0,
        controleParental: controleParental ?? false,
        jeuxAdaptes: jeuxAdaptes ?? false,
        notifOffres: notifOffres ?? false,
        notifNewsletters: notifNewsletters ?? false,
        notifArticle: notifArticle ?? false,
        typographie: typographie || 'poppins',
        createdAt: new Date().toISOString()
      })
      console.log('Informations utilisateur ajoutées dans Firestore avec succès.')

      // Étape 6 : Créer la sous-collection `medals` et y ajouter `counts`
      console.log('Ajout des médailles dans Firestore...')
      const medalsRef = doc(collection(db, `users/${user.uid}/medals`), 'counts')
      await setDoc(medalsRef, {
        bronze: 0,
        silver: 0,
        gold: 0
      })
      console.log('Médailles ajoutées avec succès !')

      // Retourner une réponse réussie
      return new Response(
        JSON.stringify({
          message: 'Inscription réussie',
          uid: user.uid,
          stripeCustomerId: stripeCustomer.id
        }),
        { status: 200 }
      )
    } else if (type === 'login') {
      // Connexion utilisateur
      console.log('Début du processus de connexion...')
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      console.log('Connexion réussie pour l’utilisateur :', user.uid)

      return new Response(
        JSON.stringify({
          message: 'Connexion réussie',
          uid: user.uid
        }),
        { status: 200 }
      )
    } else {
      console.log('Type de requête non supporté.')
      return new Response(
        JSON.stringify({
          message: 'Type de requête non supporté'
        }),
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Erreur dans le processus :', error.message)
    return new Response(
      JSON.stringify({
        message: 'Erreur',
        error: error.message
      }),
      { status: 500 }
    )
  }
}
