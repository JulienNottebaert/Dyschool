// components/DashboardLayout.jsx
'use client'

import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Avatar} from "@nextui-org/react";
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { auth } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import Image from 'next/image'
import Logo from '@/public/asset/dyschool.png'
import User from '@/public/asset/navbar/user.png'
import Dashboard from '@/public/asset/navbar/dashboard.png'
import Logout from '@/public/asset/navbar/logout.png'

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState(null)
  const router = useRouter()
  const pathname = usePathname()

  // Définir dynamiquement le titre de la section en fonction de la route
  const sectionTitle = () => {
    if (pathname === '/dashboard') return 'Dashboard'
    if (pathname === '/dashboard/profil') return 'Profil'
    return 'Section'
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        router.push('/connexion') // Rediriger vers la connexion si non connecté
      }
    })

    return () => unsubscribe()
  }, [router])

  return (
    <div className="flex">
      {/* Sidebar fixe */}
      <aside className="w-64 bg-white h-screen p-4 fixed border">
        <div className='flex items-center mb-8'>
          <Link href='/' className='cursor-pointer mx-auto'>
            <Image src={Logo} width={100} height={100} alt='Logo' />
          </Link>
        </div>
        <nav className="flex flex-col space-y-4">
          <Link href="/dashboard">
            <span className="p-2 rounded cursor-pointer flex gap-3 items-center">
              <Image src={Dashboard} width={20} height={20} alt='dashboard' />
              Dashboard
            </span>
          </Link>
          <Link href="/dashboard/profil">
            <span className="p-2 rounded cursor-pointer flex gap-3 items-center">
              <Image src={User} width={20} height={20} alt='profil' />
              Profil
            </span>
          </Link>
          <button
            onClick={() => {
              auth.signOut()
              router.push('/connexion')
            }}
            className="p-2 rounded text-left cursor-pointer"
          >
            <span className="rounded cursor-pointer flex gap-3 items-center">
              <Image src={Logout} width={20} height={20} alt='logout' />
              Déconnexion
            </span>
          </button>
        </nav>
      </aside>
      
      {/* Contenu principal */}
      <main className='ml-64 flex-grow'>
        <Navbar isBordered isBlurred='false' className='bg-white'>
          <NavbarContent>
            <NavbarItem className="hidden lg:flex">
              <h1 className='text-2xl font-bold'>{sectionTitle()}</h1>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex">
              <Avatar isBordered src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
            </NavbarItem>
          </NavbarContent>
        </Navbar>
        
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}