import Link from 'next/link'
import { Button } from '@nextui-org/button'

export default function Gaming () {
  return (
    <div className='flex flex-row p-5 my-36 gap-20'>
      <div className='flex flex-col gap-10'>
        <div>
          <h3 className='text-secondary'>Nos jeux</h3>
          <h2 className='text-primary max-w-2xl'>Des jeux appropriés en fonction du trouble</h2>
        </div>
        <p>Nos jeux sont adaptés en fonction du trouble dys de l’enfant.</p>
        <Link href='#' className='text-secondary'>
          <Button size='lg' color='secondary' variant='ghost' className='px-6 flex flex-row'>En savoir plus
          </Button>
        </Link>
      </div>
      <div className='flex items-center justify-center p-4'>
        <h2 className='text-center normal-case'>Nos jeux arrivent bientôt !</h2>
      </div>
    </div>
  )
}
