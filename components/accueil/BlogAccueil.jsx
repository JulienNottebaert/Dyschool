import Image from 'next/image'
import ImgBlog1 from '@/public/asset/home/blog1.jpg'
import ImgBlog2 from '@/public/asset/home/blog2.jpeg'
import Link from 'next/link'

export default function BlogAccueil () {
  return (
    <div>
      <div className='text-center mt-10'>
        <p className='text-secondary-500'>Blog</p>
        <h2 className='text-primary'>Nos articles</h2>
      </div>
      <div className='flex flex-wrap px-5 items-center justify-center gap-12 mb-20 mt-10'>
        <Link href='/blog/article1' className='bg-white drop-shadow-lg rounded-lg p-4 size-64 sm:size-96 flex flex-col gap-2 hover:-translate-y-2 duration-250'>
          <h3 className='sm:text-lg text-base font-bold normal-case text-secondary'>Quels professionnels peuvent diagnostiquer les troubles DYS ?</h3>
          <p className='text-sm md:block hidden text-gray-500 truncate'>Les troubles DYS (dyslexie, dyscalculie, dyspraxie, dysphasie, etc.) sont des troubles spécifiques de l'apprentissage qui touchent de nombreux enfants. Le diagnostic de ces troubles est essentiel pour permettre une prise en charge précoce et adaptée, afin de favoriser le développement de l’enfant. Dans cet article, nous vous expliquons qui sont les professionnels habilités à poser un diagnostic sur les troubles DYS et comment ils peuvent aider dans ce processus.</p>
          <div className='w-full h-56 relative'>
            <Image src={ImgBlog1} fill style={{ objectFit: 'cover' }} alt='blog1' className='rounded-lg mt-4' />
          </div>
          <p className='text-xs mt-6 text-end underline'>Voir davantage ...</p>
        </Link>
        <Link href='/blog/article2' className='group bg-white drop-shadow-lg rounded-lg p-4 size-64 sm:size-96 flex flex-col gap-2 hover:-translate-y-2 duration-250'>
          <h3 className='sm:text-lg text-base font-bold normal-case text-secondary'>Témoignages de Sophie et Thomas, parents d'Alice</h3>
          <p className='text-sm md:block hidden text-gray-500 truncate'>Naviguer dans la complexité des troubles DYS peut être un défi quotidien pour les familles. Sophie et Thomas, parents d’Alice, une enfant de 10 ans diagnostiquée avec une dyslexie, une dysorthographie et une dyspraxie, ont accepté de partager leur parcours. Leur histoire illustre les épreuves, mais aussi les réussites et les solutions qui permettent à des enfants comme Alice de s’épanouir malgré les obstacles.</p>
          <div className='w-full h-56 relative'>
            <Image src={ImgBlog2} fill style={{ objectFit: 'cover' }} alt='blog1' className='rounded-lg mt-4' />
          </div>
          <p className='text-xs mt-6 text-end underline'>Voir davantage ...</p>
        </Link>
      </div>
    </div>
  )
}
