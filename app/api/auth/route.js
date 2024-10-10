import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { doc, setDoc } from 'firebase/firestore'

export async function POST (req) {
  const body = await req.json()
  const { type, email, password, nom, prenom, troubles } = body

  try {
    if (type === 'register') {
      // Inscription
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Ajouter des informations supplémentaires dans Firestore, y compris les troubles
      await setDoc(doc(db, 'users', user.uid), {
        nom,
        prenom,
        email,
        troubles: { // Regrouper les troubles sous une seule clé "troubles"
          dyscalculie: troubles.dyscalculie,
          dysgraphie: troubles.dysgraphie,
          dyslexie: troubles.dyslexie,
          dysorthographie: troubles.dysorthographie,
          dysphasie: troubles.dysphasie,
          troubleAttention: troubles.troubleAttention
        }
      })

      return new Response(JSON.stringify({ message: 'Inscription réussie', uid: user.uid }), {
        status: 200
      })
    } else if (type === 'login') {
      // Connexion
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      return new Response(JSON.stringify({ message: 'Connexion réussie', uid: user.uid }), {
        status: 200
      })
    } else {
      return new Response(JSON.stringify({ message: 'Type de requête non supporté' }), {
        status: 400
      })
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Erreur', error: error.message }), {
      status: 500
    })
  }
}
