import Image from 'next/image'

export default function Gaming () {
  return (
    <div className='flex flex-col p-5 my-8 gap-8 lg:flex-row md:px-20'>
      <div className='flex flex-col gap-10 justify-center'>
        <div>
          <h3 className='text-secondary'>Nos jeux</h3>
          <h2 className='text-primary max-w-2xl'>Des jeux appropriés en fonction du trouble</h2>
        </div>
        <p>Nos jeux sont adaptés en fonction du trouble dys de l’enfant.</p>
      </div>
      <div className='flex flex-wrap justify-center gap-8 p-4'>
        <div className='flex flex-col items-center'>
          <div className='relative w-40 h-28 md:w-56 md:h-36 bg-gray-100 rounded-lg overflow-hidden'>
            <Image
              src='/asset/dashboard/jeu1.png'
              alt='Jeu de mémoire'
              fill
              className='object-cover'
            />
          </div>
          <h4 className='mt-3 text-center text-secondary font-medium'>Jeu de mémoire</h4>
        </div>
        <div className='flex flex-col items-center'>
          <div className='relative w-40 h-28 md:w-56 md:h-36 bg-gray-100 rounded-lg overflow-hidden'>
            <Image
              src='/asset/dashboard/jeu2.png'
              alt='Puissance 4'
              fill
              className='object-cover'
            />
          </div>
          <h4 className='mt-3 text-center text-secondary font-medium'>Puissance 4</h4>
        </div>
        <div className='flex flex-col items-center'>
          <div className='relative w-40 h-28 md:w-56 md:h-36 bg-gray-100 rounded-lg overflow-hidden'>
            <Image
              src='/asset/dashboard/jeu3.png'
              alt='Simon'
              fill
              className='object-cover'
            />
          </div>
          <h4 className='mt-3 text-center text-secondary font-medium'>Simon</h4>
        </div>
      </div>
    </div>
  )
}
