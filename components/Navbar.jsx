'use client'

import { useState, useEffect } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  AvatarIcon,
  Button
} from '@nextui-org/react'
import { auth, db } from '@/lib/firebase'
import Logo from '@/public/asset/dyschool.png'
import Image from 'next/image'
import Link from 'next/link'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useRouter, usePathname } from 'next/navigation'

const LoggedInNavItems = ({ userData, logout }) => {
  const router = useRouter()

  return (
    <>
      <NavbarItem>
        <span className='font-bold text-secondary'>
          {userData?.prenom || 'Prénom non disponible'} {userData?.nom || 'Nom non disponible'}
        </span>
      </NavbarItem>
      <NavbarItem>
        <Dropdown>
          <DropdownTrigger>
            <Avatar
              className='cursor-pointer'
              isBordered
              alt={`${userData?.nom || 'Utilisateur'} ${userData?.prenom || ''}`}
              size='sm'
              icon={<AvatarIcon />}
              src={userData?.photoURL}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label='User menu'>
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

const LoggedOutNavItems = () => (
  <div className='flex items-center gap-4'>
    <NavbarItem>
      <Link href='/connexion'>
        <Button
          size='sm'
          color='default'
        >
          Connexion
        </Button>
      </Link>
    </NavbarItem>

    <NavbarItem>
      <Link href='/inscription'>
        <Button
          size='sm'
          color='secondary'
        >
          Inscription
        </Button>
      </Link>
    </NavbarItem>
  </div>
)

function CustomNavbar () {
  const [userData, setUserData] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true) // État de chargement
  const pathname = usePathname()

  const isDashboard = pathname.startsWith('/dashboard') // Vérifie si on est sur /dashboard

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUser(authUser)
        const userDoc = await getDoc(doc(db, 'users', authUser.uid))
        if (userDoc.exists()) {
          setUserData(userDoc.data())
        }
      } else {
        setUser(null)
        setUserData(null)
      }
      setLoading(false) // Arrête le chargement une fois les données récupérées
    })

    return () => unsubscribe()
  }, [])

  const logout = async () => {
    await auth.signOut()
    setUser(null)
    setUserData(null)
  }

  // Ne pas afficher la Navbar si on est sur la page du dashboard
  if (isDashboard) {
    return null
  }

  return (
    <Navbar isBordered shouldHideOnScroll>
      <NavbarContent>
        <NavbarBrand>
          <Link href='/' className='cursor-pointer'>
            <Image src={Logo} width={100} height={100} alt='Logo' />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify='end'>
        {loading
          ? (
            <div className='flex items-center gap-3'>
              {/* Skeleton pour le nom et prénom */}
              <div className='w-24 h-6 bg-gray-300 rounded-md animate-pulse' />
              {/* Skeleton pour l'avatar */}
              <div className='w-10 h-10 bg-gray-300 rounded-full animate-pulse' />
            </div>
            )
          : user
            ? (
              <LoggedInNavItems userData={userData} logout={logout} />
              )
            : (
              <LoggedOutNavItems />
              )}
      </NavbarContent>
    </Navbar>
  )
}

export default CustomNavbar
