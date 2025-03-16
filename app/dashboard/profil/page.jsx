'use client'

import { useState, useEffect } from 'react'
import { auth, db } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'
import { Skeleton } from '@nextui-org/react'

import TypeAbonnement from './components/TypeAbonnement'
import InformationsPrincipales from './components/InformationsPrincipales'
import FormulairePrincipal from './components/FormulairePrincipal'
import Notifications from './components/Notifications'
import Options from './components/Options'

export default function Profil () {
  const [userData, setUserData] = useState({
    email: '',
    nom: '',
    prenom: '',
    age: '',
    photoURL: '',
    typographie: 'poppins', // Valeur par défaut
    troubles: {
      dyscalculie: false,
      dysgraphie: false,
      dyslexie: false,
      dysorthographie: false,
      dysphasie: false,
      dyspraxie: false,
      dyséxécutif: false
    },
    abonnement: {
      endDate: '',
      startDate: '',
      status: '',
      stripeSubscriptionId: '',
      type: ''
    },
    stripeCustomerId: '',
    titres: [], // Liste des titres débloqués
    gold: 0,
    silver: 0,
    bronze: 0,
    experiences: 0,
    niveau: 0,
    controleParental: false,
    jeuxAdaptes: false,
    notifOffres: false,
    notifNewsletters: false,
    notifArticle: false
  })
  const [loading, setLoading] = useState(true) // Gestion globale du chargement
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid))
          if (userDoc.exists()) {
            const data = userDoc.data()
            setUserData({
              email: user.email || '',
              nom: data.nom || '',
              prenom: data.prenom || '',
              age: data.age || '',
              photoURL: data.photoURL || '',
              typographie: data.typographie || 'poppins',
              troubles: { ...data.troubles },
              abonnement: { ...data.abonnement },
              stripeCustomerId: data.stripeCustomerId || '',
              controleParental: data.controleParental ?? false,
              jeuxAdaptes: data.jeuxAdaptes ?? false,
              notifOffres: data.notifOffres ?? false,
              notifNewsletters: data.notifNewsletters ?? false,
              notifArticle: data.notifArticle ?? false
            })
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des données utilisateur :', error)
        } finally {
          setLoading(false) // Arrête le chargement une fois les données récupérées
        }
      } else {
        router.push('/connexion')
      }
    }

    fetchUserData()
  }, [router])

  // Afficher les Skeletons tant que les données sont en cours de chargement
  if (loading) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-6 lg:gap-8 min-h-[calc(100vh-80px)] content-start'>
        {/* Skeleton pour InformationsPrincipales */}
        <div className='bg-white flex flex-col gap-4 p-4 md:p-6 lg:p-8 shadow-lg rounded-lg w-full items-center col-span-1 md:col-span-2 h-full'>
          <Skeleton className='w-[120px] md:w-[150px] h-[120px] md:h-[150px] rounded-full' />
          <Skeleton className='w-32 md:w-40 h-6 rounded-md' />
          <Skeleton className='w-20 md:w-24 h-6 rounded-md' />
          <div className='flex gap-2 flex-wrap justify-center w-full'>
            <Skeleton className='w-14 md:w-16 h-6 rounded-md' />
            <Skeleton className='w-14 md:w-16 h-6 rounded-md' />
            <Skeleton className='w-14 md:w-16 h-6 rounded-md' />
          </div>
          <Skeleton className='w-full h-6 rounded-md' />
        </div>

        {/* Skeleton pour FormulairePrincipal */}
        <div className='bg-white flex flex-col gap-4 p-4 md:p-6 lg:p-8 shadow-lg rounded-lg col-span-1 md:col-span-2 lg:col-span-6 items-center h-full'>
          <div className='flex flex-col md:flex-row gap-4 w-full'>
            <Skeleton className='w-full h-12 rounded-md' />
            <Skeleton className='w-full h-12 rounded-md' />
            <Skeleton className='w-full h-12 rounded-md' />
          </div>
          <Skeleton className='w-full h-12 rounded-md' />
          <div className='flex flex-wrap gap-4 justify-center'>
            <Skeleton className='w-14 md:w-16 h-6 rounded-md' />
            <Skeleton className='w-14 md:w-16 h-6 rounded-md' />
            <Skeleton className='w-14 md:w-16 h-6 rounded-md' />
          </div>
          <Skeleton className='w-28 md:w-32 h-12 rounded-md mt-4 mx-auto' />
        </div>

        {/* Skeleton pour TypeAbonnement */}
        <div className='bg-white shadow-lg p-4 md:p-6 lg:p-8 rounded-lg col-span-1 md:col-span-2 lg:col-span-3 h-full'>
          <Skeleton className='h-12 w-full md:w-1/2 mx-auto' />
          <Skeleton className='h-8 w-full md:w-1/2 mx-auto mt-4' />
          <Skeleton className='h-8 w-full md:w-1/3 mx-auto mt-2' />
        </div>

        {/* Skeleton pour Notifications */}
        <div className='bg-white shadow-lg p-4 md:p-6 lg:p-8 rounded-lg col-span-1 md:col-span-2 h-full'>
          <Skeleton className='h-12 w-full md:w-1/2 mx-auto' />
          <Skeleton className='h-8 w-full md:w-1/2 mx-auto mt-4' />
          <Skeleton className='h-8 w-full md:w-1/3 mx-auto mt-2' />
        </div>

        {/* Skeleton pour Options */}
        <div className='bg-white shadow-lg p-4 md:p-6 lg:p-8 rounded-lg col-span-1 md:col-span-2 lg:col-span-3 h-full'>
          <Skeleton className='h-12 w-full md:w-1/2 mx-auto' />
          <Skeleton className='h-8 w-full md:w-1/2 mx-auto mt-4' />
          <Skeleton className='h-8 w-full md:w-1/3 mx-auto mt-2' />
        </div>
      </div>
    )
  }

  // Afficher le contenu une fois les données chargées
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-10 gap-4 md:gap-6 min-h-[calc(100vh-80px)] content-start'>
      <div className='col-span-1 md:col-span-2 lg:col-span-3 h-full'>
        <div className='h-full'>
          <InformationsPrincipales userData={userData} setUserData={setUserData} />
        </div>
      </div>
      <div className='col-span-1 md:col-span-2 lg:col-span-7 h-full'>
        <div className='h-full'>
          <FormulairePrincipal userData={userData} setUserData={setUserData} />
        </div>
      </div>
      <div className='col-span-1 md:col-span-2 lg:col-span-4 h-full'>
        <div className='h-full'>
          <TypeAbonnement userData={userData} />
        </div>
      </div>
      <div className='col-span-1 md:col-span-2 lg:col-span-3 h-full'>
        <div className='h-full'>
          <Options userData={userData} setUserData={setUserData} />
        </div>
      </div>
      <div className='col-span-1 md:col-span-2 lg:col-span-3 h-full'>
        <div className='h-full'>
          <Notifications userData={userData} setUserData={setUserData} />
        </div>
      </div>
    </div>
  )
}
