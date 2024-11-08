'use client'

import { useState, useEffect } from 'react'
import { Chip, Navbar, NavbarBrand, NavbarContent, NavbarItem, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react'
import { auth, db } from '@/lib/firebase'
import Logo from '@/public/asset/dyschool.png'
import Image from 'next/image'
import Link from 'next/link'
import User from '@/public/asset/navbar/user.png'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useRouter, usePathname } from 'next/navigation'

// Fonction pour afficher les options lorsque l'utilisateur est connecté
const LoggedInNavItems = ({ prenom, logout }) => {
  const router = useRouter()

  return (
    <>
      <NavbarItem>  
        <span className='font-bold text-secondary'>
          {prenom || 'Prénom non disponible'}
        </span>
      </NavbarItem>

      {/* Menu déroulant pour l'utilisateur */}
      <NavbarItem>
        <Dropdown>
          <DropdownTrigger>
            <Image src={User} width={30} height={30} alt='user' className='cursor-pointer' />
          </DropdownTrigger>
          <DropdownMenu aria-label="User menu">
            <DropdownItem onClick={() => router.push('/dashboard')}>
              Tableau de bord
            </DropdownItem>
            <DropdownItem onClick={() => router.push('/dashboard/profil')}>
              Profil
            </DropdownItem>
            <DropdownItem onClick={logout}>
              Déconnexion
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarItem>
    </>
  )
}

const LoggedOutNavItems = () => {
  return (
    <>
      <NavbarItem className='hidden sm:flex'>
        <Link href='/connexion' className='text-secondary'>
          <Chip color='secondary' variant='bordered' className='px-3'>
            Connexion
          </Chip>
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link href='/inscription'>
          <Chip color='secondary' variant='solid' className='px-3'>
            S'inscrire
          </Chip>
        </Link>
      </NavbarItem>
    </>
  )
}

function CustomNavbar() {
  const [prenom, setPrenom] = useState('')
  const [user, setUser] = useState(null)
  const pathname = usePathname()

  const isDashboard = pathname.startsWith('/dashboard') // Vérifie si on est sur /dashboard

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUser(authUser)
        const userDoc = await getDoc(doc(db, 'users', authUser.uid))
        if (userDoc.exists()) {
          setPrenom(userDoc.data().prenom)
        }
      } else {
        setUser(null)
        setPrenom('')
      }
    })

    return () => unsubscribe()
  }, [])

  const logout = async () => {
    await auth.signOut()
    setUser(null)
    setPrenom('')
  }

  // Ne pas afficher la Navbar si on est sur la page du dashboard
  if (isDashboard) {
    return null
  }

  return (
    <Navbar 
      isBordered 
      shouldHideOnScroll
    >
      <NavbarContent>
        <NavbarBrand>
          <Link href='/' className='cursor-pointer'>
            <Image src={Logo} width={100} height={100} alt='Logo' />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify='end'>
        {user ? <LoggedInNavItems prenom={prenom} logout={logout} /> : <LoggedOutNavItems />}
      </NavbarContent>
    </Navbar>
  )
}

export default CustomNavbar