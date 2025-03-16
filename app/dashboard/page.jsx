'use client'

import { useState, useEffect } from 'react'
import { auth, db } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'
import { Skeleton } from '@heroui/react'

import Welcoming from './components/Welcoming'
import Profil from './components/Profil'
import CompletionJournaliere from './components/CompletionJournaliere'
import CompletionHebdomadaire from './components/CompletionHebdomadaire'
import CompletionMensuelle from './components/CompletionMensuelle'
import Progression from './components/Progression'
import JeuxFavoris from './components/JeuxFavoris'

export default function Dashboard () {
  const [userData, setUserData] = useState({
    email: '',
    nom: '',
    prenom: '',
    age: '',
    photoURL: '',
    typographie: 'poppins',
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
    titres: [],
    gold: 0,
    silver: 0,
    bronze: 0,
    experiences: 0,
    niveau: 0,
    controleParental: false,
    jeuxAdaptes: false,
    notifOffres: false,
    notifNewsletters: false,
    notifArticle: false,
    tempsJournalier: 0
  })

  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser
      if (!user) {
        router.push('/connexion')
        return
      }

      try {
        const userRef = doc(db, 'users', user.uid)
        const userSnap = await getDoc(userRef)

        const medalsRef = doc(db, `users/${user.uid}/medals/counts`)
        const medalsSnap = await getDoc(medalsRef)

        if (userSnap.exists()) {
          const data = userSnap.data()

          setUserData((prevState) => ({
            ...prevState,
            email: user.email || '',
            nom: data.nom || '',
            prenom: data.prenom || '',
            age: data.age || '',
            photoURL: data.photoURL || '',
            typographie: data.typographie || 'poppins',
            troubles: { ...data.troubles },
            abonnement: { ...data.abonnement },
            stripeCustomerId: data.stripeCustomerId || '',
            titres: data.titres || [],
            experiences: data.experiences || 0,
            niveau: data.niveau || 0,
            controleParental: data.controleParental ?? false,
            jeuxAdaptes: data.jeuxAdaptes ?? false,
            notifOffres: data.notifOffres ?? false,
            notifNewsletters: data.notifNewsletters ?? false,
            notifArticle: data.notifArticle ?? false,
            tempsJournalier: data.tempsJournalier || 0
          }))
        }

        if (medalsSnap.exists()) {
          const medalsData = medalsSnap.data()
          setUserData((prevState) => ({
            ...prevState,
            gold: medalsData.gold || 0,
            silver: medalsData.silver || 0,
            bronze: medalsData.bronze || 0
          }))
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur :', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [router])

  if (loading) {
    return (
      <div className='grid grid-cols-8 gap-8'>
        {/* Skeleton pour Welcoming */}
        <div className='bg-white flex flex-col gap-4 p-8 shadow-lg rounded-lg w-full items-center col-span-2'>
          <Skeleton className='w-[150px] h-[150px] rounded-full' />
          <Skeleton className='w-40 h-6 rounded-md' />
          <Skeleton className='w-24 h-6 rounded-md' />
          <div className='flex gap-2 flex-wrap justify-center w-full'>
            <Skeleton className='w-16 h-6 rounded-md' />
            <Skeleton className='w-16 h-6 rounded-md' />
            <Skeleton className='w-16 h-6 rounded-md' />
          </div>
          <Skeleton className='w-full h-6 rounded-md' />
        </div>

        {/* Skeleton pour Progression */}
        <div className='bg-white flex flex-col gap-4 p-8 shadow-lg rounded-lg col-span-6 items-center'>
          <div className='flex gap-4 w-full'>
            <Skeleton className='w-full h-12 rounded-md' />
            <Skeleton className='w-full h-12 rounded-md' />
            <Skeleton className='w-full h-12 rounded-md' />
          </div>
          <Skeleton className='w-full h-12 rounded-md' />
          <div className='flex flex-wrap gap-4 justify-center'>
            <Skeleton className='w-16 h-6 rounded-md' />
            <Skeleton className='w-16 h-6 rounded-md' />
            <Skeleton className='w-16 h-6 rounded-md' />
          </div>
          <Skeleton className='w-32 h-12 rounded-md mt-4 mx-auto' />
        </div>

        {/* Skeleton pour JeuxFavoris */}
        <div className='bg-white shadow-lg p-8 rounded-lg h-64 col-span-3'>
          <Skeleton className='h-12 w-1/2 mx-auto' />
          <Skeleton className='h-8 w-1/2 mx-auto mt-4' />
          <Skeleton className='h-8 w-1/3 mx-auto mt-2' />
        </div>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-4 md:gap-6 min-h-[calc(100vh-80px)] content-start'>
      {/* Première ligne */}
      <div className='col-span-1 md:col-span-5 lg:col-span-8 h-full'>
        <div className='h-full'>
          <Welcoming data={userData} />
        </div>
      </div>
      <div className='col-span-1 md:col-span-3 lg:col-span-4 h-full'>
        <div className='h-full'>
          <Profil data={userData} />
        </div>
      </div>

      {/* Deuxième ligne */}
      <div className='col-span-1 md:col-span-2 lg:col-span-3 h-full'>
        <div className='h-full'>
          <CompletionJournaliere data={userData} />
        </div>
      </div>
      <div className='col-span-1 md:col-span-3 lg:col-span-3 h-full'>
        <div className='h-full'>
          <CompletionHebdomadaire data={userData} />
        </div>
      </div>
      <div className='col-span-1 md:col-span-3 lg:col-span-3 h-full'>
        <div className='h-full'>
          <CompletionMensuelle data={userData} />
        </div>
      </div>
      <div className='col-span-1 md:col-span-3 lg:col-span-3 h-full'>
        <div className='h-full'>
          <Progression data={userData} />
        </div>
      </div>

      {/* Troisième ligne */}
      <div className='col-span-1 md:col-span-5 lg:col-span-8 h-full'>
        <div className='h-full'>
          <JeuxFavoris data={userData} />
        </div>
      </div>
    </div>
  )
}
