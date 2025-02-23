import HomePage from '@/components/accueil/HomePage'
import Apercu from '@/components/accueil/Apercu'
import Gaming from '@/components/accueil/Gaming'
import Partenaires from '@/components/accueil/Partenaires'
import Blog from '@/components/accueil/BlogAccueil'

export default function Home () {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <HomePage />
      <Apercu />
      <Gaming />
      <div className='bg-primary-50 bg-opacity-50 w-full'>
        <Blog />
      </div>
      <Partenaires />
    </main>
  )
}
