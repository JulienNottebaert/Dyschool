import styles from './abonnement.module.css'
import { TiArrowRightThick } from 'react-icons/ti'

export default function Abonnement () {
  return (
    <div className={styles.containerAbo}>
      <h2 className='text-secondary-500 px-6 text-center'>Choisir son abonnement</h2>
      <h3 className='text-gray-600 px-6 text-center normal-case'>Découvre nos offres adaptés pour tous !</h3>
      <div className={styles.containerCard}>

        <div className={styles.card}>
          <h2 className='text-primary-500'>Gratuit</h2>
          <p className='flex items-center gap-3'><TiArrowRightThick className='text-secondary text-2xl' />1 jeu par trouble
          </p>
          <p className='flex items-center gap-3'><TiArrowRightThick className='text-secondary text-2xl' />Personnalisation du personnage
          </p>
          <p className='flex items-center gap-3'><TiArrowRightThick className='text-secondary text-2xl' />Suivi de la progression
          </p>
          <div>
            <h2 className='text-primary-500'>0€ <span className='text-gray-300 text-lg'>/mois</span></h2>
            <button className={styles.buttonChoisir}>Choisir</button>
          </div>
        </div>

        <div className={styles.card}>
          <h2 className='text-primary-500'>Mensuel</h2>
          <p className='flex items-center gap-3'><TiArrowRightThick className='text-secondary text-2xl' />+40 jeux disponibles
          </p>
          <p className='flex items-center gap-3'><TiArrowRightThick className='text-secondary text-2xl' />Personnalisation du personnage
          </p>
          <p className='flex items-center gap-3'><TiArrowRightThick className='text-secondary text-2xl' />Suivi de la progression
          </p>
          <div>
            <h2 className='text-primary-500'>9€ <span className='text-gray-300 text-lg'>/mois</span></h2>
            <button className={styles.buttonChoisir}>Choisir</button>
          </div>
        </div>

        <div className={styles.card}>
          <h2 className='text-primary-500'>Annuel</h2>
          <p className='flex items-center gap-3'><TiArrowRightThick className='text-secondary text-2xl' />+40 jeux disponibles
          </p>
          <p className='flex items-center gap-3'><TiArrowRightThick className='text-secondary text-2xl' />Personnalisation du personnage
          </p>
          <p className='flex items-center gap-3'><TiArrowRightThick className='text-secondary text-2xl' />Suivi de la progression
          </p>
          <div>
            <h2 className='text-primary-500'>89€ <span className='text-gray-300 text-lg'>/mois</span></h2>
            <button className={styles.buttonChoisir}>Choisir</button>
          </div>
        </div>
      </div>
    </div>
  )
}
