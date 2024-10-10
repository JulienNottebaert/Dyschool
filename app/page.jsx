'use client'

import HomePage from '@/components/accueil/HomePage'
import Apercu from '@/components/accueil/Apercu'
import Gaming from '@/components/accueil/Gaming'
import Abonnement from '@/components/accueil/Abonnement'
import Partenaires from '@/components/accueil/Partenaires'

export default function Home () {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <HomePage />  {/* Passer les données à ton composant HomePage */}
      <Apercu />
      <Gaming />
      <Abonnement />
      <Partenaires />
    </main>
  )
}
