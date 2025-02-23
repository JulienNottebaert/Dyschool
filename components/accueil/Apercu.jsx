import Image from 'next/image'
import Game from '@/public/asset/home/game.png'
import Doctor from '@/public/asset/home/doctor.png'
import Idea from '@/public/asset/home/idea.png'

export default function Apercu () {
  return (
    <div className='bg-secondary-50 bg-opacity-50 w-full'>
      <div className='text-center mt-10'>
        <p className='text-secondary-500'>Aperçu</p>
        <h2 className='text-primary px-5'>Pourquoi choisir Dyschool ?</h2>
      </div>
      <div className='flex flew-row flex-wrap items-center justify-center gap-10 my-14 p-5'>

        <div className='size-80 bg-white flex flex-col items-center justify-center text-center gap-5 rounded-2xl p-5 shadow-md'>
          <Image src={Game} className='bg-secondary w-20 p-4 rounded-xl' />
          <h3>Des jeux ludiques</h3>
          <p className='text-sm text-gray-400'>Apprendre en s’amusant est le meilleur moyen de s’améliorer</p>
        </div>

        <div className='size-80 bg-white flex flex-col items-center justify-center text-center gap-5 rounded-2xl p-5 shadow-md'>
          <Image src={Doctor} className='bg-secondary w-20 p-4 rounded-xl' />
          <h3>Créé par des professionels</h3>
          <p className='text-sm text-gray-400'>Conçus par des érgothérapeutes, orthophonistes et developpeurs</p>
        </div>

        <div className='size-80 bg-white flex flex-col items-center justify-center text-center gap-5 rounded-2xl p-5 shadow-md'>
          <Image src={Idea} className='bg-secondary w-20 p-4 rounded-xl' />
          <h3>Tous concernés</h3>
          <p className='text-sm text-gray-400'>Dyschool touche tous les troubles Dys, personne n'est mis de côté </p>
        </div>

      </div>
    </div>
  )
}
