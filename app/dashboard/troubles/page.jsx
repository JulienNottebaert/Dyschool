// pages/dashboard.jsx
'use client'

import { useState, useEffect } from 'react'
import { Checkbox } from '@nextui-org/react'
import { auth, db } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

export default function Troubles() {
  
  const [troubles, setTroubles] = useState({
    dyscalculie: false,
    dysgraphie: false,
    dyslexie: false,
    dysorthographie: false,
    dysphasie: false,
    dyspraxie: false,
    dyséxécutif: false,
  })

  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Définir un tableau avec les clés de troubles dans l'ordre souhaité
  const troubleKeys = [
    'dyscalculie',
    'dysgraphie',
    'dyslexie',
    'dysorthographie',
    'dysphasie',
    'dyspraxie',
    'dyséxécutif'
  ]

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté et récupérer ses troubles depuis Firestore
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid))
          if (userDoc.exists()) {
            const userData = userDoc.data()
            setTroubles(userData.troubles || {}) // Charger les troubles existants
          }
          setLoading(false)
        } catch (error) {
          console.error("Erreur lors de la récupération des troubles :", error)
        }
      } else {
        router.push('/connexion') // Rediriger vers la page de connexion si non connecté
      }
    })

    return () => unsubscribe() // Cleanup de l'écouteur lors du démontage du composant
  }, [router])

  const handleTroubleChange = (trouble) => {
    setTroubles((prev) => ({
      ...prev,
      [trouble]: !prev[trouble]
    }))
  }

  const handleSave = async () => {
    const user = auth.currentUser
    if (user) {
      try {
        await updateDoc(doc(db, 'users', user.uid), { troubles })
        alert('Troubles mis à jour avec succès')
      } catch (error) {
        console.error('Erreur lors de la mise à jour des troubles:', error)
      }
    }
  }

  if (loading) {
    return <p>Chargement...</p>
  }

  return (
    <div className='my-12 flex flex-col items-center text-center'>
      <h2 className='font-bold text-primary text-2xl mb-4'>Quels sont les troubles de l'enfant ?</h2>
      <div className='flex flex-wrap gap-4 justify-center mb-4'>
        {/* Cases à cocher pour les troubles */}
        <div className='flex flex-wrap gap-4 justify-center'>
          {troubleKeys.map((trouble) => (
            <div key={trouble} className='flex items-center mb-2'>
              <Checkbox
                isSelected={troubles[trouble]}
                onChange={() => handleTroubleChange(trouble)}
                className='mr-2'
              />
              <label
                className={`capitalize ${troubles[trouble] ? 'text-primary font-bold' : 'text-gray-500'}`}
              >
                {trouble}
              </label>
            </div>
          ))}
        </div>
      </div>
      {/* Bouton pour sauvegarder les troubles */}
      <button
        onClick={handleSave}
        className='bg-secondary hover:bg-secondary-600 text-white font-bold py-2 px-4 rounded-lg'
      >
        Sauvegarder
      </button>
    </div>
  )
}