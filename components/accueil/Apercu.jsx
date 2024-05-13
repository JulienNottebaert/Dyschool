import Image from 'next/image'
import styles from './apercu.module.css'
import Game from '@/public/asset/home/game.png'
import Doctor from '@/public/asset/home/doctor.png'
import Idea from '@/public/asset/home/idea.png'

export default function Apercu () {
  return (
    <div className={styles.containerApercu}>
      <div className='text-center mt-10'>
        <p className='text-secondary-500'>Aperçu</p>
        <h2 className='text-primary'>Pourquoi choisir Dyschool ?</h2>
      </div>
      <div className={styles.containerCard}>

        <div className={styles.card}>
          <Image src={Game} className={styles.imageCard} />
          <h3 className={styles.h3Card}>Des jeux ludiques</h3>
          <p className={styles.pCard}>Apprendre en s’amusant est le meilleur moyen de s’améliorer</p>
        </div>

        <div className={styles.card}>
          <Image src={Idea} className={styles.imageCard} />
          <h3 className={styles.h3Card}>Créé par des professionels</h3>
          <p className={styles.pCard}>Des jeux conçus par des érgothérapeutes, orthophonistes et developpeur</p>
        </div>

        <div className={styles.card}>
          <Image src={Doctor} className={styles.imageCard} />
          <h3 className={styles.h3Card}>Objectif réussite</h3>
          <p className={styles.pCard}>Fixe toi des objectifs et réussit les !</p>
        </div>

      </div>
    </div>
  )
}
