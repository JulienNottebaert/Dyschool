import Image from 'next/image'
import Accueil from '@/public/asset/home/accuel.png'
import Link from 'next/link'
import { Chip } from '@nextui-org/chip'

export default function HomePage () {
  return (
    <div className='container mx-auto flex flex-col lg:flex-row justify-center items-center gap-10 pt-20 mb-20'>
      <div className='flex flex-col justify-between gap-10 px-4'>
        <h1 className='text-primary'>Apprends <br /> en t'amusant</h1>
        <p>
          Dyschool, une application pour t’aider à combattre tes
          troubles dys de manière ludique
        </p>
        <div className='flex flex-col lg:flex-row gap-4'>
          <Link href=''>
            <Chip size='lg' color='secondary' variant='solid' className='px-4'>S'inscrire</Chip>
          </Link>
          <Link href='#' className='text-secondary'>
            <Chip size='lg' color='secondary' variant='bordered' className='px-6 flex flex-row'>Découvrir Dyschool
            </Chip>
          </Link>
        </div>
      </div>
      <div className='w-9/12'>
        <Image src={Accueil} className='w-full' />
      </div>
    </div>
  )
}
