import Link from 'next/link'
import styles from './gamin.module.css'
import { Chip } from '@nextui-org/chip'

export default function Gaming () {
  return (
    <div className={styles.containerGaming}>
      <div className={styles.containerLeft}>
        <div>
          <h3 className='text-primary'>Nos jeux</h3>
          <h2 className={styles.h2Gaming}>Des jeux appropriés en fonction du trouble</h2>
        </div>
        <p>Nos jeux sont adaptés en fonction du trouble dys de l’enfant.</p>
        <Link href='#' className='text-secondary'>
          <Chip size='lg' color='secondary' variant='bordered' className='px-6 flex flex-row'>En savoir plus
          </Chip>
        </Link>
      </div>
      <div className='flex items-center justify-center p-4'>
        <h2 className='text-center normal-case'>Nos jeux arrivent bientôt !</h2>
      </div>
    </div>
  )
}
