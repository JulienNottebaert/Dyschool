import Image from 'next/image'
// import styles from './partenaires.module.css'
import Apedys from '@/public/asset/partenaires/apedys.png'
export default function Partenaires () {
  return (
    <div className='my-20 px-5'>
      <h2 className='text-primary'>Nos partenaires</h2>
      <div className='container flex justify-center items-center mt-6'>
        <Image src={Apedys} width={150} height={150} objectFit='cover' />
      </div>
    </div>
  )
}
