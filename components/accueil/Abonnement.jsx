import styles from './abonnement.module.css'
import { TiArrowRightThick } from 'react-icons/ti'

export default function Abonnement () {
  return (
    <div className={styles.containerAbo}>
      <h2 className='text-secondary-500 px-6 text-center'>Choisir son abonnement</h2>
      <h3 className='text-gray-600 px-6 text-center'>En fonction de votre complémentaire santé, dyschool peut-être gratuit pour vous ! </h3>
      <div className={styles.containerCard}>
        <div className={styles.card}>
          <h2 className='text-primary-500'>Mensuel</h2>
          <p className='flex items-center gap-3'><TiArrowRightThick className='text-secondary text-2xl' />Accès à tous les jeux
          </p>
          <p className='flex items-center gap-3'><TiArrowRightThick className='text-secondary text-2xl' />Accès à tous les jeux
          </p>
          <p className='flex items-center gap-3'><TiArrowRightThick className='text-secondary text-2xl' />Accès à tous les jeux
          </p>
          <div>
            <h2 className='text-primary-500'>29€ <span className='text-gray-300 text-lg'>/mois</span></h2>
            <button className={styles.buttonChoisir}>Choisir</button>
          </div>
        </div>

        <div className={styles.card}>
          <h2 className='text-primary-500'>Annuel</h2>
          <p className='flex items-center gap-3'><TiArrowRightThick className='text-secondary text-2xl' />Accès à tous les jeux
          </p>
          <p className='flex items-center gap-3'><TiArrowRightThick className='text-secondary text-2xl' />Accès à tous les jeux
          </p>
          <p className='flex items-center gap-3'><TiArrowRightThick className='text-secondary text-2xl' />Accès à tous les jeux
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
