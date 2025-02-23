'use client'

import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()
  const isDashboard = pathname.startsWith('/dashboard') // Vérifie si on est sur le dashboard
  const isLogin = pathname.startsWith('/connexion') // Vérifie si on est sur la page de connexion
  const isSignIn = pathname.startsWith('/inscription') // Vérifie si on est sur la page d'inscription

  if (isDashboard || isLogin || isSignIn) {
    return null
  }

  return (
    <div className='flex justify-center mb-2 mt-20'>
      <p className='text-sm'>Dyschool ©2024</p>
    </div>
  )
}