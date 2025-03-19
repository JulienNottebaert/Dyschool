'use client'

import { useState, useEffect } from 'react'
import { auth, db } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'
import { Skeleton } from '@heroui/react'

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
      <div className='grid grid-cols-1 md:grid-cols-8 lg:grid-cols-9 gap-4 md:gap-6 lg:gap-8 min-h-[calc(100vh-128px)] lg:h-[calc(100vh-128px)] lg:grid-rows-12 xl:grid-rows-10 max-h-[1080px]'>
        {/* Skeleton pour Profil */}
        <div className='col-span-1 md:col-span-8 lg:col-span-6 xl:row-span-3 h-full lg:row-span-3'>
          <div className='bg-white flex flex-col gap-4 p-4 md:p-6 lg:p-8 shadow-lg rounded-lg w-full h-full'>
            <Skeleton className='w-[100px] md:w-[120px] lg:w-[150px] h-[100px] md:h-[120px] lg:h-[150px] rounded-full mx-auto' />
            <Skeleton className='w-3/4 md:w-40 h-6 rounded-md mx-auto' />
            <Skeleton className='w-1/2 md:w-24 h-6 rounded-md mx-auto' />
            <div className='flex gap-2 flex-wrap justify-center w-full'>
              <Skeleton className='w-16 h-6 rounded-md' />
              <Skeleton className='w-16 h-6 rounded-md' />
              <Skeleton className='w-16 h-6 rounded-md' />
            </div>
            <Skeleton className='w-full h-6 rounded-md' />
          </div>
        </div>

        {/* Skeleton pour Progression */}
        <div className='col-span-1 md:col-span-4 lg:col-span-3 xl:row-span-5 h-full lg:row-span-6'>
          <div className='bg-white flex flex-col gap-4 p-4 md:p-6 lg:p-8 shadow-lg rounded-lg w-full h-full'>
            <Skeleton className='w-3/4 h-6 rounded-md mx-auto' />
            <div className='flex gap-2 w-full'>
              <Skeleton className='w-full h-8 rounded-md' />
              <Skeleton className='w-full h-8 rounded-md' />
            </div>
            <Skeleton className='w-full h-8 rounded-md' />
            <div className='flex flex-wrap gap-2 justify-center'>
              <Skeleton className='w-16 h-6 rounded-md' />
              <Skeleton className='w-16 h-6 rounded-md' />
              <Skeleton className='w-16 h-6 rounded-md' />
            </div>
          </div>
        </div>

        {/* Skeleton pour JeuxFavoris */}
        <div className='col-span-1 md:col-span-8 lg:col-span-6 xl:row-span-4 h-full lg:row-span-6'>
          <div className='bg-white flex flex-col gap-4 p-4 md:p-6 lg:p-8 shadow-lg rounded-lg w-full h-full'>
            <Skeleton className='w-3/4 h-6 rounded-md mx-auto' />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              <Skeleton className='w-full h-32 rounded-lg' />
              <Skeleton className='w-full h-32 rounded-lg' />
              <Skeleton className='w-full h-32 rounded-lg' />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Afficher le contenu une fois les données chargées
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-10 gap-6 min-h-[calc(100vh-128px)] content-start'>
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
