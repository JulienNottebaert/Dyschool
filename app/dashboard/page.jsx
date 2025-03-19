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
      <div className='grid grid-cols-1 md:grid-cols-8 lg:grid-cols-9 gap-4 md:gap-6 lg:gap-8 min-h-[calc(100vh-128px)] lg:h-[calc(100vh-128px)] lg:grid-rows-12 xl:grid-rows-10 max-h-[1080px]'>
        {/* Skeleton pour Welcoming */}
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

        {/* Skeleton pour Profil */}
        <div className='col-span-1 md:col-span-4 lg:col-span-3 xl:row-span-5 h-full lg:row-span-6'>
          <div className='bg-white flex flex-col gap-4 p-4 md:p-6 lg:p-8 shadow-lg rounded-lg w-full h-full'>
            <Skeleton className='w-[80px] md:w-[100px] h-[80px] md:h-[100px] rounded-full mx-auto' />
            <Skeleton className='w-3/4 h-6 rounded-md mx-auto' />
            <Skeleton className='w-1/2 h-6 rounded-md mx-auto' />
            <div className='flex flex-wrap gap-2 justify-center'>
              <Skeleton className='w-12 h-6 rounded-md' />
              <Skeleton className='w-12 h-6 rounded-md' />
              <Skeleton className='w-12 h-6 rounded-md' />
            </div>
          </div>
        </div>

        {/* Skeleton pour CompletionJournaliere */}
        <div className='col-span-1 md:col-span-4 lg:col-span-2 xl:row-span-3 h-full lg:row-span-3'>
          <div className='bg-white flex flex-col gap-4 p-4 md:p-6 lg:p-8 shadow-lg rounded-lg w-full h-full'>
            <Skeleton className='w-3/4 h-6 rounded-md mx-auto' />
            <Skeleton className='w-1/2 h-8 rounded-md mx-auto' />
            <Skeleton className='w-2/3 h-8 rounded-md mx-auto' />
          </div>
        </div>

        {/* Skeleton pour CompletionHebdomadaire */}
        <div className='col-span-1 md:col-span-4 lg:col-span-2 xl:row-span-3 h-full lg:row-span-3'>
          <div className='bg-white flex flex-col gap-4 p-4 md:p-6 lg:p-8 shadow-lg rounded-lg w-full h-full'>
            <Skeleton className='w-3/4 h-6 rounded-md mx-auto' />
            <Skeleton className='w-1/2 h-8 rounded-md mx-auto' />
            <Skeleton className='w-2/3 h-8 rounded-md mx-auto' />
          </div>
        </div>

        {/* Skeleton pour CompletionMensuelle */}
        <div className='col-span-1 md:col-span-4 lg:col-span-2 xl:row-span-3 h-full lg:row-span-3'>
          <div className='bg-white flex flex-col gap-4 p-4 md:p-6 lg:p-8 shadow-lg rounded-lg w-full h-full'>
            <Skeleton className='w-3/4 h-6 rounded-md mx-auto' />
            <Skeleton className='w-1/2 h-8 rounded-md mx-auto' />
            <Skeleton className='w-2/3 h-8 rounded-md mx-auto' />
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

  return (
    <div className='grid grid-cols-1 md:grid-cols-8 lg:grid-cols-9 gap-4 md:gap-6 lg:gap-8 min-h-[calc(100vh-128px)] lg:h-[calc(100vh-128px)] lg:grid-rows-12 xl:grid-rows-10 max-h-[1080px]'>
      {/* Première ligne */}
      <div className='col-span-1 md:col-span-8 lg:col-span-6 xl:row-span-3 h-full lg:row-span-3'>
        <div className='h-full'>
          <Welcoming data={userData} />
        </div>
      </div>
      <div className='col-span-1 md:col-span-4 lg:col-span-3 xl:row-span-5 h-full lg:row-span-6'>
        <div className='h-full'>
          <Profil data={userData} />
        </div>
      </div>

      {/* Deuxième ligne */}
      <div className='col-span-1 md:col-span-4 lg:col-span-2 xl:row-span-3 h-full lg:row-span-3'>
        <div className='h-full'>
          <CompletionJournaliere data={userData} />
        </div>
      </div>
      <div className='col-span-1 md:col-span-4 lg:col-span-2 xl:row-span-3 h-full lg:row-span-3'>
        <div className='h-full'>
          <CompletionHebdomadaire data={userData} />
        </div>
      </div>
      <div className='col-span-1 md:col-span-4 lg:col-span-2 xl:row-span-3 h-full lg:row-span-3'>
        <div className='h-full'>
          <CompletionMensuelle data={userData} />
        </div>
      </div>

      <div className='col-span-1 md:col-span-4 lg:col-span-3 xl:row-span-5 h-full lg:row-span-6'>
        <div className='h-full'>
          <Progression data={userData} />
        </div>
      </div>

      {/* Troisième ligne */}
      <div className='col-span-1 md:col-span-8 lg:col-span-6 xl:row-span-4 h-full lg:row-span-6'>
        <div className='h-full'>
          <JeuxFavoris data={userData} />
        </div>
      </div>
    </div>
  )
}
