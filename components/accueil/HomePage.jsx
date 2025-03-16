'use client'

import Image from 'next/image'
import Accueil from '@/public/asset/home/accuel.png'
import styles from './homePage.module.css'
import { Button } from "@heroui/button"
import { useRouter } from 'next/navigation'

export default function HomePage () { // Accepter les données en prop
  const router = useRouter()

  return (
    <div className='container mx-auto flex flex-col lg:flex-row justify-center items-center gap-10 pt-20 mb-20'>
      <div className='flex flex-col justify-between gap-10 px-4'>
        <h1 className='text-primary'>Apprends <br /> en t'amusant</h1>
        <p>
          Dyschool, une application pour t’aider à combattre tes
          troubles dys de manière ludique
        </p>
        <div className='flex flex-col lg:flex-row gap-4'>
          <Button
            size='lg'
            color='secondary'
            variant='ghost'
            className='px-4'
            onPress={() => router.push('/abonnements')}
          >
            En savoir plus
          </Button>
          <Button
            size='lg'
            color='secondary'
            variant='solid'
            className='px-4'
            onPress={() => router.push('/inscription')}
          >
            S'inscrire
          </Button>
        </div>
      </div>
      <div className='w-9/12 px-5'>
        <Image src={Accueil} alt="Image d'accueil Dyschool" className={styles.anim} layout='responsive' width={800} height={600} />  {/* Optimisation de l'image */}
      </div>
    </div>
  )
}
