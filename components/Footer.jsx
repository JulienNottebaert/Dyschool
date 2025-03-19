'use client'

import { usePathname, useRouter } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()
  const router = useRouter()
  const isDashboard = pathname.startsWith('/dashboard') // Vérifie si on est sur le dashboard
  const isLogin = pathname.startsWith('/connexion') // Vérifie si on est sur la page de connexion
  const isSignIn = pathname.startsWith('/inscription') // Vérifie si on est sur la page d'inscription

  if (isDashboard || isLogin || isSignIn) {
    return null
  }

  return (
    <div className='flex flex-col items-center justify-center mb-2 mt-20'>
      <div className='flex items-center gap-2'>
        <p className='text-sm'>Dyschool ©2024</p>
        <span className='text-sm'>|</span>
        <button 
          onClick={() => router.push('/mentions-legales')} 
          className='text-sm hover:text-secondary transition-colors text-gray-500'
        >
          Mentions légales
        </button>
      </div>
    </div>
  )
}