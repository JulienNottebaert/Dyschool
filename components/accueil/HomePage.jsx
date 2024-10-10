import Image from 'next/image'
import Accueil from '@/public/asset/home/accuel.png'
import Link from 'next/link'
import { Chip } from '@nextui-org/chip'
import styles from './homePage.module.css'

export default function HomePage () { // Accepter les données en prop
  return (
    <div className='container mx-auto flex flex-col lg:flex-row justify-center items-center gap-10 pt-20 mb-20'>
      <div className='flex flex-col justify-between gap-10 px-4'>
        <h1 className='text-primary'>Apprends <br /> en t'amusant</h1>
        <p>
          Dyschool, une application pour t’aider à combattre tes
          troubles dys de manière ludique
        </p>
        <div className='flex flex-col lg:flex-row gap-4'>
          <Link href='/inscription'>  {/* Correction du lien */}
            <Chip size='lg' color='secondary' variant='solid' className='px-4'>S'inscrire</Chip>
          </Link>
          <Link href='#decouvrir' className='text-secondary'>  {/* Correction du lien */}
            <Chip size='lg' color='secondary' variant='bordered' className='px-6 flex flex-row'>Découvrir Dyschool
            </Chip>
          </Link>
        </div>
      </div>
      <div className='w-9/12'>
        <Image src={Accueil} alt="Image d'accueil Dyschool" className={styles.anim} layout='responsive' width={800} height={600} />  {/* Optimisation de l'image */}
      </div>
    </div>
  )
}
